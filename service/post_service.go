package service

import (
	"database/sql"
	"go-server/database"
	"go-server/model"
)

type (
	PostService interface {
		GetPosts() ([]model.Post, error)
		GetPost(id int) (model.Post, error)
		AddPost(post model.Post) (int, error)
		UpdatePost(id int, post model.Post) error
		DeletePost(id int) error
	}
	postSvc struct {
	}
)

func NewPostService() PostService {
	return postSvc{}
}

func (svc postSvc) GetPosts() ([]model.Post, error) {
	var rows []model.Post
	err := database.Db.Select(&rows, "SELECT * FROM posts")
	return rows, err
}

func (svc postSvc) GetPost(id int) (model.Post, error) {
	post := model.Post{}
	err := database.Db.Get(&post, "SELECT * FROM posts WHERE id=$1", id)
	return post, err
}

func (svc postSvc) AddPost(p model.Post) (int, error) {
	query := "INSERT INTO posts (body) VALUES ($1) RETURNING id"
	lastInsertId := 0
	var err = database.Db.QueryRow(query, p.Body).Scan(&lastInsertId)
	if err != nil {
		return 0, err
	}

	return int(lastInsertId), nil
}

func (svc postSvc) UpdatePost(id int, post model.Post) error {
	res, err := database.Db.NamedExec("UPDATE posts SET body=:body, lastupdated=CURRENT_TIMESTAMP WHERE id=:id", post)
	if err != nil {
		return err
	}
	var numRows int64
	numRows, err = res.RowsAffected()
	if numRows == 0 {
		return sql.ErrNoRows
	}
	return err
}

func (svc postSvc) DeletePost(id int) error {
	res, err := database.Db.Exec("DELETE FROM posts WHERE id=$1", id)
	if err != nil {
		return err
	}
	var numRows int64
	numRows, err = res.RowsAffected()
	if numRows == 0 {
		return sql.ErrNoRows
	}
	return err
}
