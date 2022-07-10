import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657334043761_916'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const database = process.env.EGG_MYSQL_SERVER_ENV_MYSQL_DATABASE || 'bigquant'

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,

    databaseName: database,

    // cluster: {
    //   listen: {
    //     port: 7000
    //     // hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    //     // path: '/var/run/egg.sock',
    //   }
    // },

    sequelize: {
      dialect: 'mysql',
      host: process.env.EGG_MYSQL_SERVER_PORT_3306_TCP_ADDR || '127.0.0.1',
      port: process.env.EGG_MYSQL_SERVER_PORT_3306_TCP_PORT || '3306',
      database,
      username: 'root',
      password:
        process.env.EGG_MYSQL_SERVER_ENV_MYSQL_ROOT_PASSWORD || '123456',
      timezone: '+08:00'
    },

    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
