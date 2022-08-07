let ipUrl = 'http://127.0.0.1:7001/default/'  //前台地址

let servicePath = {
    getArticleList:ipUrl+'getArticleList',  //首页获取文章列表
    getArticleById:ipUrl+'getArticleById/',
    getTypeInfo:ipUrl+'getTypeInfo',         // 获取文章分类
    getArticleByTypeId:ipUrl+'getArticleByTypeId/'         // 获取类别名称获取不同的文章
}

export default servicePath