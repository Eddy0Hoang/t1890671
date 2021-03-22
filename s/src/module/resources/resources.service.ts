import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra'

@Injectable()
export class ResourcesService {
    async getImg(name: string): Promise<Buffer> {
        if (!name.endsWith('.png')) {
            name += '.png'
        }
        if (fs.existsSync('./jingdian/images/' + name)) {
            return await fs.readFile('./jingdian/images/' + name)
        }
        return null
    }
}
