import Head from 'next/head'
import React,{useState} from 'react'
import Router from 'next/router'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import { Row,Col,Breadcrumb,Space,Affix} from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';
import marked from 'marked'  // 解析markdown
import hljs from 'highlight.js'  //代码高亮
import 'highlight.js/styles/monokai-sublime.css'
import 'markdown-navbar/dist/navbar.css'
import servicePath from '../../config/apiUrl'
import Tocify from '../../components/tocify.tsx'
import detailcss from './detail.module.css'


function Detail(props) {
  

  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }

  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer:renderer,
    gfm:true,        // github样式渲染
    pedantic:false,  // 容错处理
    sanitize:false, // 忽略html标签
    tables:true,
    breaks:false,    // git的换行符
    smartLists:true,  //自动渲染列表
    highlight:function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)
  
  function breadback(e){
    console.log(e.currentTarget.getAttribute('data-href'));
    Router.replace(e.currentTarget.getAttribute('data-href'))
  }

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
                  <Breadcrumb.Item><a data-href='/' onClick={breadback}>首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a data-href='/list' onClick={breadback}>我的记录</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a >{props.title}</a></Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className={detailcss.content}>
                  <div className={detailcss.texttitle}>{props.title}</div>
                  <div className='list-icon'>
                      <Space><FieldTimeOutlined />{props.createTime.slice(0,10)}</Space>
                      <Space><FileWordOutlined />{props.typeName}</Space>
                      <Space><EyeOutlined />{props.view_count}</Space>
                  </div>
                  <div className={detailcss.text} id="detailtext"
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
                  {tocify && tocify.render()}
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