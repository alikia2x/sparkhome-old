# SparkHome - 星火主页

## Intro - 简介

这是一个开源的浏览器主页，旨在让您的更多事情只需要一个网页，甚至一个搜索框内就可以完成。

>This is an open-source browser homepage designed to allow you to do more with just a web page, or even a search box.

## Run - 运行

### Preparation - 准备工作

如果想在自己的服务器上部署星火主页，您需要准备:

- Go 1.19环境
- Apache或Nginx服务器

>To run SparkHome on your server, you need:
>
>- Go 1.19
>- Apache/Nginx server

### Build And Run - 编译运行

连接到您已经部署好环境的服务器，运行`go build .`进行编译。编译完成后，运行编译的二进制文件(`backend`)，您将看到类似下方的输出:

```log
2023-01-23T23:28:28.424+0800    INFO    Started. Try to listening 127.0.0.1:9500
```

这意味着应用正尝试监听本地端口9500.

允许的IP和绑定的端口可以在`config.json`，它们对应的键分别为`addr`和`port`，默认值分别为`127.0.0.1`和`9500`.

至此，星火主页已经在本地端口9500上开放。接下来，您需要修改Apache或Nginx配置，设置反向代理，使您的服务能在互联网上公开访问。

>After preparing the environment, connect to your server and run `go build .` to compile. Once compiled, run the compiled binary (`backend`), and you will see output like this:
>
>``` log
>2023-01-23T23:28:28.424+0800 INFO Started. Try to listen 127.0.0.1:9500
>```
>
>This means the application is trying to listen on 127.0.0.1:9500.
>
>Allowed IP and listening port can be found in `config.json`, their keys are `addr` and `port`, and the default values are `127.0.0.1` and `9500`.
>
>Now, SparkHome has been opened on 127.0.0.1:9500. Next, you need to modify your Apache or Nginx configuration to set up a reverse proxy to make your service accessible on the Internet.

### Donate Us - 捐助

本项目的官方站点位于[sparkhome.site](https://sparkhome.site)，此站点的运营与维护需要您的帮助！

您可以通过支付宝或微信捐助我们，让我们有动力继续开发，并运营维护官方站点！

>The official site of this project is at [sparkhome.site](https://sparkhome.site), our site needs your donation!
>
>You can donate through Alipay or WeChat Pay.

**支付宝(Alipay)**
![支付宝付款码](/img/alipay.png)

**微信(WeChat Pay)**
![微信付款码](/img/wechatpay.png)
