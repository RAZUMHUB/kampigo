import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, universityId: string, dto: CreateRentalDto) {
    return this.prisma.rental.create({
      data: {
        universityId,
        ownerId: userId,
        category: dto.category,
        title: dto.title,
        description: dto.description,
        campusId: dto.campusId,
        pricePerDay: dto.pricePerDay,
        securityDeposit: dto.securityDeposit ?? 0,
        available: dto.available ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.rental.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    return rental;
  }

  async update(id: string, dto: UpdateRentalDto) {
    return this.prisma.rental.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.rental.delete({
      where: { id },
    });
  }
}
