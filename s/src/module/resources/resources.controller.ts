import { Controller, Get, Param, Res } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { resolve } from 'path'

@Controller('res')
export class ResourcesController {
    constructor(
        private readonly resService: ResourcesService
    ) {}

    @Get('img/:name')
    async getImage(@Param('name') name: string, @Res() res) {
        res.sendFile(resolve('./jingdian/images/' + name))
    }
}
