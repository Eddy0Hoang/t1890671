/*
 * @Date: 2021-03-17 18:24:28
 * @LastEditTime: 2021-03-17 19:18:53
 * @FilePath: \server\src\app.module.ts
 * @Description: TODO:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import ormConfig from './orm.mysql.config'
import { AccessModule } from './module/access/access.module';
import { InfoModule } from './module/info/info.module';
import { ResourcesModule } from './module/resources/resources.module';
import { CommentModule } from './module/comment/comment.module';

const typeRoot = TypeOrmModule.forRoot(ormConfig as any)

@Module({
  imports: [typeRoot, AccessModule, InfoModule, ResourcesModule, CommentModule],
})

export class AppModule {}
