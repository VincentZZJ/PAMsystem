/*
 * @Author: Vincent
 * @Date: 2022-03-29 18:11:34
 * @LastEditTime: 2022-05-28 17:06:33
 * @LastEditors: Vincent
 * @Description: websocket管理
 */
const ws = require('nodejs-websocket');
const { Mysql } = require('./config/mysql');
const UserAndRoom = Mysql.user_and_room;
const { getMsgPath, saveMsgToLocal } = require('./controllers/chatRoomCtrl');
const { getUserInfoByUserId } = require('./models/userModel');

const WebSocket = function () {
  this.wsServer = null;
  this.onlineUsers = new Map();
  return this;
};

// 原型扩展
WebSocket.prototype = {
  // 创建服务
  createServer() {
    const server = ws
      .createServer((socket) => {
        //   动态监听在线用户
        const curUserId = this.userOnlineMng(socket.path);
        if (!this.onlineUsers.has(curUserId)) {
          this.onlineUsers.set(curUserId, socket);
        }
        // 断开连接
        socket.on('close', (code) => {
          console.log('ws服务已断开', this);
          if (this.onlineUsers.has(curUserId)) {
            this.onlineUsers.delete(curUserId);
          }
        });
        // 异常断开
        socket.on('error', (code) => {
          try {
            socket.close();
            if (this.onlineUsers.has(curUserId)) {
              this.onlineUsers.delete(curUserId);
            }
          } catch (err) {
            console.log('ws断开异常', err);
          }
          console.log('ws服务异常断开', code);
        });
        // 消息订阅
        socket.on('text', async (msg) => {
          const msgInfo = JSON.parse(msg);
          // 聊天即时讯息接受
          if (msgInfo.msgPath === 'chatroommsg') {
            const { roomId, msgto, msgfrom, msg, msgTime } = msgInfo.msgData;
            const userList = await UserAndRoom.findAll({
              attributes: ['userId'],
              where: {
                roomId,
              },
            });
            userList.forEach((item) => {
              if (this.onlineUsers.has(item.userId)) {
                this.onlineUsers.get(item.userId).sendText(JSON.stringify(msgInfo));
              }
            });
            const msgToArray = JSON.parse(msgto);
            const msgToId = msgToArray.length > 0 ? msgToArray[0].userId : '';
            const msgFromInfo = await getUserInfoByUserId(msgfrom);
            const msgToInfo = await getUserInfoByUserId(msgToId);
            if (msgFromInfo.id && msgToInfo.id) {
              const msgFromPath = await getMsgPath(msgFromInfo.phone);
              const msgToPath = await getMsgPath(msgToInfo.phone);
              await saveMsgToLocal(msgFromPath, {
                friendId: msgToId,
                userId: msgfrom,
                addMsg: msg,
                msgTime,
                roomId,
              });
              await saveMsgToLocal(msgToPath, {
                friendId: msgToId,
                userId: msgfrom,
                addMsg: msg,
                msgTime,
                roomId,
              });
            } else {
              console.log('记录保存失败');
            }
          }
        });
        console.log(this);
      })
      .listen(3030);
    // 所有连接释放时，清空聊天室用户
    server.on('close', () => {
      console.log('ws server close');
    });
    this.wsServer = server;
  },
  //   广播信息 & 点对点通信
  messageCenter(msg, roomId) {
    if (this.wsServer) {
      this.wsServer.connections.forEach((con) => {
        if (roomId) {
          if (con.id === roomId) {
            con.sendText(JSON.stringify(msg));
          }
        } else {
          con.sendText(JSON.stringify(msg));
        }
      });
    }
  },
  //   在线用户动态管理
  userOnlineMng(path) {
    let curUserId = '';
    if (path) {
      const strArray = path.split('userId=');
      if (strArray.length > 0) {
        curUserId = strArray[strArray.length - 1];
      }
    }
    return curUserId;
  },
};

module.exports = WebSocket;
