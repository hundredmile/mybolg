import Head from 'next/head'
import React,{useState} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import { Row,Col,Breadcrumb,Space} from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'  // 删除线
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import detailcss from './detail.module.css'


export default function Detail() {
  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }
  
  let markdown1=
  '# p01:来个Hello World \n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'

  return (
    <div className='bolg' data-theme={datatheme}>
      <Head>
        <title>Hundredmile</title>
      </Head>
      <div className='content'>
        <div className='headerfalse'></div>
        <Header changedatatheme={changedatatheme}/>
        
        <main>
          <Row className='common-main' type="flex" justify='center'>
            <Col className='common-left' xs={24} sm={24} md={16} lg={18} xl={14}>
              <div className={detailcss.bread}>
                <Breadcrumb className={detailcss.title}>
                  <Breadcrumb.Item><a href='/' >首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href='/' >视频列表</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href='/' >文章名</a></Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className={detailcss.content}>
                  <div className={detailcss.texttitle}>文章标题</div>
                  <div className='list-icon'>
                      <Space><FieldTimeOutlined />2022-02-05</Space>
                      <Space><FileWordOutlined />文章</Space>
                      <Space><EyeOutlined />300</Space>
                  </div>
                  <div className={detailcss.text}> 
                    <ReactMarkdown
                      children={markdown1}
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
              </div>
            </Col>
            <Col className='common-right' xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author/>
              <div className={detailcss.marknav}>
                <div className={detailcss.navtitle}>文章目录</div>
                <MarkNav
                  className={detailcss.navitem}
                  source={markdown1}
                  ordered={false}
                />
              </div>
            </Col>
          </Row>
        </main>

        <Footer/>
      </div>
    </div>
  )
}
