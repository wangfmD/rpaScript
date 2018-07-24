package models

import (
	"log"
	"github.com/satori/go.uuid"
)

type Report struct {
	Id         string     `xorm:"id pk varchar(36)" json:"id"`
	ScriptName string     `xorm:"script_name " json:"script_name"`
	UpdateTime FormatTime `xorm:"update_time created" json:"update_time"`
}

func (this *Report) Get() (bool, error) {
	has, err := engine.Get(this)
	return has, err
}

func (this *Report) Add() (string,error) {
	id,_:=uuid.NewV4()
	this.Id = id.String()
	sucNum, err := engine.Insert(this)
	if err != nil {
		sucNum = 0
		log.Print("Error: add record to table %s failed: %s\n", this.TableName(), err)
		return id.String(),err
	} else {
		log.Print("insert table %s succeed: %s\n", this.TableName(), sucNum)
		return id.String(), nil
	}
}

func (*Report) TableName() string {
	return "t_report"
}
