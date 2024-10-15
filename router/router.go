package router

import (
	"go-server/handler"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func NewRoutes() chi.Router {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// allow everything
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

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
