/*
 * @Author: Vincent
 * @Date: 2022-03-29 18:11:34
 * @LastEditTime: 2022-04-01 10:56:49
 * @LastEditors: Vincent
 * @Description: websocket管理
 */
const ws = require('nodejs-websocket');

const WebSocket = function () {
  this.wsServer = null;
  this.onlineUsers = [];
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
        if (!this.onlineUsers.includes(curUserId)) {
          this.onlineUsers.push(curUserId);
        }
        // 断开连接
        socket.on('close', (code) => {
          console.log('ws服务已断开', this);
          const index = this.onlineUsers.indexOf(curUserId);
          if (index !== -1) {
            this.onlineUsers.splice(index, 1);
          }
        });
        // 异常断开
        socket.on('error', (code) => {
          try {
            socket.close();
            const index = this.onlineUsers.indexOf(curUserId);
            if (index !== -1) {
              this.onlineUsers.splice(index, 1);
            }
          } catch (err) {
            console.log('ws断开异常', err);
          }
          console.log('ws服务异常断开', code);
        });
        // 消息订阅
        socket.on('text', (msg) => {
          console.log(msg);
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
        if (!this.onlineUsers.includes(curUserId)) {
          this.onlineUsers.push(curUserId);
        }
      }
    }
    return curUserId;
  },
};

module.exports = WebSocket;
