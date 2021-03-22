/*
 * @Date: 2021-03-17 18:24:28
 * @LastEditTime: 2021-03-17 20:32:05
 * @FilePath: \server\src\module\access\access.module.ts
 * @Description: TODO:
 */
import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User.entity';
import { Admin } from 'entities/Admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Admin ])],
  providers: [AccessService],
  controllers: [AccessController],
})
export class AccessModule {}
