package main

import (
	"fmt"
	"log"
	"runtime/debug"
	"time"

	"github.com/badoux/goscraper"
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

func get_site_info(url string) (string, string) {
	s, err := goscraper.Scrape(url, 5)
	if err != nil {
		log.SetPrefix("[Error]")
		log.Println(err)
		return "", ""
	}
	log.SetPrefix("[Info] ")
	log.Printf("Received Website Information Request, URL: %s, Title:%s, Icon:%s\n", url, s.Preview.Title, s.Preview.Icon)
	return s.Preview.Title, s.Preview.Icon
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
	app.GET("/icon", func(c *gin.Context) {
		// 获取请求path中的参数
		url := c.Query("url")
		title, icon := get_site_info(url)
		data := map[string]string{
			"url":   url,
			"title": title,
			"icon":  icon,
		}
		c.JSON(200, data)
	})
	app.NoRoute(func(c *gin.Context) {
		// 实现内部重定向
		c.HTML(404, "404.html", nil)
	})
	app.Use(errorHttp)
	app.Run(":80")
}
