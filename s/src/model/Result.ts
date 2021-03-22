/*
 * @Date: 2021-03-17 20:01:19
 * @LastEditTime: 2021-03-17 20:09:14
 * @FilePath: \server\src\model\Result.ts
 * @Description: TODO:
 */

export class Result<T> {
    constructor(
        public code: number,
        public msg: string,
        public data: T
    ) { }
    
    static success<T>(data: T, msg='') {
        return new Result<T>(1, msg, data)
    }
    static fail<T>(msg: string, data?: T) {
        return new Result<T>(0, msg, data)
    }
}