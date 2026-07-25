import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { SearchRidesDto } from './dto/search-rides.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Injectable()
export class RidesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    universityId: string,
    dto: CreateRideDto,
  ) {
    return this.prisma.ride.create({
      data: {
        universityId,
        driverId: userId,
        campusId: dto.campusId,
        pickup: dto.pickup,
        destination: dto.destination,
        departureDateTime: new Date(dto.departureDateTime),
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
      rides,
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
      },
    });

    if (!ride || ride.universityId !== universityId) {
      throw new NotFoundException('Ride not found');
    }

    return ride;
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
}
