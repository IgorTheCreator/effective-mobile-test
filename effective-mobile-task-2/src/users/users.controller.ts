import { Controller, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/problems')
  async updateUsers(): Promise<number> {
    const updatedUsersCount = await this.usersService.updateUsers(
      { problems: false },
      { problems: true },
    );

    return updatedUsersCount;
  }
}
