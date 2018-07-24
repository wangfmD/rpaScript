package models

import (
	"testing"
	"log"
)

func init() {
	Init(false)
}

func TestScript(t *testing.T) {
	//
	//err := engine.Sync2(new(Script))
	//log.Println(err)
}

func TestScript_Add(t *testing.T) {
	//s := new(Script)
	//Id, _ := uuid.NewV4()
	//s.Id = Id.String()
	//s.Module = "外部接口模块"
	//s.Node = "http接口socket"
	//s.Item = "http接口socket"
	//s.Expect = "true"
	//s.Add()
}

func TestScript_Update(t *testing.T) {
	//s := new(Script)
	//s.Id="6436db70-879c-42e8-947f-eb2cc3ec39ec"
	//s.ResultStr="true"
	//s.Update()
}

func TestScript_Get(t *testing.T) {
	s := new(Script)
	s.Id="fe9cfee0-d800-4864-93e0-9b72ca5d15a8"
	if ok,err:=s.Get(); ok{
		log.Println("get")
		log.Println(s)
	}else {
		log.Println(err)
	}
}
