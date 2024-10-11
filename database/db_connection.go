package database

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"go-server/configuration"
)

var (
	Db     *sqlx.DB
	schema = `
		CREATE TABLE IF NOT EXISTS posts (
    		Id SERIAL PRIMARY KEY, 
    		Body TEXT NOT NULL,
    		FirstCreated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    		LastUpdated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)`
)

func Init() {
	var err error
	cfg := configuration.State.DbConfig
	connectionString := fmt.Sprintf("user=%s dbname=%s sslmode=disable password=%s", cfg.UserName, cfg.Name, cfg.Password)
	Db, err = sqlx.Connect("postgres", connectionString)
	if err != nil {
		panic(err)
	}
	err = Db.Ping()
	if err != nil {
		panic(err)
	}
	Db.MustExec(schema)
}
