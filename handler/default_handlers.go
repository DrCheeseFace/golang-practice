package handler

import (
	"encoding/json"
	"net/http"
)

func HandleWelcome(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(map[string]any{"result": "welcome"})
}
