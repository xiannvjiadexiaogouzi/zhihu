# zhihu-vue-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

api
https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90

组件中的data更新:
    - created中axios获取数据并绑定到this.data
    - updated中才可以获取this.data的数据
    - updated会随着v-if/show的变化而变化
    *可以watch data来触发事件

Slide中loop循环还没有反应, 解决方案:
--放弃mounted绑定swiper初始化
--在axios的get后面增加:
Vue.nextTick(()=>{
    init Swiper(); //初始化swiper
});
参考：https://blog.csdn.net/weixin_38304202/article/details/78282826
https://blog.csdn.net/dclnet/article/details/80951884
http://www.cnblogs.com/toggle/p/9618331.html
- swiper的点击事件
貌似不用看swiper插件文档的事件绑定就可以直接绑定了


组件之间的数据共享:
--简单应用可以用store模式;
--用vuex来实现:
实例化vue的时候引入store组件 -- 在main.js中引入;

组件之间通讯思路:
ArticleList-@click -> (id) -> store -> Article根据现有id刷新相应页面
--
@click -> (id):
router来实现:
--实例化vue的时候引入router组件 -- 在main.js中引入;
--@click里使用this.$router.push({path}):
    path - {name,param{id}}
    router.js配置 - 对应path: '.../:id' 添加:作为参数id

articleMenu的下一页思路:
menu: btn @click commit -> store中的nowid=nextid -> router push article nowid -> watch: route -> methods: reload -> 传递父组件article执行reloadarticle, menu自身也执行reload


comments页面中的点赞以及回复功能未添加
comments主要是css, 接受数据v-for出来就好了
longcomments和shortcomments的样式差不多, 最好合并成一张css引入

- 评论组件中的回复展开按钮需要独立, 否则会所有一起改变:
    将评论回复注册为单独组件进行复用

comments的结构:
comments--longcomments-showreply
        --shortcomments-showreply


- articlelist中的加载更多文章思路:
--判断合适下拉到底端 -> 变更日期 -> 根据日期加载数据
- 判断下拉底端:
    - vue-scroller不支持pc, 只可以移动端按住滑动
    - 原生监听scroll事件: 
    --mounted里面window.onscroll; destroyed里面使之=null解绑
    --判断滚动到底端: 
        --body的scrolltop + winodw的innerheight >= body的offsetheight
        * scrolltop取值: document.body.scrollTop || document.documentElement.scrollTop
- 更改li中的结构, 添加日期栏:
--为了能够将日期和文章列表共同循环更改储存数据结构, 将date和stories分别作为obj放入this.stories
- loadmore
    - 变更日期:
    --data里创建date用来记录日期, 每axios一次date-1
    - 到上个月最后一天的时候循环不对了, 调整月和日


- 各组件和页面之间的切换顺滑动画需要添加
--通过在router中给各页面增添meta-index的值, 监听$route的值来改变router-view外面的transition name
参考: https://blog.csdn.net/qq_33236453/article/details/79110485
- 切换页面之间有跳转空白页, 如何取消消除?
解决: https://segmentfault.com/q/1010000009140297
--不要加mode




待完成:
- 加载中的图标
- nextarticle点击后下一篇文章的滚轮位置没有改变, 应该要重置回文章顶部; 
- 切换路由后滚动条保持原来该路由的位置
* vuerouter的scrollbehaviors没办法和vue中的transition共用
https://chuchur.com/article/vue-router-white-screen
https://www.cnblogs.com/hcxy/p/7426581.html
https://www.cnblogs.com/kdcg/p/9376737.html
https://segmentfault.com/q/1010000008343428
https://segmentfault.com/q/1010000007443543
- mint ui ?
- 实现article当前页面刷新保留当前的id号进行刷新, 否则得退回主页再重新进去 ?

- v-lazy ?
https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
https://segmentfault.com/q/1010000011823965/a-1020000011826044
https://www.cnblogs.com/lijuntao/p/7777581.html
https://segmentfault.com/a/1190000015904599

