import React from 'react'
import { Avatar,Divider  } from 'antd';
import authcss from './author.module.css'
import { GithubOutlined,WechatOutlined } from '@ant-design/icons';

export default function author() {
  return (
    <div className={authcss.author} >
        <div><Avatar size={100} className={authcss.avatorbox} src="https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659805200&t=c2a68b7d2fd7bbf4a21c9ab1bbc03ec6"/></div>
        <div className={authcss.introduction}>
            个人介绍,前端学习
            <Divider className={authcss.divider}><span>社交账户</span></Divider>
            <div>
              <div className={authcss.account}>
                <Avatar className={authcss.github} size="large" icon={<GithubOutlined />} />
                <span className={authcss.accounttext}>123</span>
              </div>
              <div className={authcss.account}>
                <Avatar className={authcss.wechat} size="large" icon={<WechatOutlined />} />
                <span className={authcss.accounttext}>1388888888</span>
              </div>
            </div>
            
        </div>
    </div>
  )
}
