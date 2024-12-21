// package view
//
// import (
// 	"embed"
// 	"html/template"
// 	"io"
// )
//
// //go:embed *
// var files embed.FS
//
// var (
// 	_        = parse("**/*.html")
// 	index    = parse("pages/index.html")
// 	packages = parse("pages/packages.html")
// )
//
// func IndexPage(w io.Writer) {
// 	index.Execute(w, nil)
// }
//
// func PackagesPage(w io.Writer) {
// 	packages.Execute(w, nil)
// }
//
// func parse(file string, rest ...string) *template.Template {
// 	allFiles := append([]string{"layout.html"}, file)
// 	allFiles = append(allFiles, rest...)
// 	return template.Must(
// 		template.New("layout.html").ParseFS(files, allFiles...))
// }
