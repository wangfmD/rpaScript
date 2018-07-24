package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/wangfmD/rpaScript/models"
	"net/http"
	"log"
	"github.com/satori/go.uuid"
	"encoding/json"
	"strconv"
)

//http -f POST  http://127.0.0.1:8002/script/add module=11 node=22 item=33 expect=44
func AddScript(c *gin.Context) {
	module := c.PostForm("module")
	node := c.PostForm("node")
	item := c.PostForm("item")
	expect := c.PostForm("expect")
	script := new(models.Script)
	script.Module = module
	script.Node = node
	script.Item = item
	script.Expect = expect
	if ok, _ := script.Get(); ok {
		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"id":     script.Id,
			"msg":    "script exist",
		})
		return
	}
	report := new(models.Report)
	report.ScriptName = module

	if ok, _ := report.Get(); ok {
		script.CycleId = report.Id
	} else {
		id, err := report.Add()
		if err == nil {
			script.CycleId = id
		}
	}

	err := script.Add()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": "failed",
			"msg":    err,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": "success",
			"id":     script.Id,
			"msg":    "add",
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
			"msg":    "update",
		})

	}
}

func GetReport(c *gin.Context) {
	module := c.PostForm("module")
	scs := models.GetScripts(module)
	result := new(models.Result)
	id, _ := uuid.NewV4()
	result.RecordId = id.String()
	r := make(map[string]string)
	for s, sc := range scs {
		result.Result = sc.Result
		result.CycleId = sc.CycleId
		result.ScriptId = sc.Id
		id, _ := result.Add()
		r[strconv.Itoa(s)] = id
	}
	s, _ := json.Marshal(r)
	c.JSON(http.StatusOK, gin.H{
		"status":    "success",
		"record_id": id.String(),
		"msg":       string(s),
	})
}
