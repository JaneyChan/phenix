
module.exports = {
    mysqlDB : {
        host: '127.0.0.1', // 数据库IP
        port: 3306, // 数据库端口
        database: 'me_blog', // 数据库名称
        user: 'root', // 数据库用户名
        password: '123456', // 数据库密码
    },
    jwt: {
        secret: 'umeet',            
        exprisesIn: '3600s'          //以秒为单位
    },
}
