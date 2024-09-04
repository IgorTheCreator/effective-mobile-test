import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserService } from './interfaces';

@Injectable()
export class UsersService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUsers(data, where) {
    try {
      const updatedUsersCount = await this.prismaService.user.updateMany({
        data: { ...data },
        where: { ...where },
      });

      return updatedUsersCount.count;
    } catch (err) {
      throw new InternalServerErrorException('Failed to update users');
    }
  }
}
