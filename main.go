package main

import (
	"fmt"

	"go-server/database"
	"go-server/router"
	"net/http"
)

func main() {
    database.Init()
    var router = router.NewRoutes()
	fmt.Println("listening on localhost:8080")
	err := http.ListenAndServe(":8080", router)
	fmt.Println(err)
}
