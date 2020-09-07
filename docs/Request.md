[TOC]

### 一、使用方法

#### 1. 发起单个请求

发起一个简单的 GET 请求，不考虑是否成功与失败。

```ts
RequestQueue.create(this).request(Request.get<T>("url"));
```

发起一个标准的 GET 请求，参数是 id=123，成功或失败的时候打印一条消息

```ts
RequestQueue.create(this)
    .request(Request.get<T>("url")
        .setData({id: "123"})
        .setSuccessListener((data: T) => Logger.log(TAG, "success"))
        .setFailListener((error: any) => Logger.log(TAG, "fail"))
    );
```

#### 2. 发起多个请求

方法一：由每个 Request 单独处理 `成功/失败` 回调。`【推荐】`

```ts
// 同时请求两个接口
RequestQueue.create(this)
    .addRequest(Request.get<T>("url-1")
        .setSuccessListener((data: T) => this.data1 = data))
    .addRequest(Request.get<T>("url-2")
        .setSuccessListener((data: T) => this.data2 = data))
    .setFailListener((error: any) => console.log("error"))
    .request() // 开始请求
```

方法二：统一由 RequestQueue 来处理 `成功/失败` 回调。

```ts
// 同时请求两个接口
RequestQueue.create(this)
    .addRequest(Request.get<T>("url-1"))
    .addRequest(Request.get<T>("url-2"))
    // 每个接口成功后都会执行一次 successListener 监听，可以通过判断 url 来区别不同的接口
    .setSuccessListener((data: any, result: ResponseEntity<any>) => {
        if (result.request.getUrl() === "url-1") {
            this.data1 = data as string;
        } else if (result.request.getUrl() === "url-1") {
            this.data2 = data as number;
        }
    })
    .setFailListener((error: any) => console.log("error"))
    // 开始请求
    .request()
```

#### 3. 发起有依赖的请求

发起一组需要指定顺序的接口

```ts
RequestQueue.create(this)
    // 并行执行下面的请求
    .addRequest(Request.get<T>("url"))
    .addRequest(Request.get<T>("url"))
    // 串行执行下面的请求
    .belowSerial()
    .addRequest(Request.get<T>("url"))
    .addRequest(Request.get<T>("url"))
    // 处理状态
    .setSuccessListener((data: any) => Logger.log(TAG, "success"))
    .setFailListener((error: any) => Logger.log(TAG, "fail"))
    .setCompleteListener(() => Logger.log(TAG, "complete"))
    .request();
```

发起一组有依赖顺序的接口

```ts
RequestQueue.create(this)
    // 并行执行下面的请求
    .belowSerial()
    .addRequest(
        // 执行第一个请求，拿到结果 id
        Request.get<string>("url")
            .setSuccessListener((data: string) => this.id = data))
    .addRequest(
        // 将获取的结果 id 赋值给第二个请求，setFrontListener 接收的是一个 Promise 对象
        Request.get<string>("url")
            .setFrontListener(async (request: Request<string>) => {
                request.getData()["id"] = this.id;
            }))
    .request();
```

### 二、API

#### 1. Request API

###### `static get<T>(url: string): Request<T>`
`静态` 创建一个 GET 请求
- url: 请求地址

###### `static post<T>(url: string): Request<T>`
`静态` 创建一个 POST 请求
- url: 请求地址

###### `static put<T>(url: string): Request<T>`
`静态` 创建一个 PUT 请求
- url: 请求地址

###### `static delete<T>(url: string): Request<T>`
`静态` 创建一个 DELETE 请求
- url: 请求地址

###### `static head<T>(url: string): Request<T>`
`静态` 创建一个 HEAD 请求
- url: 请求地址

###### `static options<T>(url: string): Request<T>`
`静态` 创建一个 OPTIONS 请求
- url: 请求地址

###### `static patch<T>(url: string): Request<T>`
`静态` 创建一个 PATCH 请求
- url: 请求地址

###### `setTag(tag: string): Request<T>`
创建一个标记，用来区分 Request

###### `setIgnore(isIgnore: () => boolean): Request<T>`
在 RequestQueue 执行到此 Request 时，是否忽略此 Request

setIgnore() 接受一个返回类型是 boolean 的 Function

- isIgnore: true 忽略，false 不忽略

###### `setRetry(retry: number): Request<T>`
重试次数，默认为 0

###### `setRequestConfig(requestConfig: RequestConfig): Request<T>`
无视，还未开发完

###### `setTask(task: Task<T>): Request<T>`
支持为每个 Request 设置单独的 Task，目前支持的 Task 有：

- TaskAxiosImpl: 基于 axios 实现
- TaskWxImpl: 基于小程序的 Request 实现
- TaskUniImpl: 基于 UniApp 的 Request 实现

如果想根据不同的平台实现不同的 Task，只需要实现 Task 接口，然后编写逻辑代码即可。

###### `setData(data: any): Request<T>`
Request 的请求参数，data 类型为 any，可以传递各种类型的对象

例如：
```ts
{
    id: 111,
    user: "username",
    array: [1, 2, 3, ...],
    sArray: [{id: 1}, {id: 2}, ...]
}

[1, 2, 3, ...]

[{id: 1}, {id: 2}, ...]
```

> 注意：data 如果为 Object 类型，这时 value 会有一些隐性规定
> - 如果 value 为 null 或 undefined 时，Task 会将指定的 key 从请求体中删除
> - 如果 value 为 ""，Task 不会处理

