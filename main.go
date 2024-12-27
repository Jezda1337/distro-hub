package main

import (
	"fmt"
	"net/http"
	"strconv"

	"distro-hub/view"
)

type Distro struct {
	ID          int
	Name        string
	Description string
	Category    []string
}

var Distros = []Distro{
	{
		ID:          1,
		Name:        "Arch Linux",
		Description: "The best linux so far",
		Category: []string {"popular", "trending"},
	},
	{
		ID:          2,
		Name:        "Debian",
		Description: "The best linux so far",
		Category: []string {"new", "trending"},
	},
}

func filterDistros(category string) []Distro {
	if category == "" {
		return Distros
	}
	newDistros := []Distro{}

	for _, distro := range Distros {
		for _, cat := range distro.Category {
			if cat == category {
				newDistros = append(newDistros, distro)
				break
			}
		}
	}

	return newDistros
}

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./view/public/"))
	mux.Handle("GET /public/", http.StripPrefix("/public/", fs))

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		category := r.URL.Query().Get("category")

		filteredDistros := filterDistros(category)
		indexProps := map[string]any{
			"Category": category,
			"Distros":  filteredDistros,
		}

		if category != "" {
			if r.Header.Get("HX-Request") == "true" {
				err := view.ChildRender(w, "index", category, indexProps)
				if err != nil {
					fmt.Println(err)
				}
				return
			}
			err := view.Render(w, "index", indexProps)
			if err != nil {
				fmt.Println(err)
			}
			return
		}

		err := view.Render(w, "index", indexProps)
		if err != nil {
			fmt.Println(err)
		}
	})

	mux.HandleFunc("GET /packages", func(w http.ResponseWriter, r *http.Request) {
		view.Render(w, "packages", nil)
	})

	mux.HandleFunc("GET /distros/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		ID, err := strconv.Atoi(id)
		if err != nil {
			http.Error(w, "Invalid ID format", http.StatusBadRequest)
			return
		}

		if ID < 0 || ID > len(Distros) {
			http.Error(w, "Distro not found", http.StatusNotFound)
			return
		}
		var distro Distro
		for i := 0; i < len(Distros); i++ {
			if Distros[i].ID == ID {
				distro = Distros[i]
			}
		}

		view.Render(w, "distro", map[string]any{
			"Distro": distro,
		})
	})

	http.ListenAndServe(":6969", mux)
}
