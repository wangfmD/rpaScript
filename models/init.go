package models

import (
	"errors"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/core"
	"github.com/go-xorm/xorm"
	"github.com/wangfmD/rpaScript/setting"
	"time"
)

var (
	ErrNotExist = errors.New("not exist")
)

type FormatTime time.Time

// Marshal time format
func (self FormatTime) MarshalJSON() ([]byte, error) {
	t := time.Time(self)
	if y := t.Year(); y < 0 || y >= 10000 {
		if y < 2000 {
			return []byte(`"2000-01-01 00:00:00"`), nil
		}
		return nil, errors.New("Time.MarshalJSON: year outside of range [0,9999]")
	}
	return []byte(t.Format(`"2006-01-02 15:04:05"`)), nil
}

func (self FormatTime) String() string {
	t := time.Time(self)
	if y := t.Year(); y < 0 || y >= 10000 {
		if y < 2000 {
			return string([]byte(`2000-01-01 00:00:00`))
		}
	}
	return string([]byte(t.Format(`2006-01-02 15:04:05`)))
}

var engine *xorm.Engine

// 初始化数据库,全都使用
func Init(isProMode bool) {
	time.LoadLocation("Asia/Shanghai")
	var err error
	setting.InitOrmSettings()
	setting.InitAppSettings()
	engine, err = xorm.NewEngine(setting.DriverName, setting.DataSource)
	if err != nil {
		panic(err)
	}
	// engine.TZLocation, _ = time.LoadLocation("Asia/Shanghai")
	engine.DatabaseTZ = time.Local
	engine.TZLocation = time.Local
	engine.SetMaxIdleConns(setting.MaxIdle)
	engine.SetMaxOpenConns(setting.MaxOpen)
	if !isProMode {
		engine.ShowSQL(true)
	}
	if setting.DebugLog {
		engine.Logger().SetLevel(core.LOG_DEBUG)
	} else {
		engine.Logger().SetLevel(core.LOG_INFO)
	}

	//err = orm.Sync2(new(Setting), new(Category), new(Post), new(Image),
	//	new(User), new(FavoritePost), new(Follow), new(Topic), new(FollowTopic),
	//	new(Page), new(Notification), new(Comment), new(Bulletin))
	//if err != nil {
	//	panic(err)
	//}

	//social.SetORM(orm)
}
