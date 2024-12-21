package main

import (
	"embed"
	"fmt"
	"html/template"
	"io"
	"net/http"
)

//go:embed view/**/*.html
var templatesFS embed.FS

type Templates struct {
	template *template.Template
}

func (t *Templates) Render(w io.Writer, name string, data interface{}) error {
	return t.template.ExecuteTemplate(w, name, data)
}

func newTmpl() *Templates {
	t := template.Must(template.ParseGlob("view/**/*.html"))
	for _, tmpl := range t.Templates() {
		fmt.Println("Parsed template:", tmpl.Name())
	}

	// return &Templates
	// 	template: template.Must(template.ParseFS(templatesFS, "view/**/*.html")),
	// }

	return &Templates {
		template: template.Must(template.ParseGlob("view/**/*.html")),
	}
}

func main() {
	mux := http.NewServeMux()

	// Serve assets
	fs := http.FileServer(http.Dir("./view/assets/"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// Initialize templates
	tmpl := newTmpl()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		err := tmpl.Render(w, "index", nil)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "Failed to render template", http.StatusInternalServerError)
		}
	})

	http.ListenAndServe(":6969", mux)
}
