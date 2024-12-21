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
	for _, tmpl := range t.Templates() {
		fmt.Println("Parsed template:", tmpl.Name())
	}
	return &Templates{
		template: t,
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
