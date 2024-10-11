package model

import "time"

type Post struct {
	Id           int       `db:"id" json:"id"`
	Body         string    `db:"body" json:"body"`
	FirstCreated time.Time `db:"firstcreated" json:"first_created"`
	LastUpdated  time.Time `db:"lastupdated" json:"last_updated"`
}
