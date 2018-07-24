package setting

import (
	"testing"
	"log"
)

func TestInitAppSettings(t *testing.T) {
	InitOrmSettings()
	log.Println(DriverName)
}