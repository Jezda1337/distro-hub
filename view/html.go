package view

import (
	"embed"
	"html/template"
	"io"
)

//go:embed *.tmpl pages/*.tmpl components/*.tmpl
var files embed.FS

var tmpls = map[string]*template.Template {
	"index": parse("pages/index.tmpl"),
	"packages": parse("pages/packages.tmpl"),
}

func parse(file string) *template.Template {
	tmpl := template.Must(template.ParseFS(files, "base.tmpl", file, "components/*.tmpl"))
	//for _, t := range tmpl.Templates() {
	//	fmt.Println("Parsed template:", t.Name())
	//}
	return tmpl
}

func Render(w io.Writer, page string, data interface{}) error {
	return tmpls[page].Execute(w, data)
}

func ChildRender(w io.Writer, page, child string, data interface{}) error {
	return tmpls[page].ExecuteTemplate(w, child, data)
}
