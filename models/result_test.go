package models

import "testing"

func TestResult_Add(t *testing.T) {
	r:=new(Result)
	r.CycleId="1111"
	r.RecordId="dddd"
	r.Add()
}