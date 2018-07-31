const db_host = process.env.DB_CONFIG_HOST || '127.0.0.1';
const db_port = process.env.DB_CONFIG_PORT || 3306;
const db_database = process.env.DB_CONFIG_DATABASE || 'me_blog';
const db_user = process.env.DB_CONFIG_USER || 'root';
const db_password = process.env.DB_CONFIG_PASSWORD || '123456';

const jwt_secret = process.env.JWT_CONFIG_SECRET || 'secret';
const jwt_exprisesIn = process.env.JWT_CONFIG_EXPRISESIN || 604800; //设置失效时间为7天：7*24*60*60

module.exports = {
  mysqlDB : {
    host: db_host,
    port: db_port,
    database: db_database,
    user: db_user,
    password: db_password
  },
  jwt: {
    secret: jwt_secret,
    exprisesIn: jwt_exprisesIn
  }
}

