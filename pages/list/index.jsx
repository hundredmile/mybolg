import Head from 'next/head'
import React,{useState} from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import listcss from './list.module.css'
import { Row,Col,List,Space,Breadcrumb,Button  } from 'antd'
import { FieldTimeOutlined,FileWordOutlined,EyeOutlined } from '@ant-design/icons';

export default function list() {
  const [datatheme,setdatatheme] = useState(['light'])
  function changedatatheme(){
    setdatatheme(datatheme=='light'?'dark':'light')
  }
  const [mylist,setMylist] = useState(
    [
      {title:'js深拷贝和浅拷贝',context:'总结来看，浅拷贝的时候如果数据是基本数据类型，那么就如同直接赋值那种，会拷贝其本身，如果除了基本数据类型之外还有一层对象，那么对于浅拷贝而言就只能拷贝其引用，对象的改变会反应到拷贝对象上；但是深拷贝就会拷贝多层，即使是嵌套了对象，也会都拷贝出来。'},
      {title:'vue的生命周期',context:'new Vue()实例化一个vue实例，然后init初始化event 和 lifecycle， 其实这个过程中分别调用了3个初始化函数（initLifecycle(), initEvents(), initRender()），分别初始化了生命周期，事件以及定义createElement函数，初始化生命周期时，定义了一些属性，比如表示当前状态生命周期状态得_isMounted ，_isDestroyed ，_isBeingDestroyed，表示keep-alive中组件状态的_inactive，而初始化event时，实际上就是定义了$once、$off、$emit、$on几个函数。而createElement函数是在初始化render时定义的（调用了initRender函数）'},
      {title:'react生命周期函数',context:'取得默认属性 getDefaultProps 外部传入的props初始状态 getInitailState state状态即将挂载 componentWillMount描画VDOM render取得默认属性，初始状态在constructor中完成（运行一次，可读数据，可同步修改state，异步修改state需要setState,setState在实例产生后才可以使用，可以访问到props）'},
    ]
  )

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
                    <Button>全部记录</Button>
                    <Button>js基础</Button>
                    <Button>关于vue</Button>
                    <Button>关于react</Button>
                  </>
                }
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item=>(
                  <List.Item>
                    <div className='list-title'>
                      {/* <Link href={{pathname:'/detail',query:{id:item.id}}}> */}
                        <a> 文章标题</a>
                      {/* </Link> */}
                    </div>
                    <div className='list-icon'>
                      <Space><FieldTimeOutlined />2022-02-05</Space>
                      <Space><FileWordOutlined />文章</Space>
                      <Space><EyeOutlined />300</Space>
                    </div>
                    <div className='list-context'>{item.context}</div>
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
