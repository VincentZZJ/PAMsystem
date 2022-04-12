/*
 * @Author: Vincent
 * @Date: 2022-03-24 10:47:57
 * @LastEditTime: 2022-04-11 13:40:41
 * @LastEditors: Vincent
 * @Description:
 */

import React, { useEffect, useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Input, Form, Button, Empty, Modal, Divider, message } from 'antd';
import {
  UserAddOutlined,
  SearchOutlined,
  SendOutlined,
  UserOutlined,
  TeamOutlined,
  FolderOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useModel } from 'umi';
import {
  getChatRoomListService,
  getChatRoomInfoService,
  addFriendsService,
  searchFriendsService,
} from '@/services/pamsystem/chatroom';
import { formatMsgModel, initWebsocket } from '@/utils/websocket';
import moment from 'moment';
import styles from './index.less';

const FormItem = Form.Item;

const fakeRoom = {
  roomId: '123',
  roomName: '群组1',
  msgList: [
    {
      msgId: '1234',
      userId: '12345',
      roomList: [],
      userImg: '#',
      msgTime: '2022-03-24 19:00:22',
      msgContent:
        '下班没呀群聊）移上去可以悬停查看群成员或个人信息群聊）移上去可以悬停查看群成员或个人信息',
    },
    {
      msgId: '1234',
      userId: '12345',
      roomList: [],
      userImg: '#',
      msgTime: '2022-03-24 19:00:22',
      msgContent:
        '下班没呀群聊）移上去可以悬停查看群成员或个人信息群聊）移上去可以悬停查看群成员或个人信息',
    },
  ],
};

const fakeUserList = [
  {
    roomId: '123',
    userName: '群组1',
    latestMsg:
      '下班没呀群聊）移上去可以悬停查看群成员或个人信息群聊）移上去可以悬停查看群成员或个人信息',
    latestMsgTime: '2022-03-24 19:00:22',
    roomImg: '#',
  },
  {
    roomId: '1233',
    userName: '群组2',
    latestMsg:
      '下班没呀群聊）移上去可以悬停查看群成员或个人信息群聊）移上去可以悬停查看群成员或个人信息',
    latestMsgTime: '2022-03-24 19:00:22',
    roomImg: '#',
  },
];

const fakeFriends = [
  {
    id: '231',
    userName: '张三',
    userImg: '#',
  },
];

