package main

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"io/ioutil"
	"net/http"
	"strconv"
	"sync"
	"time"
)

// init stuff for siming db
type Post struct {
	Id   int       `json:"id"`
	Body string    `json:"body"`
	Time time.Time `json:"time"`
}

var (
	posts   = make(map[int]Post)
	nextID  = 1
	postsMu sync.Mutex
)


func handleGetPosts(w http.ResponseWriter, r *http.Request) {
	postsMu.Lock()
	defer postsMu.Unlock()

	ps := make([]Post, 0, len(posts))
	for _, p := range posts {
		ps = append(ps, p)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ps)

}
func handleGetPost(w http.ResponseWriter, r *http.Request) {
	postsMu.Lock()
	defer postsMu.Unlock()
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		http.Error(w, "invalid post id", http.StatusBadRequest)
		return
	}

	p, ok := posts[id]
	if !ok {
		http.Error(w, "post not found stupid ass id", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}
func handlePostPost(w http.ResponseWriter, r *http.Request) {
	var p Post
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "error reading request body", http.StatusInternalServerError)
	}

	if err := json.Unmarshal(body, &p); err != nil {
		http.Error(w, "error parsing request body", http.StatusBadRequest)
	}
	postsMu.Lock()
	defer postsMu.Unlock()

	p.Id = nextID
	p.Time = time.Now()
	nextID++
	posts[p.Id] = p

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func handleDeletePost(w http.ResponseWriter, r *http.Request) {
	postsMu.Lock()
	defer postsMu.Unlock()

	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		http.Error(w, "invalid post id", http.StatusBadRequest)
		return
	}

	_, ok := posts[id]
	if !ok {
		http.Error(w, "post not found", http.StatusNotFound)
	}

	delete(posts, id)
	w.WriteHeader(http.StatusOK)

}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	r.Post("/posts", handlePostPost)
	r.Get("/posts/{id}", handleGetPost)
	r.Get("/posts", handleGetPosts)
	r.Delete("/posts/{id}", handleDeletePost)

	fmt.Println("listening on localhost:8008")
	http.ListenAndServe(":8080", r)

}
