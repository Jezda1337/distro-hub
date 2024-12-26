package main

import (
	"fmt"
	"net/http"

	"distro-hub/view"
)

type Distro struct {
	ID          int
	Name 				string
	Description string
}

var Distros = []Distro {
	{
		ID: 1,
		Name: "Arch Linux",
		Description: "The best linux so far",
	},
	{
		ID: 2,
		Name: "Debian",
		Description: "The best linux so far",
	},
}

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./view/assets/"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		category := r.URL.Query().Get("category")

		if category != "" {
			if r.Header.Get("HX-Request") == "true" {
				err := view.ChildRender(w, "index", category, map[string]any{
					"Category": category,
					"Distros":  Distros,
				})
				if err != nil {
					fmt.Println(err)
				}
				return
			}
			err := view.Render(w, "index", map[string]any{
				"Category": category,
				"Distros":  Distros,
			})
			if err != nil {
				fmt.Println(err)
			}
			return
		}

		err := view.Render(w, "index", map[string]any{
			"Category": "trending",
			"Distros": Distros,
		})

		if err != nil {
			fmt.Println(err)
		}
	})

	mux.HandleFunc("GET /packages", func(w http.ResponseWriter, r *http.Request) {
		view.Render(w, "packages", nil)
	})

	http.ListenAndServe(":6969", mux)
}
