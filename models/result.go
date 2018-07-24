package models

import (
	"log"
	"github.com/satori/go.uuid"
)

type Result struct {
	Id       string `json:"id" xorm:"pk varchar(36)"`
	CycleId  string `xorm:"cycle_id varchar(36)" json:"cycle_id"`
	ScriptId string `xorm:"script_id varchar(36)" json:"script_id"`
	RecordId string `xorm:"record_id pk varchar(36)" json:"record_id"`
	Result   string
}

func (*Result) TableName() string {
	return "t_result"
}

func (this *Result) Add() (string, error) {
	id, _ := uuid.NewV4()
	this.Id = id.String()
	sucNum, err := engine.Insert(this)
	if err != nil {
		sucNum = 0
		log.Println("Error: add record to table Script failed: ", err)
		return this.Id, err
	} else {
		log.Println("insert table Script succeed: ", sucNum)
		return this.Id, nil
	}
}
