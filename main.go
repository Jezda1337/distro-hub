package main

import (
	"fmt"
	"html/template"
	"io"
	"net/http"
)

type Templates struct {
	template *template.Template
}

func (t *Templates) Render(w io.Writer, name string, data interface{}) error {
	return t.template.ExecuteTemplate(w, name, data)
}

func newTmpl() *Templates {
	// parseGlob method cannot accept /**/*.html since 2015 fck shit
	t := template.Must(template.ParseGlob("view/*.html"))
	template.Must(t.ParseGlob("view/**/*.html"))
	//for _, tmpl := range t.Templates() {
	//	fmt.Println("Parsed template:", tmpl.Name())
	//}
	return &Templates{
		template: t,
	}
}

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

type IndexProps struct {
	Category string
	Distros []Distro
}

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./view/assets/"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	tmpl := newTmpl()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		params := r.URL.Query()
		category := params.Get("category")

		if category == "" {
			tmpl.Render(w, "index", IndexProps{
				Category: "trending",
				Distros: Distros,
			})
			return
		}

		if r.Header.Get("HX-Request") == "true" {
			tmpl.Render(w, category, IndexProps{
				Category: category,
				Distros: Distros,
			})
		} else {
			fmt.Println("else")
			tmpl.Render(w, "index", IndexProps{
				Category: category,
				Distros: Distros,
			})
		}
	})

	http.ListenAndServe(":6969", mux)
}
