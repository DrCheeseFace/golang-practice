package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// init stuff for siming db
type Post struct {
	Id           int       `db:"id" json:"id"`
	Body         string    `db:"body" json:"body"`
	FirstCreated time.Time `db:"firstcreated" json:"firstcreated"`
	LastUpdated  time.Time `db:"lastupdated" json:"lastupdated"`
}

var (
	posts   = make(map[int]Post)
	nextID  = 1
	postsMu sync.Mutex
)
var schema = `
CREATE TABLE IF NOT EXISTS posts (
    Id SERIAL PRIMARY KEY, 
    Body TEXT NOT NULL,
    FirstCreated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    LastUpdated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`
var db *sqlx.DB

func handleGetPosts(w http.ResponseWriter, r *http.Request) {
	rows := []Post{}
	db.Select(&rows, "SELECT * FROM posts")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rows)

}
func handleGetPost(w http.ResponseWriter, r *http.Request) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid post id"))
		return
	}

	rows := []Post{}
	db.Select(&rows, "SELECT * FROM posts WHERE id=$1", id)
	if len(rows) != 1 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("post not found stupid ass id"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rows)
}
func handlePostPost(w http.ResponseWriter, r *http.Request) {
	var p Post
	body, _ := io.ReadAll(r.Body)
	if err := json.Unmarshal(body, &p); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("error parsing request body"))
		return

	}
	if len(p.Body) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("empty body"))
		return
	}
	p.FirstCreated = time.Now()
	p.LastUpdated = time.Now()

	query := "INSERT INTO posts (Body, FirstCreated, LastUpdated) VALUES (:body, :firstcreated, :lastupdated)"
	_, err := db.NamedExec(query, p)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something wrong with adding post to post table"))
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func handleDeletePost(w http.ResponseWriter, r *http.Request) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid post id"))
		return
	}

	post := Post{}
	err = db.Get(&post, "SELECT FROM posts WHERE id=$1", id)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("post not found"))
		return
	}

	_, err = db.Exec("DELETE FROM posts WHERE id=$1", id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong with deleting post"))
	}
	w.WriteHeader(http.StatusOK)
}

func handlePutPost(w http.ResponseWriter, r *http.Request) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid post id"))
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error reading request body"))
		return
	}

	post := Post{}
	err = db.Get(&post, "SELECT FROM posts WHERE id=$1", id)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("post not found"))
		return
	}
	if err := json.Unmarshal(body, &post); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(err)
		w.Write([]byte("error parsing request body"))
		return
	}
	post.LastUpdated = time.Now()

    db.NamedExec("UPDATE posts SET body=:body, lastupdated=:lastupdated WHERE :id=:id", post)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

func dbinit() {
	var err error
	db, err = sqlx.Connect("postgres", "user=postgres dbname=postgres sslmode=disable password=pass")
	if err != nil {
		log.Fatalln(err)
	}
	db.MustExec(schema)
	// tx := db.MustBegin()
	// tx.MustExec("INSERT INTO posts ( Body, FirstCreated, LastUpdated) VALUES ($1, $2, $3)", "first entry body", time.Now(), time.Now())
	// tx.MustExec("INSERT INTO posts ( Body, FirstCreated, LastUpdated) VALUES ($1, $2, $3)", "second entry body", time.Now(), time.Now())
	// tx.MustExec("INSERT INTO posts ( Body, FirstCreated, LastUpdated) VALUES ($1, $2, $3)", "third entry body", time.Now(), time.Now())
	// tx.Commit()

}

func main() {

	dbinit()
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("welcome")) })
	r.Post("/posts", handlePostPost)
	r.Put("/posts/{id}", handlePutPost)
	r.Get("/posts/{id}", handleGetPost)
	r.Get("/posts", handleGetPosts)
	r.Delete("/posts/{id}", handleDeletePost)

	fmt.Println("listening on localhost:8080")
	http.ListenAndServe(":8080", r)

}
