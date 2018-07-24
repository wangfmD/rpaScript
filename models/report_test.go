package models

import (
	"testing"
	"log"
)

func init()  {
	Init(false)
}

func TestReport_Get(t *testing.T) {
	r:=new(Report)
	r.ScriptName="aa"
	if ok,_:=r.Get();ok{
		log.Println(r.Id)
	}
}