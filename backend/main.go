package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"

	bingimage "github.com/JulianDan/BingWallpaper-Go"
	"github.com/badoux/goscraper"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var log *zap.Logger

// errorHttp 统一500错误处理函数
func errorHttp(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			//打印错误堆栈信息
			log.Error(fmt.Sprintf("%v", r))
			//封装通用json返回
			c.HTML(200, "500.html", gin.H{
				"title": "500",
			})
		}
	}()
	c.Next()
}

func getSiteInfo(url string) (string, string) {
	s, err := goscraper.Scrape(url, 5)
	if err != nil {
		log.Error(fmt.Sprint(err))
		return "", ""
	}
	log.Info("Received Website Information Request, URL: " + url + ", Title:" + s.Preview.Title + ", Icon:" + s.Preview.Icon)
	return s.Preview.Title, s.Preview.Icon
}

func getEncoder() zapcore.Encoder {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	return zapcore.NewConsoleEncoder(encoderConfig)
}

func getLogWriter() zapcore.WriteSyncer {
	ProgramLogFile, _ := os.Create("./program.log")
	return zapcore.AddSync(ProgramLogFile)
}

func main() {
	bingImage, err := bingimage.GetBingImage()
	if err != nil {
		// 处理错误
	}
	fmt.Print(bingImage.URL)

	config := make(map[string]string)
	_, ConfigExistErr := os.Stat("./config.json")
	if ConfigExistErr == nil {
		//存在则读取文件
		file_data, ConfigReadErr := os.ReadFile("./config.json")
		if ConfigReadErr != nil {
			panic("Can't load user data.")
		}
		ConfigParseErr := json.Unmarshal(file_data, &config)
		if ConfigParseErr != nil {
			panic("Can't parse user data.")
		}
	}

	writeSyncer := getLogWriter()
	encoder := getEncoder()
	core := zapcore.NewCore(encoder, zapcore.NewMultiWriteSyncer(writeSyncer, zapcore.AddSync(os.Stdout)), zapcore.DebugLevel)
	log = zap.New(core)

	gin.SetMode(gin.ReleaseMode)
	GinLogFile, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(GinLogFile, os.Stdout)

	app := gin.Default()
	app.SetTrustedProxies(nil)

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
		title, icon := getSiteInfo(url)
		data := map[string]string{
			"url":   url,
			"title": title,
			"icon":  icon,
		}
		c.JSON(200, data)
	})
	app.GET("/bing", func(context *gin.Context) {
		context.HTML(200, "about.html", nil)
	})
	app.NoRoute(func(c *gin.Context) {
		// 实现内部重定向
		c.HTML(404, "404.html", nil)
	})
	app.Use(errorHttp)
	log.Info("Started. Try to listening " + config["addr"] + ":" + config["port"])
	AppErr := app.Run(config["addr"] + ":" + config["port"])
	if AppErr != nil {
		log.Error("App start error: " + AppErr.Error())
	}
}
