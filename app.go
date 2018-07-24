package main

import (
	"github.com/gin-gonic/gin"
	"github.com/wangfmD/rpaScript/controller"
	"github.com/wangfmD/rpaScript/models"
)



func main() {
	models.Init(false)

	r := gin.Default()
	r.POST("/script/add", controller.AddScript)
	r.POST("/script/update", controller.UpdateScript)
	r.Run(":8002")
}
