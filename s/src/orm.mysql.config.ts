import * as path from 'path'
export default {
    type: 'mysql',
    host: 'eddy-s.ltd',
    port: 3306,
    username: 't1890671',
    password: 't1890671',
    database: 't1890671',
    entities: [ path.join(__dirname, '../**', '*.entity.{ts,js}') ],
    synchronize: true
}