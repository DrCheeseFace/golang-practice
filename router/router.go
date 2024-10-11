package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"go-server/handler"
)

func NewRoutes() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	postHandler := handler.NewPostHandler()
	r.Get("/", handler.HandleWelcome)
	r.Route("/posts", func(r chi.Router) {
		r.Post("/", postHandler.CreatePostHandler)
		r.Put("/{id}", postHandler.HandlePutPost)
		r.Get("/{id}", postHandler.HandleGetPost)
		r.Get("/", postHandler.HandleGetPosts)
		r.Delete("/{id}", postHandler.HandleDeletePost)
	})
	return r
}
