---
layout: post
title: "Большое сравнение библиотек UI-компонентов для Vue 3"
author: "Alexey Nurgaliev"
---

# Большое сравнение библиотек UI-компонентов для Vue 3

Популярная библиотека для связки Bootstrap и Vue [https://bootstrap-vue.org/](https://bootstrap-vue.org/) сейчас поддерживает версии Bootstrap 4 + Vue 2 и планов поддержки Vue 3 пока нет. 
Библиотека для связки Bootstrap 5 и Vue 3 сейчас находится на ранней стадии развития: [https://github.com/bootstrap-vue-next/bootstrap-vue-next](https://github.com/bootstrap-vue-next/bootstrap-vue-next)
Тем временем специально для Vue 3 создаются собственные библиотеки компонентов (и даже целые UI-фреймворки) и можно попробовать среди них найти замену Bootstrap. 
В интернете можно найти достаточно перечислений и обзоров UI-библиотек, этот обзор будет рассматривать проекты с точки зрения возможности замены Bootstrap.

Библиотеки будут рассматриваться по критериям (очень субъективным):
1. Есть типографика (разметка для заголовков и текстовых блоков). Если во фреймворке нет своей типографики, то можно рассмотреть его использование вместе с библиотекой [Milligram](https://milligram.io/) (но нужно, чтобы они не конфликтовали друг с другом).
2. Есть сетка (колонки в простом случае или более комплексное управление расположением элементов на странице).
3. Есть стандартные компоненты для форм (поля для текста и чисел, флажки и переключатели).
4. Есть компоненты для ввода даты и времени. Их нет в стандартном Bootstrap, но наличие таких встроенных компонентов очень важно - так или иначе, вводить дату придется, лучше чтобы календарь встраивался и был в одном стиле с остальными компонентами.
5. Есть аналоги для распространенных компонентов из Bootstrap (модальные окна, вкладки, заголовок и т.п.)
6. Есть что-то, чего нет в Bootstrap - чем больше интересных и полезных компонентов, тем лучше, вещи вроде DataTable очень приветствуются.
7. Локализация (особенно если есть компоненты для выбора дат). Встроенная поддержка русского языка - хорошо, но если есть просто руководство, как ее сделать, то тоже неплохо.
8. Общее впечатление от внешнего вида - крайне субъективное, Material Design немного надоел (и далеко не все могут сделать его правильно, по изначальной спецификации Google), поэтому будет считаться скорее как минус.
9. Переопределение стилей - насколько легко можно изменить стандартный стиль и в каких пределах возможно изменение. Хорошо, если можно переопределить SCSS-переменные, а если есть собственный редактор тем, то это еще лучше.
10. Активность разработки (коммиты, новые версии, работа с issues).

# Проекты, которые могут полностью заменить Bootstrap

У этих проектов есть все необходимое, чтобы полноценно заменить Bootstrap.

## Naïve UI

Официальный сайт: [https://www.naiveui.com/](https://www.naiveui.com/)

Исходный код: [https://github.com/TuSimple/naive-ui](https://github.com/TuSimple/naive-ui)

Лицензия: MIT

1. Да: [https://www.naiveui.com/en-US/os-theme/components/typography](https://www.naiveui.com/en-US/os-theme/components/typography)
2. Да:
   * сетка: [https://www.naiveui.com/en-US/os-theme/components/grid](https://www.naiveui.com/en-US/os-theme/components/grid)
   * более сложные способы разметки: [https://www.naiveui.com/en-US/os-theme/components/layout](https://www.naiveui.com/en-US/os-theme/components/layout)
3. Да: [https://www.naiveui.com/en-US/os-theme/components/form](https://www.naiveui.com/en-US/os-theme/components/form)
4. Да: [https://www.naiveui.com/en-US/os-theme/components/date-picker](https://www.naiveui.com/en-US/os-theme/components/date-picker)
5. Да, есть практически всё (но не хватает гибко настраиваемого заголовка страницы, тот, что есть, не совсем то), например модальные окна: https://www.naiveui.com/en-US/os-theme/components/modal
6. Да, например:
   * DataTable: [https://www.naiveui.com/en-US/os-theme/components/data-table](https://www.naiveui.com/en-US/os-theme/components/data-table)
   * календарь: [https://www.naiveui.com/en-US/os-theme/components/calendar](https://www.naiveui.com/en-US/os-theme/components/calendar)
   * ввод тегов: [https://www.naiveui.com/en-US/os-theme/components/dynamic-tags](https://www.naiveui.com/en-US/os-theme/components/dynamic-tags)
7. 50/50, стандартно есть локализация только для английского и китайского языков, но несложно сделать самостоятельно, например для русского языка: [https://github.com/n-at/naive-ui-locale-ru](https://github.com/n-at/naive-ui-locale-ru)
8. Да, стандартная тема достаточно нейтральна, стиль по умолчанию сделан неплохо
9. Да, поддерживаются темы (есть специальный компонент-конструктор тем), переменные можно переопределять через настройки [https://www.naiveui.com/en-US/os-theme/docs/customize-theme](https://www.naiveui.com/en-US/os-theme/docs/customize-theme)
10. Да, проект развивается остаточно активно, открытых issues довольно немного. По собственному опыту обращения к разработчикам, найденная ошибка была исправлена в течение пары часов.

Итог: хороший фреймворк, подходит как замена Bootstrap. Наверное единственный минус - нет аналогичного Bootstrap заголовка страницы, но его можно собрать из имеющихся компонентов.

## Ant Design Vue

Официальный сайт: [https://2x.antdv.com/docs/vue/introduce](https://2x.antdv.com/docs/vue/introduce)

Исходный код: [https://github.com/vueComponent/ant-design-vue/](https://github.com/vueComponent/ant-design-vue/)

Лицензия: MIT

1. Да: [https://2x.antdv.com/components/typography](https://2x.antdv.com/components/typography)
2. Да:
   * сетка: [https://2x.antdv.com/components/grid](https://2x.antdv.com/components/grid)
   * контейнер: [https://2x.antdv.com/components/grid](https://2x.antdv.com/components/gridy)
3. Да: [https://2x.antdv.com/components/form](https://2x.antdv.com/components/form)
4. Да: [https://2x.antdv.com/components/date-picker](https://2x.antdv.com/components/date-picker)
5. Да, есть многое, например модальное окно: [https://2x.antdv.com/components/modal](https://2x.antdv.com/components/modal)
6. Да, например:
   * таблицы достаточно мощные, чтобы заменить Data Table: [https://2x.antdv.com/components/table](https://2x.antdv.com/components/table)
   * деревья: [https://2x.antdv.com/components/tree](https://2x.antdv.com/components/tree)
7. Да, русский язык стандартно поддерживается: [https://2x.antdv.com/docs/vue/i18n](https://2x.antdv.com/docs/vue/i18n)
8. Да, здесь своя дизайн-система (Ant Design, разработана в Ant Financial, используется в Alibaba), выглядит неплохо
9. 50/50, можно настроить цвета: [https://2x.antdv.com/docs/vue/customize-theme](https://2x.antdv.com/docs/vue/customize-theme) и некоторые мелочи, но кажется, отойти от дизайн-системы по внешнему виду компонентов не получится
10. Да, проект развивается достаточно активно

Итог: хороший фреймворк, может подойти на замену Bootstrap.

## Vuetify

Официальный сайт: [https://vuetifyjs.com](https://vuetifyjs.com)

Исходный код: [https://github.com/vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify)

Лицензия: MIT

1. Да: [https://vuetifyjs.com/en/styles/text-and-typography/](https://vuetifyjs.com/en/styles/text-and-typography/)
2. Да: [https://vuetifyjs.com/en/components/grids/](https://vuetifyjs.com/en/components/grids/)
3. Да: [https://vuetifyjs.com/en/components/forms/](https://vuetifyjs.com/en/components/forms/)
4. Да: [https://vuetifyjs.com/en/components/date-pickers/](https://vuetifyjs.com/en/components/date-pickers/)
5. Да, есть практически всё, например модальные окна: [https://vuetifyjs.com/en/components/dialogs/](https://vuetifyjs.com/en/components/dialogs/)
6. Да, например:
   * DataTable: [https://vuetifyjs.com/en/components/data-tables/](https://vuetifyjs.com/en/components/data-tables/)
   * полноценный календарь: [https://vuetifyjs.com/en/components/calendars/](https://vuetifyjs.com/en/components/calendars/)
   * просмотр данных в виде деревьев: [https://vuetifyjs.com/en/components/treeview/](https://vuetifyjs.com/en/components/treeview/)
7. Да, строки и календари локализованы [https://vuetifyjs.com/en/features/internationalization/](https://vuetifyjs.com/en/features/internationalization/)
8. 50/50, с одной стороны это надоевший Material Design (см. описание критериев), но сделан очень хорошо
9. Да, есть стандартное переопределение тем и цветов [https://vuetifyjs.com/en/features/theme/](https://vuetifyjs.com/en/features/theme/) или можно переопределить SCSS-переменные [https://vuetifyjs.com/en/features/sass-variables/](https://vuetifyjs.com/en/features/sass-variables/)
10. Да, проект развивается достаточно активно. Но количество открытых issues довольно большое (>1000)

Итог: хороший фреймворк, если нет возражений против Material Design. Как замена Bootstrap вполне подходит.

## Quasar

Официальный сайт: [https://quasar.dev/](https://quasar.dev/)

Исходный код: [https://github.com/quasarframework/quasar](https://github.com/quasarframework/quasar)

Лицензия: MIT

1. Да: [https://quasar.dev/style/typography](https://quasar.dev/style/typography)
2. Да:
   * сетка на основе flexbox: [https://quasar.dev/layout/grid/introduction-to-flexbox](https://quasar.dev/layout/grid/introduction-to-flexbox)
   * контейнер: [https://quasar.dev/layout/layout](https://quasar.dev/layout/layout)
3. Да: [https://quasar.dev/vue-components/form](https://quasar.dev/vue-components/form)
4. Да: [https://quasar.dev/vue-components/date](https://quasar.dev/vue-components/date)
5. Да, есть практически всё, например модальные окна: [https://quasar.dev/vue-components/dialog](https://quasar.dev/vue-components/dialog)
   вместо заголовка есть аналог: [https://quasar.dev/vue-components/toolbar](https://quasar.dev/vue-components/toolbar)
6. Да, например:
   * WYSIWYG редактор: [https://quasar.dev/vue-components/editor](https://quasar.dev/vue-components/editor)
   * стандартный компонент таблиц достаточно мощный, чтобы быть заменой Data Table: [https://quasar.dev/vue-components/table](https://quasar.dev/vue-components/table)
7. Да, есть стандартная поддержка русского языка
8. 50/50, это Material Design, но сделан неплохо
9. Да, есть редактор тем: [https://quasar.dev/style/theme-builder](https://quasar.dev/style/theme-builder) и руководство по стандартным цветам: [https://quasar.dev/style/color-palette](https://quasar.dev/style/color-palette)
10. Да, проект развивается активно

Итог: хороший набор компонентов, но это Material Design. Может быть заменой Bootstrap.

# Почти полноценная замена

Обычно не хватает типографики или компонента для выбора даты. Можно попробовать использовать совместно с Milligram.

## PrimeVue

Официальный сайт: [https://www.primefaces.org/primevue/](https://www.primefaces.org/primevue/)

Исходный код: [https://github.com/primefaces/primevue](https://github.com/primefaces/primevue)

Лицензия: MIT

1. Нет
2. Да, сетка: [https://www.primefaces.org/primevue/showcase/#/grid](https://www.primefaces.org/primevue/showcase/#/grid)
3. Да, например поле ввода текста: [https://www.primefaces.org/primevue/showcase/#/inputtext](https://www.primefaces.org/primevue/showcase/#/inputtext)
4. Да: [https://www.primefaces.org/primevue/showcase/#/calendar](https://www.primefaces.org/primevue/showcase/#/calendar)
5. Да, есть практически все, например:
   * модальные окна: [https://www.primefaces.org/primevue/showcase/#/dialog](https://www.primefaces.org/primevue/showcase/#/dialog)
   * заголовок страницы: [https://www.primefaces.org/primevue/showcase/#/menubar](https://www.primefaces.org/primevue/showcase/#/menubar)
6. Да, например:
   * DataTable: [https://www.primefaces.org/primevue/showcase/#/datatable](https://www.primefaces.org/primevue/showcase/#/datatable)
   * календарь: [https://www.primefaces.org/primevue/showcase/#/fullcalendar](https://www.primefaces.org/primevue/showcase/#/fullcalendar)
   * диаграммы, через интеграцию с chart.js: [https://www.primefaces.org/primevue/showcase/#/chart/bar](https://www.primefaces.org/primevue/showcase/#/chart/bar)
   * WYSIWYG редактор, интеграция с Quill: [https://www.primefaces.org/primevue/showcase/#/editor](https://www.primefaces.org/primevue/showcase/#/editor)
7. 50/50, стандартной поддержки русского языка нет, но есть документация по локализации: [https://www.primefaces.org/primevue/showcase/#/locale](https://www.primefaces.org/primevue/showcase/#/locale)
8. Да, стандартные темы выглядят неплохо
9. Да, поддерживаются темы, есть собственный редактор тем: [https://www.primefaces.org/designer-vue/#/](https://www.primefaces.org/designer-vue/#/)
10. Да, проект развивается активно

Итог: хороший набор компонентов, но для полноценной замены Bootstrap не хватает типографики (можно попробовать использовать совместно с Milligram).

## Element+ (beta)

Официальный сайт: [https://element-plus.org](https://element-plus.org)

Исходный код: [https://github.com/element-plus/element-plus](https://github.com/element-plus/element-plus)

Лицензия: MIT

1. Нет
2. Да:
   * сетка: [https://element-plus.org/#/en-US/component/layout](https://element-plus.org/#/en-US/component/layout)
   * контейнер: [https://element-plus.org/#/en-US/component/container](https://element-plus.org/#/en-US/component/container)
3. Да: [https://element-plus.org/#/en-US/component/form](https://element-plus.org/#/en-US/component/form)
4. Да: [https://element-plus.org/#/en-US/component/date-picker](https://element-plus.org/#/en-US/component/date-picker)
5. Да, есть практически всё, например модальные окна: [https://element-plus.org/#/en-US/component/dialog](https://element-plus.org/#/en-US/component/dialog)
6. Да, например:
   * календарь: [https://element-plus.org/#/en-US/component/calendar](https://element-plus.org/#/en-US/component/calendar)
   * стандартный компонент для таблиц достаточно мощный, чтобы выполнять функции DataTable: [https://element-plus.org/#/en-US/component/table](https://element-plus.org/#/en-US/component/tabl)
7. Да, есть стандартная локализация для русского языка
8. Да, стандартная тема достаточно нейтральна
9. Да, можно настроить SCSS-переменные: [https://element-plus.org/#/en-US/component/custom-theme](https://element-plus.org/#/en-US/component/custom-theme)
10. Да, проект развивается достаточно активно

Итог: неплохой набор компонентов, но отсутствие типографики не позволяет сделать его полноценной заменой Bootstrap (но можно собрать или найти простую CSS-библиотеку для типографики самостоятельно).

## Vuestic

Официальный сайт: [https://vuestic.dev/](https://vuestic.dev/)

Исходный код: [https://github.com/epicmaxco/vuestic-ui](https://github.com/epicmaxco/vuestic-ui)

Лицензия: MIT

1. Да: [https://vuestic.dev/ru/styles/typography](https://vuestic.dev/ru/styles/typography)
2. Да: [https://vuestic.dev/ru/styles/grid](https://vuestic.dev/ru/styles/grid)
3. Да: [https://vuestic.dev/ru/ui-elements/form](https://vuestic.dev/ru/ui-elements/form])
4. Да: [https://vuestic.dev/ru/ui-elements/date-picker](https://vuestic.dev/ru/ui-elements/date-picker)
5. Да, многое есть, например:
   * модальное окно: [https://vuestic.dev/ru/ui-elements/modal](https://vuestic.dev/ru/ui-elements/modal)
   * заголовок страницы: [https://vuestic.dev/ru/ui-elements/navbar](https://vuestic.dev/ru/ui-elements/navbar)
6. Нет, особо интересного нет, Data Table пока в разработке
7. Нет, у календаря можно настроить названия месяцев и дней недели
8. Да, свой дизайн, не похож на остальные проекты
9. Да, можно настроить цвета: [https://vuestic.dev/ru/getting-started/configuration-guide#color-themes](https://vuestic.dev/ru/getting-started/configuration-guide#color-themes) и некоторые настройки компонентов [https://vuestic.dev/ru/getting-started/configuration-guide#components-config](https://vuestic.dev/ru/getting-started/configuration-guide#components-config)
10. Да, проект развивается

Итог: неплохой фреймворк, но есть только базовые компоненты, не хватает что-то вроде Data Table

## Inkline (beta)

Официальный сайт: [https://inkline.io/](https://inkline.io/)

Исходный код: [https://github.com/inkline/inkline](https://github.com/inkline/inkline)

Лицензия: MIT

1. Да: [https://inkline.io/docs/core/typography](https://inkline.io/docs/core/typography)
2. Да:
   * сетка: [https://inkline.io/docs/core/grid](https://inkline.io/docs/core/grid)
   * контейнер: [https://inkline.io/docs/core/layout](https://inkline.io/docs/core/layout)
3. Да: [https://inkline.io/docs/forms/form](https://inkline.io/docs/forms/form)
4. Нет
5. Да, есть многое, например:
   * заголовок: [https://inkline.io/docs/components/navbar](https://inkline.io/docs/components/navbar)
   * модальное окно: [https://inkline.io/docs/components/modal](https://inkline.io/docs/components/modal)
6. Да, например Data Table: [https://inkline.io/docs/components/datatable/introduction](https://inkline.io/docs/components/datatable/introduction)
7. 50/50, календаря нет, а для локализации строк в Data Table есть руководство: [https://inkline.io/docs/components/datatable/api](https://inkline.io/docs/components/datatable/api)
8. Да, свой дизайн, напоминающий Bootstrap 4
9. 50/50, легкого изменения тем нет6 но можно настроить SCSS-переменные: [https://inkline.io/docs/core/sass-variables](https://inkline.io/docs/core/sass-variables)
10. 50/50, какая-то активность есть, но не особо большая

Итог: неплохой фреймворк, с какой-то степени может заменить Bootstrap (и по дизайну похож), но не хватает календаря.

# Проекты, которым чего-то сильно не хватило

## Wave UI

Официальный сайт: [https://antoniandre.github.io/wave-ui/](https://antoniandre.github.io/wave-ui/)

Исходный код: [https://github.com/antoniandre/wave-ui](https://github.com/antoniandre/wave-ui)

Лицензия: MIT

1. Да: [https://antoniandre.github.io/wave-ui/typography](https://antoniandre.github.io/wave-ui/typography)
2. Да: [https://antoniandre.github.io/wave-ui/layout--grid-system](https://antoniandre.github.io/wave-ui/layout--grid-system)
3. Да: [https://antoniandre.github.io/wave-ui/w-input](https://antoniandre.github.io/wave-ui/w-input)
4. Нет, предполагается использовать системный календарь
5. 50/50, есть многое, но не хватает мелочей, вроде Button Group. Но есть модальные окна: [https://antoniandre.github.io/wave-ui/w-dialog](https://antoniandre.github.io/wave-ui/w-dialog)
6. Нет, набор компонентов очень базовый
7. Нет, но она и не требуется - компонента выбора дат или Data Table здесь нет
8. 50/50, довольно минималистичный и, кажется, свой собственный дизайн
9. Да, можно настроить цвета: [https://antoniandre.github.io/wave-ui/colors](https://antoniandre.github.io/wave-ui/colors) можно переопределить SCSS-переменные: [https://antoniandre.github.io/wave-ui/customization](https://antoniandre.github.io/wave-ui/customization)
10. Да, активность в репозитории есть

Итог: минималистичный фреймворк, с очень базовым набором компонентов. Почему-то создает впечатление чего-то из 2010 года (из времен jQuery UI). Наверное как замена Bootstrap не подойдет.

## Equal

Официальный сайт: [https://quatrochan.github.io/Equal/](https://quatrochan.github.io/Equal/)

Исходный код: [https://github.com/quatrochan/Equal](https://github.com/quatrochan/Equal)

Лицензия: MIT

1. Нет
2. Нет
3. Да, например ввод текста: [https://quatrochan.github.io/Equal/components/input](https://quatrochan.github.io/Equal/components/input)
4. Нет
5. Нет, набор компонентов довольно небольшой, много чего не хватает, но, например, есть модальное окно: [https://quatrochan.github.io/Equal/components/modal](https://quatrochan.github.io/Equal/components/modal)
6. Нет, особых интересных компонентов здесь нет, наверное можно отметить уведомления: [https://quatrochan.github.io/Equal/components/notification](https://quatrochan.github.io/Equal/components/notification)
7. Нет, но локализация и не требуется - строк или календаря нет
8. Да, стандартная тема оформления сделана аккуратно и производит хорошее впечатление
9. Нет, официального руководства по изменению стандартного стиля нет, вероятно, изменение возможно только через модификацию исходного кода
10. 50/50, невысокая активность

Итог: минималистичный набор компонентов с интересным дизайном. Как замена Bootstrap не подойдет.

## BalmUI

Официальный сайт: [https://next-material.balmjs.com/](https://next-material.balmjs.com/)

Исходный код: [https://github.com/balmjs/balm-ui](https://github.com/balmjs/balm-ui)

Лицензия: MIT

1. Да: [https://next-material.balmjs.com/#/theme/typography](https://next-material.balmjs.com/#/theme/typography)
2. Да, сетка: [https://next-material.balmjs.com/#/layout/grid](https://next-material.balmjs.com/#/layout/grid)
3. Да: [https://next-material.balmjs.com/#/data-input/textfield](https://next-material.balmjs.com/#/data-input/textfield)
4. Да, на основе flatpikr: [https://next-material.balmjs.com/#/data-input/datepicker](https://next-material.balmjs.com/#/data-input/datepicker)
5. 50/50, не хватает заголовка (или его аналогов)
6. Да, например:
   * Data Table: [https://next-material.balmjs.com/#/data-display/table](https://next-material.balmjs.com/#/data-display/table)
   * WYSISYG редактор: [https://next-material.balmjs.com/#/data-input/editor](https://next-material.balmjs.com/#/data-input/editor)
7. Нет, у flatpikr есть своя поддержка локализации, строки перевести нельзя (руководства на эту тему нет)
8. Нет, это Material Design, но производит не особо хорошее впечатление (в отличие от Vuetify или Quasar)
9. Нет, можно настроить цвета [https://next-material.balmjs.com/#/theme/color](https://next-material.balmjs.com/#/theme/color) но кажется, на этом всё
10. 50/50, какая-то активность есть, но мало

Итог: довольно простой набор компонентов. Material Design. Отсутствие локализации. По общему впечатлению, не подходит на замену Bootstrap.
