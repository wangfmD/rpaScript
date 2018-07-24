package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/wangfmD/rpaScript/models"
	"github.com/satori/go.uuid"
	"net/http"
	"log"
)

//http -f POST  http://127.0.0.1:8002/script/add module=11 node=22 item=33 expect=44
func AddScript(c *gin.Context) {
	module := c.PostForm("module")
	node := c.PostForm("node")
	item := c.PostForm("item")
	expect := c.PostForm("expect")
	script := new(models.Script)
	id, _ := uuid.NewV4()
	script.Id = id.String()
	script.Module = module
	script.Node = node
	script.Item = item
	script.Expect = expect
	err := script.Add()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": "failed",
			"msg":    err,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"id":     id.String(),
			"msg":    "",
		})

	}
}

func UpdateScript(c *gin.Context) {
	result := c.PostForm("result")
	id := c.PostForm("id")
	script := new(models.Script)
	script.Id = id
	if ok, _ := script.Get(); !ok {
		c.JSON(http.StatusOK, gin.H{
			"status": "failed",
			"msg":    "script not exsit.",
		})
		return
	}
	script.Result = result
	log.Println("Result:", script.Result)
	log.Println("Expect:", script.Expect)
	if script.Result == script.Expect {
		script.ResultStr = "true"
	} else {
		script.ResultStr = "false"
	}
	err := script.Update()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": "failed",
			"msg":    err,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"id":     script.Id,
			"msg":    "",
		})

	}
}
