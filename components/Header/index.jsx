 import React  from 'react'
 import headers from './header.module.css'
 import Darklight from '../darklight';
 import {Row,Col,Menu} from 'antd'
 import Router from 'next/router'
 import { HomeOutlined, VideoCameraOutlined, SmileOutlined } from '@ant-design/icons';

 const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '我的记录',
    key: 'list',
    icon: <VideoCameraOutlined />,
  },
  {
    label: '快乐生活',
    key: 'smile',
    icon: <SmileOutlined />,
  },
]

 const  Header = (props)=> {
  function changetheme(){
    props.changedatatheme()
  }
  function onClick(e){
    console.log(e);
    Router.push(e.key)
  }
   return (
     <div className={headers.header}>
        <Row type='flex' justify='center'> 
          <Col xs={24} sm={24} md={10} lg={15} xl={12} className={headers.left}>
            <span className={headers.headerLogo}>Hundredmile</span>
            <span className={headers.headerText}>这是占位符合!</span>
          </Col>
          <Col xs={0} sm={0} md={14} lg={8} xl={6} className={headers.right}>
            <Menu onClick={onClick}  mode="horizontal" items={items} className={headers.right}/>
          </Col>
        </Row>
        <Darklight changetheme={changetheme}/>
     </div>
   )
 }
 export default Header

 