# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Dev

```bash
yarn docker-up-dev
yarn dev
```

### Mysql

运行了 `docker-up-dev` 后，在 `docker` 中查看 `mysql` 数据库的相关数据

```bash
mysql -u root -p # 密码默认 123456

SHOW DATABASES; # 看到 bigquant 的话就可以使用下面
use bigquant;

SHOW TABLES;

```

### Sequelize

数据库与 model 的同步

```bash
npx sequelize migration:generate --name=init-share # --name 为对应的表的操作脚本名 建议是 相关行为+表名

```
