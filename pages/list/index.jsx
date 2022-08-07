import Head from 'next/head'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import listcss from './list.module.css'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import { Row,Col,List,Space,Breadcrumb} from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';

export default function list() {
  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }
  const [mylist,setMylist] = useState([])

  // 读取文章类别分类
  const [navArray,setNavArray] = useState([])
  useEffect(()=>{
    const resultdata = async ()=>{
      const result = await axios(servicePath.getTypeInfo).then(
        (res)=>{
          console.log(res.data.data);
          return res.data.data
        }
      )
      setNavArray(result)
    }
    resultdata()
  },[])            
  
  // 动态添加类名  获取不同类别的分类
  
  // const initialIndex = sessionStorage.getItem('classIndex')||2
  const [classIndex,setClassIndex] = useState(2)
  function addClass(e){
    setClassIndex(e.currentTarget.getAttribute('data-index'))
    sessionStorage.setItem('classIndex',e.currentTarget.getAttribute('data-index') );
  }
  useEffect(() => {
    let num = sessionStorage.getItem('classIndex') || 2;
    setClassIndex(num)
    axios(servicePath.getArticleByTypeId+num).then(
      (res)=>{
        setMylist(res.data.data)
      },
      (error)=>{
        console.log(error);
      }
    )
  }, [classIndex]);
 

  return (
    <div className='bolg' data-theme={datatheme}>
      <Head>
        <title>Hundredmile</title>
      </Head>
      
      <div className='content'>
      <Header changedatatheme={changedatatheme}/>
      <div className='headerfalse'></div>
        
        <main>
          <Row className='common-main' type="flex" justify='center'>
            <Col className='common-left' xs={24} sm={24} md={16} lg={18} xl={14}>
              <div >
                <Breadcrumb className={listcss.title}>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/">我的记录</a></Breadcrumb.Item>
                </Breadcrumb>
              </div>
            <List
                header={
                  <>
                    <div>我的记录</div>
                    {
                      navArray.map((item)=>{
                        return <div 
                        key={item.id} 
                        onClick={addClass}
                        data-index={item.id}
                        className={classIndex==item.id?"listactive":''}
                        >{item.typeName}</div>
                      })
                    }
                  </>
                }
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item=>(
                  <List.Item>
                    <div className='list-title'>
                      <Link href={{pathname:'/detail',query:{id:item.id}}}>
                        <a> {item.title}</a>
                      </Link>
                    </div>
                    <div className='list-icon'>
                      <Space><FieldTimeOutlined />{item.createTime.slice(0,10)}</Space>
                      <Space><FileWordOutlined />{item.typeName}</Space>
                      <Space><EyeOutlined />{item.view_count}</Space>
                    </div>
                    <div className='list-context'>{item.introduce}</div>
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
