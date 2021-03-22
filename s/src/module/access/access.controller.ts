/*
 * @Date: 2021-03-17 18:24:28
 * @LastEditTime: 2021-03-17 20:33:00
 * @FilePath: \server\src\module\access\access.controller.ts
 * @Description: TODO:
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'entities/User.entity';
import { Result } from 'src/model/Result';
import { AccessService } from './access.service';

@Controller('access')
export class AccessController {
    constructor(
        private readonly accessService: AccessService
    ) {}
    @Post('register')
    index (@Body() user:User) {
        console.log('body:', user)
        if (!user.account || !user.username || !user.password) {
            return Result.fail('参数错误')
        }
        if (user.account.trim().length < 3 || user.password.trim().length < 3 || user.username.trim().length < 3) {
            return Result.fail('账户密码长度不能小于3')
        }
        if (user.account.trim().length > 12 || user.password.trim().length > 12 || user.username.trim().length > 12) {
            return Result.fail('账户密码长度不能大于12')
        }
        return this.accessService.createUser(user)
    }

    @Get('check')
    check(@Query('usr') usr:string, @Query('psd') psd: string) {
        return this.accessService.checkUser(usr, psd)
    }

    @Get('admin')
    admin(@Query('usr') usr:string, @Query('psd') psd: string) {
        return this.accessService.checkAdmin(usr, psd)
    }

    @Put('update')
    update(@Body() body: User) {
        return this.accessService.updateUser(body)
    }

    @Delete('delete')
    delete(@Body() body: {id: number}) {
        if (body.id && !isNaN(body.id)) {
            return Result.success(this.accessService.deleteUser(body.id))
        } else {
            return Result.fail('wrong parameter')
        }
    }
}
