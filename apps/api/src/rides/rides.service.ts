import {
  ForbiddenException,
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RideStatus, RidePassengerStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { SearchRidesDto } from './dto/search-rides.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { generateRideOtp, hashRideOtp } from './ride-otp.util';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class RidesService {
  constructor(private readonly prisma: PrismaService) {}

  private enrichRide<T extends { availableSeats: number; _count: { passengers: number } }>(ride: T) {
    return {
      ...ride,
      passengerCount: ride._count.passengers,
      seatsLeft: Math.max(ride.availableSeats - ride._count.passengers, 0),
    };
  }

  async create(
    userId: string,
    universityId: string,
    dto: CreateRideDto,
  ) {
    const departureDateTime = new Date(dto.departureDateTime);

    const existingRide = await this.prisma.ride.findFirst({
      where: {
        universityId,
        driverId: userId,
        pickup: dto.pickup,
        destination: dto.destination,
        departureDateTime,
        status: {
          in: [RideStatus.UPCOMING],
        },
      },
    });

    if (existingRide) {
      throw new ConflictException(
        'A similar ride already exists for this departure time.',
      );
    }

    return this.prisma.ride.create({
      data: {
        universityId,
        driverId: userId,
        campusId: dto.campusId,
        pickup: dto.pickup,
        destination: dto.destination,
        departureDateTime,
        availableSeats: dto.availableSeats,
        pricePerSeat: dto.pricePerSeat,
        vehicle: dto.vehicle,
        notes: dto.notes,
        luggageAllowed: dto.luggageAllowed,
        paymentMode: dto.paymentMode,
        genderPreference: dto.genderPreference,
      },
      include: {
        driver: {
          select: {
            id: true,
            displayName: true,
          },
        },
        passengers: true,
        _count: {
          select: {
            passengers: true,
          },
        },
      },
    });
  }

  async search(universityId: string, dto: SearchRidesDto) {
    const where: Prisma.RideWhereInput = {
      universityId,
    };

    if (dto.campusId) where.campusId = dto.campusId;
    if (dto.status) where.status = dto.status;
    if (dto.genderPreference) {
      where.genderPreference = dto.genderPreference;
    }

    if (dto.q) {
      where.OR = [
        {
          pickup: {
            contains: dto.q,
            mode: 'insensitive',
          },
        },
        {
          destination: {
            contains: dto.q,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [rides, total] = await Promise.all([
      this.prisma.ride.findMany({
        where,
        include: {
          driver: {
            select: {
              id: true,
              displayName: true,
            },
          },
          passengers: true,
          _count: {
            select: {
              passengers: true,
            },
          },
        },
        orderBy: {
          departureDateTime: 'asc',
        },
        skip: (dto.page - 1) * dto.pageSize,
        take: dto.pageSize,
      }),
      this.prisma.ride.count({ where }),
    ]);

    return {
      rides: rides.map((ride) => this.enrichRide(ride)),
      total,
      page: dto.page,
      pageSize: dto.pageSize,
    };
  }

  async findById(id: string, universityId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
      include: {
        driver: {
          select: {
            id: true,
            displayName: true,
          },
        },
        passengers: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
              },
            },
          },
        },
        _count: {
          select: {
            passengers: true,
          },
        },
      },
    });

    if (!ride || ride.universityId !== universityId) {
      throw new NotFoundException('Ride not found');
    }

    return this.enrichRide(ride);
  }

  async join(
    id: string,
    userId: string,
    universityId: string,
  ) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            passengers: true,
          },
        },
      },
    });

    if (!ride || ride.universityId !== universityId) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.driverId === userId) {
      throw new ForbiddenException('Driver cannot join own ride');
    }

    if (ride._count.passengers >= ride.availableSeats) {
      throw new ConflictException('Ride is full');
    }

    const alreadyJoined =
      await this.prisma.ridePassenger.findUnique({
        where: {
          rideId_userId: {
            rideId: id,
            userId,
          },
        },
      });

    if (alreadyJoined) {
      throw new ConflictException(
        'Already joined this ride',
      );
    }

    await this.prisma.ridePassenger.create({
      data: {
        rideId: id,
        userId,
      },
    });

    return this.findById(id, universityId);
  }

  async leave(
    id: string,
    userId: string,
    universityId: string,
  ) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
    });

    if (!ride || ride.universityId !== universityId) {
      throw new NotFoundException('Ride not found');
    }

    await this.prisma.ridePassenger.delete({
      where: {
        rideId_userId: {
          rideId: id,
          userId,
        },
      },
    });

    return this.findById(id, universityId);
  }

  async update(
    id: string,
    userId: string,
    universityId: string,
    dto: UpdateRideDto,
  ) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
    });

    if (!ride || ride.universityId !== universityId) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.driverId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.ride.update({
      where: { id },
      data: {
        ...dto,
        departureDateTime: dto.departureDateTime
          ? new Date(dto.departureDateTime)
          : undefined,
      },
    });
  }


  async generateOtp(
    rideId: string,
    driverId: string,
    universityId: string,
  ) {
    const ride = await this.prisma.ride.findFirst({
      where: {
        id: rideId,
        driverId,
        universityId,
      },
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    const { code, hash } = generateRideOtp();

    await this.prisma.ridePassenger.updateMany({
      where: {
        rideId,
        status: RidePassengerStatus.JOINED,
      },
      data: {
        otp: hash,
        otpVerifiedAt: null,
      },
    });

    return {
      otp: code,
      message: 'Share this OTP with passengers during boarding.',
    };
  }

  async verifyOtp(
    rideId: string,
    userId: string,
    universityId: string,
    otp: string,
  ) {
    const passenger =
      await this.prisma.ridePassenger.findUnique({
        where: {
          rideId_userId: {
            rideId,
            userId,
          },
        },
        include: {
          ride: true,
        },
      });

    if (
      !passenger ||
      passenger.ride.universityId !== universityId
    ) {
      throw new NotFoundException('Ride booking not found');
    }

    if (!passenger.otp) {
      throw new ForbiddenException(
        'OTP has not been generated yet',
      );
    }

    if (hashRideOtp(otp) !== passenger.otp) {
      throw new ForbiddenException('Invalid OTP');
    }

    await this.prisma.ridePassenger.update({
      where: {
        rideId_userId: {
          rideId,
          userId,
        },
      },
      data: {
        otp: null,
        otpVerifiedAt: new Date(),
        status: RidePassengerStatus.BOARDED,
      },
    });

    return {
      verified: true,
    };
  }




  async startRide(
    rideId: string,
    driverId: string,
    universityId: string,
  ) {
    const ride=await this.prisma.ride.findFirst({
      where:{
        id:rideId,
        driverId,
        universityId,
      },
    });

    if(!ride){
      throw new NotFoundException("Ride not found");
    }

    return this.prisma.ride.update({
      where:{id:rideId},
      data:{
        status: RideStatus.IN_PROGRESS,
      },
    });
  }

  async completeRide(
    rideId:string,
    driverId:string,
    universityId:string,
  ){
    const ride=await this.prisma.ride.findFirst({
      where:{
        id:rideId,
        driverId,
        universityId,
      },
    });

    if(!ride){
      throw new NotFoundException("Ride not found");
    }

    return this.prisma.ride.update({
      where:{id:rideId},
      data:{
        status: RideStatus.COMPLETED,
      },
    });
  }

  async cancelRide(
    rideId:string,
    driverId:string,
    universityId:string,
  ){
    const ride=await this.prisma.ride.findFirst({
      where:{
        id:rideId,
        driverId,
        universityId,
      },
    });

    if(!ride){
      throw new NotFoundException("Ride not found");
    }

    return this.prisma.ride.update({
      where:{id:rideId},
      data:{
        status: RideStatus.CANCELLED,
      },
    });
  }




  async createReview(
    rideId: string,
    reviewerId: string,
    dto: CreateReviewDto,
  ) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.status !== RideStatus.COMPLETED) {
      throw new BadRequestException(
        'Reviews are allowed only after ride completion',
      );
    }

    return this.prisma.rideReview.create({
      data: {
        rideId,
        reviewerId,
        revieweeId: dto.revieweeId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });
  }

}
