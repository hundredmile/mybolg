import Head from 'next/head'
import React,{useState} from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import { Row,Col,Breadcrumb,Space,Affix} from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';
import MarkNav from 'markdown-navbar'
import marked from 'marked'  // 解析markdown
import hljs from 'highlight.js'  //代码高亮
import 'highlight.js/styles/monokai-sublime.css'
import 'markdown-navbar/dist/navbar.css'
import servicePath from '../../config/apiUrl'
import detailcss from './detail.module.css'


function Detail(props) {
  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false, // 忽略html标签
    tables:true,
    breaks:false,
    smartLists:true,
    highlight:function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)
  
  

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
                  <div className={detailcss.text}
                  dangerouslySetInnerHTML={{__html:html}}> 
                  </div>
              </div>
            </Col>
            <Col className='common-right' xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author/>
              <div className={detailcss.blankcontent}></div>

              <Affix offsetTop={71}>
                <div className={detailcss.marknav}>
                  <div className={detailcss.navtitle}>文章目录</div>
                  <MarkNav
                    className={detailcss.navitem}
                    source={html}
                    ordered={false}
                  />
                </div>
              </Affix>
            </Col>
          </Row>
        </main>

        <Footer/>
      </div>
    </div>
  )
}

Detail.getInitialProps = async(context) =>{
  console.log(context.query.id);
  let id = context.query.id

  const promise = new Promise((resolve,reject)=>{
    axios(servicePath.getArticleById+id).then(
        (res)=>{
          console.log(res.data);
          resolve(res.data.data[0])
        },
        (error)=>{
          reject(error)
        }
      )
     
    })
    return await promise
  }



export default Detail