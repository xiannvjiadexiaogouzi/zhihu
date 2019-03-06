let proxyUrl = 'https://bird.ioliu.cn/v1?url=';
let baseApi = 'https://news-at.zhihu.com/api/4/';
let api = {
    newsLatest: 'news/latest',
    newsBefore: 'news/before/',
    storyExtra: 'story-extra/',
    story: 'story/',
    news: 'news/'
}
Reflect.ownKeys(api).forEach(key => {
    api[key] = proxyUrl + baseApi + api[key];
})
export default api