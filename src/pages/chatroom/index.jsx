/*
 * @Author: Vincent
 * @Date: 2022-03-24 10:47:57
 * @LastEditTime: 2022-05-30 17:52:05
 * @LastEditors: Vincent
 * @Description:
 */

import React, { useEffect, useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Input, Form, Button, Empty, Modal, Divider, message, Badge } from 'antd';
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
  getRoomUserListByRoomIdService,
} from '@/services/pamsystem/chatroom';
import { formatMsgModel } from '@/utils/utils';
import moment from 'moment';
import styles from './index.less';

const FormItem = Form.Item;

const Page = () => {
  const [roomListMap, setRoomListMap] = useState(new Map());
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
  const { wsServer } = useModel('useWebsocket', (model) => ({ wsServer: model.wsServer }));
  const { msgList, clearMsgList } = useModel('useChatRoomModel', (model) => ({
    msgList: model.msgList,
    clearMsgList: model.clearMsgList,
  }));
  const [curMsgList, setCurMsgList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(new Date().valueOf());
  const [unReadMsgMap, setUnReadMsgMap] = useState(new Map());

  //   搜索框查询
  const handleSearchFun = (val) => {
    console.log(val);
  };

  //   消息发送
  const handleMsgSend = (val) => {
    const userId = initialState.currentUser.userId;
    const { userList = [] } = curChatRoom;
    const msgToList = userList.filter((item) => item.userId !== userId);
    if (wsServer && wsServer.readyState === WebSocket.OPEN) {
      const msgData = {
        roomId: curChatRoom.id,
        msgfrom: userId,
        msgto: JSON.stringify(msgToList),
        msgTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        msg: val.msg,
      };
      wsServer.send(JSON.stringify(formatMsgModel('chatroommsg', msgData)));
      msgForm.resetFields();
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
        addFriendForm.resetFields();
      } else {
        message.error(response?.desc ?? '添加失败');
      }
    } catch (e) {
      message.error('操作失败');
      console.log(e);
    }
  };

  //   点击切换聊天窗口
  const handleMsgChange = async (roomInfo) => {
    if (roomInfo?.id) {
      try {
        const roomMembersRes = await getRoomUserListByRoomIdService(roomInfo.id);
        const response = await getChatRoomInfoService({
          id: roomInfo.id,
          userId: initialState.currentUser.userId,
        });
        const newUnReadMsgMap = _.cloneDeep(unReadMsgMap);
        setCurMsgList(response?.msg ?? []);
        setCurChatRoom({ ...roomInfo, userList: roomMembersRes?.msg ?? [] });
        newUnReadMsgMap.set(roomInfo.id, 0);
        setUnReadMsgMap(newUnReadMsgMap);
      } catch (e) {
        message.error('操作失败');
        console.log(e);
      }
    }
  };

  useEffect(() => {
    //   获取用户列表
    const getRoomList = async (id) => {
      try {
        const response = await getChatRoomListService(id);
        const roomMap = new Map();
        const unReadMsgMap = new Map();
        if (response && response.code === '0' && response.msg?.length > 0) {
          response.msg.forEach((item) => {
            roomMap.set(item.id, { ...item });
            unReadMsgMap.set(item.id, 0);
          });
        }
        setRoomListMap(roomMap);
        setUnReadMsgMap(unReadMsgMap);
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
    if (msgList?.length > 0) {
      const { id } = curChatRoom;
      const list = curMsgList.slice();
      const newUnReadMsg = _.cloneDeep(unReadMsgMap);
      msgList.forEach((item) => {
        if (unReadMsgMap.has(item.roomId) && item.roomId !== id) {
          const unReadCount = newUnReadMsg.get(item.roomId);
          newUnReadMsg.set(item.roomId, unReadCount + 1);
        }
        if (item.roomId === id) {
          list.push(item);
        }
      });
      setUnReadMsgMap(newUnReadMsg);
      setCurMsgList(list);
      clearMsgList();
    }
  }, [msgList]);

  console.log(curChatRoom);
  return (
    <PageWrapper pageTitleCmp="聊天室">
      <div className={styles.wrapBox}>
        <div className={styles.contentBox}>
          {curChatRoom?.id ? (
            <>
              <div className={styles.contentHeader}>
                <div>{curChatRoom?.roomName ?? '/'}</div>
                <div>{curChatRoom?.userList?.length < 3 ? <UserOutlined /> : <TeamOutlined />}</div>
              </div>
              <div className={styles.contentWindow}>
                {curMsgList?.length > 0
                  ? curMsgList.map((item) => {
                      const itemCls =
                        item.msgfrom === initialState?.currentUser?.userId
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
            {roomListMap.size > 0 ? (
              Array.from(roomListMap.values()).map((item) => (
                <div
                  className={`${styles.userItemBox} ${
                    curChatRoom.id === item.id ? styles.selectedItem : ''
                  }`}
                  onClick={() => handleMsgChange(item)}
                >
                  <div>
                    <Badge
                      count={unReadMsgMap.has(item.id) ? unReadMsgMap.get(item.id) : 0}
                      overflowCount={5}
                    >
                      <img src={item?.roomImg ?? '#'} />
                    </Badge>
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
            addFriendForm.resetFields();
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
