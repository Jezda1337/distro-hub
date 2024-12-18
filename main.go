package main

import (
	"html/template"
	"io"
	"net/http"
)

type Template struct {
	template *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}) error {
	return t.template.ExecuteTemplate(w, name, data)
}

func newTmpl() *Template {
	return &Template{
		template: template.Must(template.ParseGlob("views/*.html")),
	}
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		newTmpl().Render(w, "index", nil)
	})

	http.ListenAndServe(":6969", mux)
}
