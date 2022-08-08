- ##### 说明：

- 博客前台使用的是next.js，它是一个轻量级的React服务端渲染框架，其官网地址:[next](https://nextjs.frontendx.cn/)

- next.js是一个轻量级的React服务端渲染框架，在pages文件中的文件自成路由，无需额外配置

- 渲染文章主要使用的marked解析markdown，然后使用highlight.js去实现代码块的高亮效果

- 本说明文档主要记录本次博客搭建的过程和遇到的难点

### 文件结构

> **components**    一些公共组件
>
> > Author    主体内容右边的作者介绍
> >
> > Footer     博客底部
> >
> > Header    博客头部组件
> >
> > darklight.js    黑夜模式切换组件
> >
> > tocify.js          生成文章中的锚点连接文件

> **config**             在这个文件中配置请求的url
>
> > apiUrl.js      接口请求路径的统一管理，方便维护

> **pages**              页面级组件
>
> > detail            博客的详细内容
> >
> > list                分类的所有博客，如vue相关的所有博客
> >
> > _app.js         入口文件
> >
> > index.js         博客首页 

> **public**              公共文件夹，里面存放公共静态资源    

> **styles**               组件样式和页面的样式
>
> > components      组件的样式
> >
> > pages                页面级组件的样式

### 1.使用useEffect解决useState 的异步问题





