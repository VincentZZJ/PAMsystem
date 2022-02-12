/*
 * @Author: Vincent
 * @Date: 2022-02-11 10:38:29
 * @LastEditTime: 2022-02-11 11:21:06
 * @LastEditors: Vincent
 * @Description:
 */
import React from 'react';
import styles from './index.less';

const Page = (props) => {
  const { children, pageTitleCmp, pageTitleExtraCmp, classNames } = props;
  return (
    <div className={`${styles.pageWrap} ${classNames}`}>
      <div className={styles.top}>
        <div className={styles.headTitle}>{pageTitleCmp}</div>
        <div>{pageTitleExtraCmp}</div>
      </div>
      <div className={styles.btm}>{children}</div>
    </div>
  );
};

export default Page;