const Page = () => {
  const [roomList, setRoomList] = useState(new Map());
  const [curChatRoom, setCurChatRoom] = useState({});
  const [showSearchUserModal, setShowSearchUserModal] = useState(false);
  const [addFriendModal, setAddFriendModal] = useState(false);
  const [searchForm] = Form.useForm();
  const [searchUserForm] = Form.useForm();
  const [msgForm] = Form.useForm();
  const [addFriendForm] = Form.useForm();
  const [searchFriends, setSearchFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState({});
  const { initialState } = useModel('@@initialState');
  // const { msgList } = useModel('useChatRoomModel', (model) => ({ msgList: model.msgList }));
  const [curMsgList, setCurMsgList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(new Date().valueOf());

  //   搜索框查询
  const handleSearchFun = (val) => {
    console.log(val);
  };

  //   消息发送
  const handleMsgSend = (val) => {
    const userId = initialState.currentUser.userId;
    if (window.wsServer && window.wsServer.readyState == WebSocket.OPEN) {
      const msgData = {
        roomId: curChatRoom.id,
        msgFrom: userId,
        msgTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        msg: val.msg,
      };
      window.wsServer.send(JSON.stringify(formatMsgModel('chatroommsg', msgData)));
    } else {
      initWebsocket(window.location.hostname, userId);
    }
  };

  //   查找好友
  const handleSearchFriends = async (val) => {
    try {
      const response = await searchFriendsService(val);
      let list = [];
      if (response?.code === '0') {
        list = response.msg;
      }
      setSearchFriends(list);
    } catch (e) {
      message.error('操作失败');
      console.log(e);
    }
  };

  //   添加好友
  const handleAddFriends = async (val) => {
    try {
      const response = await addFriendsService({
        ...val,
        userId: initialState.currentUser.userId,
        msgTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      if (response && response.code === '0') {
        message.success('添加成功');
        setAddFriendModal(false);
        setShowSearchUserModal(false);
        setSelectedFriend({});
        setSearchFriends([]);
        setIsRefresh(new Date().valueOf());
      } else {
        message.error(response?.desc ?? '添加失败');
      }
    } catch (e) {
      message.error('操作失败');
      console.log(e);
    }
  };

  //   点击切换聊天窗口
  const handleMsgChange = async (msgInfo) => {
    if (msgInfo?.id) {
      try {
        const response = await getChatRoomInfoService(msgInfo.id);
        setCurMsgList(response?.msg ?? []);
      } catch (e) {
        message.error('操作失败');
        console.log(e);
      }
    }
  };

  // useEffect(() => {
  //   if (msgList?.length > 0) {
  //     const list = msgList.filter((item) => item.id === curChatRoom.id);
  //     setCurMsgList(list);
  //   }
  // }, [msgList]);

  useEffect(() => {
    //   获取用户列表
    const getRoomList = async (id) => {
      try {
        const response = await getChatRoomListService(id);
        const roomMap = new Map();
        if (response && response.code === '0' && response.msg?.length > 0) {
          response.msg.forEach((item) => roomMap.set(item.id, item));
          setCurChatRoom(response.msg[0]);
        }
        setRoomList(roomMap);
      } catch (e) {
        message.error('操作失败');
        console.log(e);
      }
    };
    if (initialState?.currentUser?.userId) {
      getRoomList(initialState.currentUser.userId);
    }
  }, [isRefresh]);

  useEffect(() => {
    // const socket = io('ws://localhost:3000');
    // console.log(socket);
    // const socket = new WebSocket(`ws://${window.location.hostname}:3030`);
    // console.log(socket);
  }, []);

  return (
    <PageWrapper pageTitleCmp="聊天室">
      <div className={styles.wrapBox}>
        <div className={styles.contentBox}>
          {curChatRoom?.id ? (
            <>
              <div className={styles.contentHeader}>
                <div>{curChatRoom?.roomName ?? '/'}</div>
                <div>{curChatRoom?.userList?.length > 1 ? <UserOutlined /> : <TeamOutlined />}</div>
              </div>
              <div className={styles.contentWindow}>
                {curMsgList?.length > 0
                  ? curMsgList.map((item) => {
                      const itemCls =
                        item.msgfrom === initialState.currentUser.userId
                          ? styles.onRightRender
                          : styles.onLeftRender;
                      return (
                        <div className={`${styles.msgItemBox} ${itemCls}`}>
                          <div>
                            <img src={item.userImg} />
                          </div>
                          <div>
                            {/* <span>{item.msgTime}</span> */}
                            <p>{item.msg}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className={styles.contentBtm}>
                <Form form={msgForm} layout="inline" onFinish={handleMsgSend}>
                  <div className={styles.sendBox}>
                    <div>
                      <FormItem name="msg">
                        <Input.TextArea
                          rows={4}
                          style={{ width: '65rem' }}
                          placeholder="请输入内容..."
                          maxLength={140}
                        />
                      </FormItem>
                    </div>
                    <div>
                      <FormItem>
                        <Button type="primary" htmlType="submit" title="发送">
                          <SendOutlined />
                          发送
                        </Button>
                      </FormItem>
                      <FormItem>
                        <Button type="primary" htmlType="submit">
                          <FolderOutlined />
                          上传
                        </Button>
                      </FormItem>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          ) : (
            <Empty description="空" />
          )}
        </div>
        <div className={styles.rightBox}>
          <div>
            <Form form={searchForm} layout="inline" onFinish={handleSearchFun}>
              <FormItem name="searchKey">
                <Input placeholder="搜索" style={{ width: '16rem' }} />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" title="搜索好友">
                  <SearchOutlined />
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  title="添加好友"
                  onClick={() => setShowSearchUserModal(true)}
                >
                  <UserAddOutlined />
                </Button>
              </FormItem>
            </Form>
          </div>
          <div>
            {roomList.size > 0 ? (
              Array.from(roomList.values()).map((item) => (
                <div
                  className={`${styles.userItemBox} ${
                    curChatRoom.id === item.id ? styles.selectedItem : ''
                  }`}
                  onClick={() => handleMsgChange(item)}
                >
                  <div>
                    <img src={item?.roomImg ?? '#'} />
                  </div>
                  <div>
                    <div>
                      <p>{item?.roomName ?? '/'}</p>
                      <p>{item?.latestMsgTime ?? '/'}</p>
                    </div>
                    <div>{item?.latestMsg ?? '/'}</div>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="暂无聊天人员信息" />
            )}
          </div>
        </div>
      </div>
      {showSearchUserModal ? (
        <Modal
          visible={showSearchUserModal}
          title="查找好用信息"
          centered
          className={styles.addFriendModalCls}
          maskClosable={false}
          destroyOnClose
          onCancel={() => setShowSearchUserModal(false)}
          footer={null}
        >
          <div>
            <div>
              <Form form={searchUserForm} layout="inline" onFinish={handleSearchFriends}>
                <FormItem label="查找用户" name="phone" required>
                  <Input style={{ width: '16rem' }} placeholder="请输入好友手机号进行查询..." />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    <SearchOutlined />
                    搜索
                  </Button>
                </FormItem>
              </Form>
            </div>
            <Divider />
            <div>
              {searchFriends?.length > 0 ? (
                searchFriends.map((item) => (
                  <div className={styles.friendBoxItem}>
                    <div>
                      <img src={item?.userImg ?? '#'} />
                      <span>{item?.userName}</span>
                    </div>
                    <div>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          setAddFriendModal(true);
                          setSelectedFriend(item);
                        }}
                      >
                        <PlusOutlined />
                        添加
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="没找到..." />
              )}
            </div>
          </div>
        </Modal>
      ) : null}
      {addFriendModal ? (
        <Modal
          visible={addFriendModal}
          centered
          title="添加好友"
          maskClosable={false}
          footer={null}
          destroyOnClose
          onCancel={() => {
            setAddFriendModal(false);
            setSelectedFriend({});
          }}
        >
          <Form layout="vertical" form={addFriendForm} onFinish={handleAddFriends}>
            <FormItem name="friendId" initialValue={selectedFriend.id} hidden>
              <Input />
            </FormItem>
            <FormItem name="addMsg" required label="验证信息">
              <Input placeholder="请添加验证信息..." />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </FormItem>
          </Form>
        </Modal>
      ) : null}
    </PageWrapper>
  );
};

export default Page;
