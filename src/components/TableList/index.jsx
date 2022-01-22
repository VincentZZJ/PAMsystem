/*
 * @Author: Vincent
 * @Date: 2022-01-22 15:06:21
 * @LastEditTime: 2022-01-22 15:40:02
 * @LastEditors: Vincent
 * @Description:
 */

import React from 'react';
import styles from './index.less';

const Page = (props) => {
  const { topComponent, bottomComponent } = props;
  debugger;
  return (
    <div className={styles.wrap}>
      <div>{topComponent}</div>
      <div>{bottomComponent}</div>
    </div>
  );
};

export default Page;
