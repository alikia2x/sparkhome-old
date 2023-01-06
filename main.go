package main

import (
	"fmt"
	"log"
	"runtime/debug"
	"time"

	"github.com/gin-gonic/gin"
)

// errorHttp 统一500错误处理函数
func errorHttp(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			//打印错误堆栈信息
			log.Printf("panic: %v\n", r)
			debug.PrintStack()
			//封装通用json返回
			c.HTML(200, "500.html", gin.H{
				"title": "500",
			})
		}
	}()
	c.Next()
}

func main() {
	app := gin.Default()
	// 指明html加载文件目录
	app.LoadHTMLFiles("./html/index.html", "./doc/doc.html", "./html/500.html", "./html/404.html", "./html/about.html")
	//加载静态资源，第一个参数为路由，第二个为文件目录
	app.Static("/css", "./css")
	app.Static("/js", "./js")
	app.Static("/img", "./img")
	app.Static("/font", "./font")
	app.Static("/assets", "./doc/assets")
	app.Static("/doc", "./doc/")
	app.GET("/", func(context *gin.Context) {
		context.HTML(200, "index.html", nil)
	})
	app.GET("/doc", func(context *gin.Context) {
		context.HTML(200, "doc.html", nil)
	})
	app.GET("/index.html", func(context *gin.Context) {
		context.HTML(200, "index.html", nil)
	})
	app.GET("/time", func(context *gin.Context) {
		context.String(200, fmt.Sprint(time.Now().UnixMilli()))
	})
	app.GET("/ping", func(context *gin.Context) {
		context.String(200, "万叶，我的叶宝🤤")
	})
	app.GET("/about", func(context *gin.Context) {
		context.HTML(200, "about.html", nil)
	})
	app.NoRoute(func(c *gin.Context) {
		// 实现内部重定向
		c.HTML(404, "404.html", nil)
	})
	app.Use(errorHttp)
	app.Run(":80")
}
