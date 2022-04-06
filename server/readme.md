<!--
 * @Author: Vincent
 * @Date: 2021-12-07 14:56:21
 * @LastEditTime: 2022-03-28 16:32:23
 * @LastEditors: Vincent
 * @Description: 后台服务
-->

## 技术栈（koa2 + mysql）

## 注意点

- 自动化生成数据库模型`sequelize-auto -o ./schema -d 数据库名 -h 127.0.0.1 -u 用户名 -p 端口 -x 密码 -e mysql`

## 利用 redis 实现临时数据缓存

- 本地安装 redis，并添加到环境变量中，使用前先打开服务`redis-server`，然后通过`redis-cli`进入客户端执行命令操作

- 设想：1、redis 实现 token 的保留，验证 token 有效性；2、redis 搭配 websocket 实现消息发布和订阅

## 使用 websocket 实现即时通信

## 图片的 id 可以使用 file_md5 来做唯一处理