例如：
```ts
// 构建的参数
{
    id: 123,
    username: "",
    password: null
}
// Task 处理过后的数据
{
    id: 123,
    username: ""
}
```

###### `setMethod(method: RequestMethod): Request<T>`
设置 Request 的请求类型，通常情况下直接使用 Request.get... 相关方法即可，但在某些特殊的情况下，可以配合 setFrontListener() 来改变当前 Request 的请求类型

###### `setHeaders(headers: Array<Header>): Request<T>`
批量添加请求头

例如：
```ts
let headers: Array<Header> = new Array<Header>();
headers.push(new Header("key", "value"))
headers.push(new Header("key", "value"))
Request.get<string>("url").addHeader(headers)
```

> 注意：使用 setHeaders 时，会覆盖原有 Request 中的 headers

###### `addHeader(key: string, value: string): Request<T>`
添加一个请求头

###### `setFrontListener(listener: Promise<RequestFrontListener<T>>): Request<T>`
请求前置监听

setFrontListener 接受一个 Promise 对象，可以处理耗时任务，当处理耗时任务时，整个 RequestQueue 会停下来等待 front 的完成

例如：
```ts
Request.get<string>("url")
    // 假设 getWxCode 为异步函数，获取 code 需要 1 秒
    // 此时可以通过 front 函数，当 code 获取成功后再往下执行
    .setFrontListener(async (request: Request<string>) => {
        request.getData()["code"] = await this.getWxCode();
    }));
```

> 注意：此监听只在 TaskQueue 为 TaskQueueSerialImpl 时才会生效

###### `setSuccessListener(listener: RequestSuccessListener<T>): Request<T>`
请求成功监听

###### `setFailListener(listener: RequestFailListener<T>): Request<T>`
请求失败监听

###### `public setDownloadProgressListener(listener: RequestDownloadProgressListener): Request<T>`
文件下载进度监听

###### `setUploadProgressListener(listener: RequestUploadProgressListener): Request<T>`
文件上传进度监听

#### 2. RequestQueue API

###### `static create(context?: BaseVue): RequestQueue`
`静态` 创建一个 RequestQueue 队列

- context: 页面的上下文，每个页面必须继承自 BaseVue

###### `setShowLoading(isShowloading: boolean, loadingTarget: string): RequestQueue`
是否显示加载中动画

- isShowloading: true 开启、false 关闭【默认 false】
- loadingTarget: 在哪个 div 上面显示加载动画，不传默认是全屏，参数例子："#app-layout"

###### `setShowErrorMessage(isShowErrorMessage: boolean): RequestQueue`
是否显示服务器返回的错误信息

- isShowErrorMessage: true 开启、false 关闭【默认 true】

###### `addRequest<T>(request: Request<T>): RequestQueue`
将一个 Request 添加到队列中

###### `request<T>(request?: Request<T>): void`
执行请求队列

- request 如果不传参数，将直接执行队列
- request 如果传了参数，会创建一个队列并执行

> 注意：一旦使用了 addRequest() 方法，那 request() 的形参不能传

###### `belowSerial<T>(): RequestQueue`
添加一个串行队列

> 注意：在 belowSerial() 之后调用 addRequest()，请求会放入串行队列中

###### `belowParallel<T>(): RequestQueue`
添加一个并行队列

> 注意：在 belowParallel() 之后调用 addRequest()，请求会放入并行队列中

----------

> **belowSerial() 和 belowParallel() 注意事项：**
>
> 每个 RequestQueue 都有一个主队列，这个主队列是串行队列，每当调用一次 belowSerial()
> 或 belowParallel() 时，都会在主队列中创建一个子队列（串行队列或并行队列），当执行
> request() 方法时，RequestQueue 会依次遍历主队列中的子队列，只有当当前子队列中的任务
> 完成后，才会继续执行下一个子队列。

如果想实现特殊的队列，只需要实现 TaskQueue 接口，然后编写自己的队列逻辑即可。

----------

###### `setSuccessListener(listener: RequestSuccessListener<any>): RequestQueue`
Request 成功监听，每成功一个 Request，次方法都会被执行一次

###### `setFailListener(listener: RequestFailListener<any>): RequestQueue`
Request 失败监听，只要有一个 Request 失败，此方法就会被回调，同时会停止当前的 RequestQueue

###### `setCompleteListener(listener: RequestCompleteListener): RequestQueue`
当 RequestQueue 中的所有任务执行完成后，此方法会被回调

### 三、结构

```yaml
- interface: Task                               任务执行者
  - class: TaskAxiosImpl                        Axios 的具体实现
  - class: TaskWxImpl                           微信小程序 Request 的具体实现
- interface: TaskQueue                          队列模式
  - class: TaskQueueParallelImpl                并行模式具体实现
  - class: TaskQueueSerialImpl                  串行模式具体实现
- interface: RequestSuccessListener             成功回调
- interface: RequestFailListener                失败回调
- interface: RequestCompleteListener            完成回调
- interface: RequestUploadProgressListener      文件上传进度回调
- interface: RequestDownloadProgressListener    文件下载进度回调
- interface: RequestFrontListener               Request 前置回调
- class: RequestConfig                          配置文件
- class: DefaultRequestConfig                   默认配置文件
- class: Request                                请求体
- class: RequestQueue                           请求队列
```
