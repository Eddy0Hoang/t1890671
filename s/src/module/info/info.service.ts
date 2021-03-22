/*
 * @Date: 2021-03-17 19:15:44
 * @LastEditTime: 2021-03-17 19:59:14
 * @FilePath: \server\src\module\info\info.service.ts
 * @Description: TODO:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jingdian } from 'entities/Jingdian.entity';
import { Route } from 'entities/Route.entity';
import { Site } from 'entities/Site.entity';
import { Repository } from 'typeorm';
import jingdian from './data';
import routes from './routes';
import sen from './scenery'


@Injectable()
export class InfoService {
    constructor(
        @InjectRepository(Jingdian) private readonly jdRepo: Repository<Jingdian>,
        @InjectRepository(Site) private readonly siteRepo: Repository<Site>,
        @InjectRepository(Route) private readonly routeRepo: Repository<Route>
    ) {}

    async getJd(): Promise<Jingdian[]> {
        return await this.insertJd()
    }

    private async insertJd() {
        let jds: Jingdian[] = await this.jdRepo.query('select * from jingdian')
        if (jds.length === 0) {
            console.clear()
            const jdList: Jingdian[] = jingdian
            jdList.forEach(jd => {
                jd.sceneryImages = JSON.stringify(jd.sceneryImages)
                jds.push(jd)
            });
            await this.jdRepo.save(jds)
        }
        return jds
    }
    async getRoutes(): Promise<Route[]> {
        return this.insertRoutes()
    }

    private async insertRoutes() {
        let route: Route[] = await this.routeRepo.query('select * from route')
        if (route.length === 0) {
            console.clear()
            await this.routeRepo.save(routes)
            return routes
        }
        return route
    }

    async getSites(): Promise<Site[]> {
        return this.insertSites()
    }

    private async insertSites() {
        let sites: Site[] = await this.siteRepo.query('select * from site')
        if (sites.length === 0) {
            console.clear()
            await this.siteRepo.save(sen)
            return sen
        }
        return sites
    }

    async getSearchHints(): Promise<string[]> {
        return (await this.jdRepo.query('select name from jingdian')).map((v: {name:string}) => v.name)
    }

    async searchByName(key:string): Promise<Jingdian[]> {
        return await this.jdRepo
            .createQueryBuilder('jingdian')
            .where(`name like '%${key}%'`)
            .orderBy('jingdian.id', 'DESC')
            .getMany()
    }

    async searchByDesc(key:string): Promise<Jingdian[]> {
        return await this.jdRepo
            .createQueryBuilder('jingdian')
            .where(`\`desc\` like '%${key}%'`)
            .orderBy('jingdian.id', 'DESC')
            .getMany()
    }
}
