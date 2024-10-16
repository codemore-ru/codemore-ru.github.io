---
layout: post
title: Структура проекта в Go
author: Alexey Nurgaliev
section: programming
language: Go
---

Go как язык и как система сборки не определяют требований к структуре каталогов с исходным кодом.
Есть рекомендации, официальная и некоторые неофициальные, как организовывать код в проекте, например:

+ [Organizing a Go module](https://go.dev/doc/modules/layout)
+ [Standard Go Project Layout](https://github.com/golang-standards/project-layout)

Официальная документация предлагает особо не усложнять структуру проектов.
Публичные модули класть в свои каталоги, приватные - в каталог `internal`, чтобы случайно их не импортировать в другой проект.
И класть в `internal` по возможности все, что явно не будет доступно в виде отдельного модуля.
Команды рекомендуется класть в подкаталоги каталога `cmd`, т.е. путь к точке входа в команду будет `cmd/имя_команды/main.go`.
При этом официальная документация допускает, что просто накидать все в один каталог (а то и в один файл) - тоже допустимый вариант.

Рекомендуется давать модулю полное наименование, включая домен репозитория: `module github.com/YOUR-USER-OR-ORG-NAME/YOUR-REPO-NAME`.

Построить приложение можно командой: `go build -o имя_выходного_файла ./cmd/имя_команды`.

Standard Go Project Layout предлагает использовать такие каталоги:

+ `/cmd` - аналогично официальной документации, каталог для исполняемых команд, с подкаталогом на каждую команду
+ `/internal` - аналогично официальной документации, здесь размещаются приватный код, который не должен импортироваться в другие модули
+ `/pkg` - здесь рекомендуют размещать код, который можно импортировать в другие модули
+ `/vendor`- каталог для зависимостей. Команда `go mod vendor` должна скачать и разместить в этот каталог все зависимости
+ `/api` - описание API приложения в каком-либо виде: Swagger/OpenAPI, protobuf-файлы и т.п.
+ `/web` - ресурсы для веб-приложений: шаблоны, статические ресурсы и т.п.
+ `/configs` - шаблоны конфигурации и/или конфигурация по умолчанию
+ `/init` - скрипты для систем инициализации, например конфигурация сервиса для systemd
+ `/scripts` - различные скрипты для сборки, установки, статического анализа и т.п.
+ `/build/package` - конфигурация для сборки (docker, rpm, ...)
+ `/build/ci` - конфигурация для CI/CD
+ `/deployments` - конфигурация для разворачивания приложения (docker-compose, kubernetes, ...)
+ `/test` - различные дополнительные ресурсы для тестирования
+ `/docs` - дополнительная документация (все, что кроме godoc)
+ `/tools` - дополнительные инструменты и скрипты
+ `/examples` - примеры (использования например)
+ `/third_party` - внешние приложения и ресурсы
+ `/githooks` - git hooks
+ `/assets` - прочие ресурсы приложения
+ `/website` - ресурсы для веб-сайта приложения
+ А вот заводить каталог `/src` крайне не рекомендуют
