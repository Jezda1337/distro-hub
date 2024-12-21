package main

import (
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

func main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./view/assets/"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	tmpl := newTmpl()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		params := r.URL.Query()
		category := params.Get("category")

		if category == "" {
			tmpl.Render(w, "index", nil)
			return
		}

		if r.Header.Get("HX-Request") == "true" {
			tmpl.Render(w, category, nil)
		} else {
			tmpl.Render(w, "index", nil)
		}
	})

	http.ListenAndServe(":6969", mux)
}
