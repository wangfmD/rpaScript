package models

import (
	"log"
	"github.com/satori/go.uuid"
)

type Script struct {
	Id        string     `xorm:"id pk varchar(36)" json:"id"`
	Module    string
	Node      string
	Item      string
	Expect    string
	ResultStr string     `xorm:"result_str " json:"result_str"`
	Result    string
	CycleId   string     `xorm:"cycle_id varchar(36)" json:"cycleid"`
	StartTime FormatTime `xorm:"start_time created" json:"start_time"`
	EndTime   FormatTime `xorm:"end_time updated" json:"end_time"`
}

func (*Script) TableName() string {
	return "t_script"
}

func (this *Script) Add() error {
	id, _ := uuid.NewV4()
	this.Id = id.String()
	sucNum, err := engine.Insert(this)
	if err != nil {
		sucNum = 0
		log.Println("Error: add record to table Script failed: ", err)
		return err
	} else {
		log.Println("insert table Script succeed: ", sucNum)
		return nil
	}
}

// 更新单条记录
func (this *Script) Update() error {
	affected, err := engine.Id(this.Id).Update(this)
	if err != nil {
		log.Println("update table Script record: ", "Failed")
		return err
	} else {
		log.Println("update table Script record: ", affected)
		return nil
	}
}

func (this *Script) Get() (bool, error) {
	has, err := engine.Get(this)
	return has, err
}

func GetScripts(module string) []Script {
	Scripts := make([]Script, 0)
	err := engine.Where("module=?", module).Desc("end_time").Find(&Scripts)
	CheckErr(err)
	return Scripts
}

func CheckErr(err error) {
	if err != nil {
		log.Println(err)
	}
}
