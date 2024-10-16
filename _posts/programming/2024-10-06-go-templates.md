---
layout: post
title: Текстовые шаблоны в Go
author: Alexey Nurgaliev
section: programming
language: Go
---

Для шаблонов генерации текста есть два пакета: `text/template` и `html/template`. У них одинаковый интерфейс, разница только в том, что последний дополнительно экранирует подстановки для вставки в html-документ (чтобы избежать XSS-инъекций).

+ [https://pkg.go.dev/text/template](https://pkg.go.dev/text/template)
+ [https://pkg.go.dev/html/templat](https://pkg.go.dev/html/template)

У каждого шаблона есть имя. Инициализировать шаблоны можно разными способами:

+ `template.New("name")` - пустой шаблон с данным именем
+ `template.ParseFiles(fileNames...)` - шаблон из списка файлов. Имя шаблона, созданного из соответствующего файла - имя файла (если есть файлы с одинаковыми именами, добавляется последний)
+ `template.ParseGlob("pattern")` - шаблон из файлов, найденных по шаблону пути, работает аналогично `ParseFiles`. Есть ограничение - поиск не рекурсивный, т.е. будут найдены только файлы, соответствующие маске, в одном каталоге. Для рекурсивного поиска файлов можно воспользоваться [filepath.WalkDir](https://pkg.go.dev/path/filepath@go1.23.2#WalkDir), чтобы собрать все соответствующие шаблону файлы и затем передать их в `template.ParseFiles`.

Выполнить шаблон можно при помощи `Execute` или `ExecuteTemplate`. Первый метод выполняет шаблон по умолчанию, второй - ищет нужный по имени. Результат выводится в io.Writer.

Шаблоны вычисляются относительно полей некоторой структуры (или ассоциативного массива). `.` - точка - текущее значение этой структуры (или массива) внутри шаблона.

Удалить пробелы слева или справа от подстановки: добавить `-` к скобкам:

{% raw %}
```html
{{- x }} удалить пробелы слева
{{ x -}} удалить пробелы справа
{{- x -}} удалить пробелы слева и справа
```
{% endraw %}

Стандартные действия:

{% raw %}
```html
{{/* комментарий */}}

{{ x }} - подстановка значения х

Условный оператор:
{{ if условие }}
{{ else if другое_условие }}
{{ else }}
{{ end }}

Цикл:
{{ range x }}
    Перебор значений х (массив, срез, ассоциативный массив, канал).
    Текущее значение становится . (точкой)
    {{ break }} - прервать выполнение ближайшего цикла
    {{ continue }} - перейти к следующей итерации ближайшего цикла
{{ else }}
    Выполнится, если в х нет элементов.
{{ end }}

Вставка других шаблонов:
{{ define "name" }}
    Определение шаблона с именем name
{{ end }}

{{ template "name" }} - подстановка шаблона name с пустой точкой
{{ template "name" x }} - подстановка шаблона name с точкой, равной х

{{ block "name" x }}
    Определение шаблона с именем name и вывод его сразу же с точкой, равной х
{{ end }}

Переопределение точки:
{{ with x }}
    Здесь точка равна x. Если х пустое значение, блок не выполняется
{{ else with y }}
    Выполнится, если y - не пустое значение, точка станет y.
{{ else }}
    Выполнится, если х и у - пустое значение
{{ end }}

Вызов функции:
{{ printf "%s" "hello, world" }} - параметры перечисляются через пробел

Передача результата по цепочке:
{{ "hello, world" | printf "%s" }} - результат выполнения предыдущей коменды подставится последним аргументом.
```
{% endraw %}

Переменные:

{% raw %}
```html
{{ $x := "abacaba" }} - присвоить значение переменной в первый раз
{{ $x = "abacaba" }} - повторно присвоить значение переменной

{{ range $index, $element := x }}
    Присвоить ключ (индекс) текущего элемента x в $index, а значение в $element.
    В отличие от go, если передать только одно имя переменной, в нее присвоится значение, а не индекс.
{{ end }}

{{ with $element := x }}
    Вместе с точкой присвоить значение х и переменной $element.
{{ end }}
```
{% endraw %}

Переменная действует до конца текущего блока.

## Встроенные функции

Полный список [здесь](https://pkg.go.dev/text/template#hdr-Functions).
Из интересного, можно выделить:

+ `html`, `js`, `urlquery` - экранирование значений для вставки соотвественно в HTML, JS, URL.
+ `print`, `println`, `printf` - аналоги функций из fmt
+ `len` - аналог функции `len`
Пользовательские функции можно передать в шаблон при помощи метода [Funcs](https://pkg.go.dev/text/template#Template.Funcs)

## HTML

`html/template` не требует явного экранирования выводимых значений. Более того, он умеет распознавать, где выводится значение (HTML, CSS, URL) и применять соответствующее экранирование. Более подробно описано в [документации](https://pkg.go.dev/html/template#hdr-Contexts-1).

[https://masterminds.github.io/sprig/](https://masterminds.github.io/sprig/) - проект по расширению функциональности шаблонов. Добавляет ряд полезных функций.

## Рекурсивный поиск шаблонов

```go
func searchTemplates(rootPath, pattern string) ([]string, error) {
    var foundTemplates []string

    err := filepath.Walk(rootPath, func (path string, info fs.FileInfo, err error) error {
        if err != nil {
            return err
        }
        if info.IsDir() {
            return nil
        }
        base := filepath.Base(path)
        ok, err := filepath.Match(pattern, base)
        if err != nil {
            return err
        }
        if ok {
            foundTemplates = append(foundTemplates, path)
        }
        return nil
    })

    if err != nil {
        return nil, err
    }

    return foundTemplates, nil
}
```

Здесь нужно обратить внимание, что имя шаблона (для выполнения либо для включения) - это имя файла, без пути. Т.е. файл `templates/includes/part.tmpl` надо использовать как `part.tmpl`.

Использование функции:

```go
templates, err := searchTemplates("templates", "*.tmpl")
if err != nil {
    return err
}

t, err := template.ParseFiles(templates...)
if err != nil {
    return err
}

if err := t.ExecuteTemplate(w, "name.tmpl", ctx); err != nil {
    return err
}
```
