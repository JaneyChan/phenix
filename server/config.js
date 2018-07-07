module.exports = {
    mysqlDB : {
        host: '127.0.0.1', // 数据库IP
        port: 3306, // 数据库端口
        database: 'me_blog', // 数据库名称
        user: 'root', // 数据库用户名
        password: '664198', // 数据库密码
    },
    jwt: {
        secret: 'umeet',            
        exprisesIn: 24*60*60*1000
    }
}

