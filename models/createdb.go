package models

import "log"

func New()  {
	Init(false)
	err:=engine.Sync2(new(Script),new(Report),new(Result))
	if err!=nil {
		log.Println("create db table failed!")
	}
}
