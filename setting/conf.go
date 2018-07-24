package setting

import (
	"log"
	"os"
	"github.com/Unknwon/goconfig"
)

var (
	// orm
	DriverName string
	DataSource string
	MaxIdle    int
	MaxOpen    int
	DebugLog   bool
	Port       string // app
)

var GlobalConfPath = "/opt/gopath/src/github.com/wangfmD/rpaScript/conf/app.ini"

// 从配置文件中初始化，数据库的连接信息
func InitOrmSettings() {
	cfg, err := goconfig.LoadConfigFile(GlobalConfPath)
	if err != nil {
		log.Println("Fail to load configuration file: " + err.Error())
		os.Exit(2)
	}
	DriverName = cfg.MustValue("orm", "driver_name", "")
	DataSource = cfg.MustValue("orm", "data_source", "")
	MaxIdle = cfg.MustInt("orm", "max_idle_conn", 30)
	MaxOpen = cfg.MustInt("orm", "max_open_conn", 50)
	DebugLog = cfg.MustBool("orm", "debug_log", false)
}

func InitAppSettings() {
	cfg, err := goconfig.LoadConfigFile(GlobalConfPath)
	if err != nil {
		log.Println("Fail to load configuration file: " + err.Error())
		os.Exit(2)
	}
	Port = ":" + cfg.MustValue("app", "port", "8009")
}
