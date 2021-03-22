/*
 * @Date: 2021-03-17 19:15:38
 * @LastEditTime: 2021-03-17 19:57:14
 * @FilePath: \server\src\module\info\info.controller.ts
 * @Description: TODO:
 */
import { Controller, Get, Query } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
    constructor(
        private readonly infoService: InfoService
    ){}

    @Get('jingdian')
    getJingdian() {
        return this.infoService.getJd()
    }
    
    @Get('routes')
    getRoutes() {
        return this.infoService.getRoutes()
    }

    @Get('sites')
    getSites() {
        return this.infoService.getSites()
    }

    @Get('hints')
    getHints() {
        return this.infoService.getSearchHints()
    }

    @Get('search')
    async search(@Query('key') key:string, @Query('type') type?: ''|'desc') {
        if (key.trim() === '') {
            return []
        }
        if (type === 'desc') {
            return await this.infoService.searchByDesc(key)
        } else {
            return await this.infoService.searchByName(key)
        }
    }
}
