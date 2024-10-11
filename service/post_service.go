package service

import (
	"fmt"
	"go-server/database"
	"go-server/model"
)

type (
	PostService interface {
		GetPosts() ([]model.Post, error)
		GetPost(id int) (model.Post, error)
		AddPost(post model.Post) error
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

func (svc postSvc) AddPost(p model.Post) error {
	query := "INSERT INTO posts (Body) VALUES (:body)"
	_, err := database.Db.NamedExec(query, p)
	return err
}

func (svc postSvc) UpdatePost(id int, post model.Post) error {
	res, err := database.Db.NamedExec("UPDATE posts SET body=:body, lastupdated=:lastupdated WHERE id=:id", post)
    if err != nil {
        return err
    }
    if numRows, err := res.RowsAffected(); err != nil || numRows == 0 {
        fmt.Println(err)
		return err
	}
	return err 
}

func (svc postSvc) DeletePost(id int) error {
	res, err := database.Db.Exec("DELETE FROM posts WHERE Id=$1", id)
    if err != nil {
        return err
    }
	if numRows, err := res.RowsAffected(); err != nil || numRows == 0 {
		return err
	}
	return err 
}
