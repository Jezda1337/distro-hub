package view

import (
	"embed"
	"html/template"
	"io"
)

//go:embed *
var templateFS embed.FS

var shared = template.Must(template.ParseFS(templateFS, "shared/*"))
var tmpls = map[string]*template.Template{
	"index":    parse("pages/index.tmpl"),
	"packages": parse("pages/packages.tmpl"),
	"distro":   parse("pages/distro.tmpl"),
}

func parse(file string) *template.Template {
	var clone = template.Must(shared.Clone())

	tmpl, _ := clone.ParseFS(templateFS, file)
	// for _, t := range tmpl.Templates() {
	// 	fmt.Println("Parsed template:", t.Name())
	// }
	return tmpl
}

func Render(w io.Writer, page string, data interface{}) error {
	return tmpls[page].Execute(w, data)
}

func ChildRender(w io.Writer, page, child string, data interface{}) error {
	return tmpls[page].ExecuteTemplate(w, child, data)
}
