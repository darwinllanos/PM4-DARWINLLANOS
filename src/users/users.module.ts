import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository]
})
export class UsersModule {}
