<!--
 * @Author: Vincent
 * @Date: 2022-03-28 16:32:37
 * @LastEditTime: 2022-03-28 16:38:21
 * @LastEditors: Vincent
 * @Description:后台逻辑构思
-->

# 聊天室

- 用户进入模块后，根据用户 id 查询聊天列表，并建立 websocket 连接
- 点击某聊天室查询历史聊天信息
- 发送文字类信息，直接 websocket 消息传送，图片上传用接口保存后，用 websocket 推送到聊天室
