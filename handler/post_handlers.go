package handler

import (
	"encoding/json"
	"go-server/model"
	"go-server/service"
	"io"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type (
	PostHandler interface {
		HandleGetPosts(w http.ResponseWriter, r *http.Request)
		HandleGetPost(w http.ResponseWriter, r *http.Request)
		CreatePostHandler(w http.ResponseWriter, r *http.Request)
		HandleDeletePost(w http.ResponseWriter, r *http.Request)
		HandlePutPost(w http.ResponseWriter, r *http.Request)
	}

	postHandler struct {
		postSvc service.PostService
	}
)

func NewPostHandler() PostHandler {
	return postHandler{postSvc: service.NewPostService()}
}

func (h postHandler) HandleGetPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := h.postSvc.GetPosts()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		render.JSON(w, r, render.M{"error": err})
		return
	}
	render.JSON(w, r, render.M{"posts": posts, "error": err})
}

func (h postHandler) HandleGetPost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		render.JSON(w, r, render.M{"error": err})
		return
	}

	post, err := h.postSvc.GetPost(id)
	render.JSON(w, r, render.M{"post": post, "error": err})
}

func (h postHandler) CreatePostHandler(w http.ResponseWriter, r *http.Request) {
	var p model.Post
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
	id, err := h.postSvc.AddPost(p)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("failed to add a post"))
		return
	}

    p, err = h.postSvc.GetPost(int(id))
    if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("failed to retreive added post"))
		return
    }

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func (h postHandler) HandleDeletePost(w http.ResponseWriter, r *http.Request) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid post id"))
		return
	}
	err = h.postSvc.DeletePost(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("failed to delete post"))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h postHandler) HandlePutPost(w http.ResponseWriter, r *http.Request) {
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
	var postToUpdate model.Post
	if err := json.Unmarshal(body, &postToUpdate); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("error parsing request body"))
		return
	}
	postToUpdate.Id = id
	err = h.postSvc.UpdatePost(id, postToUpdate)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("failed to update post"))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	var updatedPost model.Post
	updatedPost, err = h.postSvc.GetPost(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("failed to retrieve updated post"))
		return
	}
	json.NewEncoder(w).Encode(updatedPost)
}
