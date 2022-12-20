<h1 align='center'>
   <samp>Page Crash Monitor</samp>
</h1>
<p align = "center">
  <samp>A tool to Monitor Page Crashes. </samp>
</p>

崩溃复现: chrome://crash

方案设计: WebWorker -> ServiceWorker

前置要求：https -> http

前端服务: https://vitejs.dev/

后端服务: https://koajs.com/

数据结构设计

心跳数据:

{
type: 'hearbeat',
id: uuid,
data: {
url: 'xxx',
openDate: '',
}
}

sw pages:

{
id: {
lastReportDate: '',
data: {
url: 'http://localhost:5173/',
openDate: ''
}
}
}

## 问题

- 强制刷新丢失 controller 问题

- 更新 Service Worker

## 参考

使用 Service Worker: https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers#%E8%83%8C%E6%99%AF

Can you use a service worker with a self-signed certificate?: https://stackoverflow.com/questions/38728176/can-you-use-a-service-worker-with-a-self-signed-certificate

Options for testing service workers via HTTP: https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http

更新 Service Worker: https://juejin.cn/post/6844903792522035208#heading-12

强制刷新 controller 不存在: https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer/controller

navigator.serviceWorker.controller is null until page refresh: https://stackoverflow.com/questions/38168276/navigator-serviceworker-controller-is-null-until-page-refresh

Service Worker 是什么: https://segmentfault.com/a/1190000022103402

强制刷新 navigator.serviceWorker.controller 消失: https://stackoverflow.com/questions/51597231/register-service-worker-after-hard-refresh

Beforeunload 打点丢失原因分析及解决方案: https://github.com/zuopf769/notebook/blob/master/fe/%E5%89%8D%E7%AB%AF%E5%85%A8%EF%BC%88%E6%97%A0%EF%BC%89%E5%9F%8B%E7%82%B9%E4%B9%8B%E9%A1%B5%E9%9D%A2%E5%81%9C%E7%95%99%E6%97%B6%E9%95%BF%E7%BB%9F%E8%AE%A1/README.md

web worker: https://www.ruanyifeng.com/blog/2018/07/web-worker.html
