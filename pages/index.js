import Head from 'next/head'
import React,{useState} from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import axios from 'axios'
import { Row,Col,List,Space } from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';
import servicePath from '../config/apiUrl'
import marked from 'marked'  // 解析markdown
import hljs from 'highlight.js'  //代码高亮
import 'highlight.js/styles/monokai-sublime.css'

 function Home(list) {
  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }
  const [mylist,setMylist] = useState(list.data)

  const renderer = new marked.Renderer()
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
            <List
                header={
                    <div>最新日志</div>
                }
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item=>(
                  <List.Item>
                    <div className='list-title'>
                      <Link href={{pathname:'/detail',query:{id:item.id}}}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className='list-icon'>
                      <Space><FieldTimeOutlined />{item.createTime.slice(0,10)}</Space>
                      <Space><FileWordOutlined />{item.typeName}</Space>
                      <Space><EyeOutlined />{item.view_count}</Space>
                    </div>
                    <div className='list-context'
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                    ></div>
                  </List.Item>
                )}
              />
            </Col>
            <Col className='common-right' xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author/>
            </Col>
          </Row>
        </main>

        <Footer/>
      </div>
    </div>
  )
}

Home.getInitialProps = async ()=>{

  const promise = new Promise((resolve,reject)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      },
      (error)=>{
        reject(error)
      }
    )
  })
  return await promise
}

export default Home
