/*
 * @Date: 2021-03-17 18:24:28
 * @LastEditTime: 2021-03-17 20:33:36
 * @FilePath: \server\src\module\access\access.service.ts
 * @Description: TODO:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'entities/Admin.entity';
import { User } from 'entities/User.entity';
import { Result } from 'src/model/Result';
import { Repository } from 'typeorm';

@Injectable()
export class AccessService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Admin)
        private readonly adminRepo: Repository<Admin>
    ) { }

    async checkUser(usr: string, psd: string): Promise<Result<User>> {
        let res = await this.userRepo.findOne({
            where: { account: usr }
        })
        if (res == null) {
            return Result.fail('找不到用户')
        } else if (psd != res.password) {
            return Result.fail('密码错误')
        } else {
            return Result.success(res, 'msg')
        }
    }

    async checkAdmin(usr: string, psd: string): Promise<Result<Admin>> {
        console.clear()
        console.log('checking:', usr, psd)
        let res = await this.adminRepo.findOne({
            where: { account: usr }
        })
        if (res == null) {
            return Result.fail('找不到用户')
        } else if (psd != res.password) {
            return Result.fail('密码错误')
        } else {
            return Result.success(res, 'msg')
        }
    }

    async createUser(user: User): Promise<Result<string>> {
        let res = await this.userRepo.findOne({
            where: { account: user.account }
        })
        if (res != null) {
            return Result.fail('账号已存在')
        }
        return await this.userRepo.save(user)
            .then(res => {
                return Result.success('', 'created user:' + JSON.stringify(user))
            })
            .catch(e => {
                return Result.fail('error:' + e)
            })
    }

    async deleteUser(uid: number) {
        let user = new User()
        user.id = uid
        return await this.userRepo.delete(user)
    }

    async updateUser(user: User) {
        return await this.userRepo.update(user.id, user)
    }
}
