---
layout: post
title: Подготовка олимпиадных задач для ejudge
author: Alexey Nurgaliev
---

_Краткое руководство по подготовке задач олимпиад по программированию для использования
в системе [ejudge](https://ejudge.ru/)._ 

_В руководстве будут рассматриваться только задачи для олимпиад по правилам ACM ICPC или аналогичным._

Обычно в ejudge олимпиадная задача состоит из:

* Файл условия (`statement.xml`)
* Решение жюри (на каком либо из разрешенных на соревновании языке)
* Набор тестов - пары текстовых файлов, содержащие входные и выходные данные
* Чекер - программа, проверяющая корректность решения участника
* Конфигурация в настройках контеста (`serve.cfg`)

## Условие

Условие задачи хранится в файле `statement.xml`. Примерное его содержание:

{% highlight xml linenos %}
<?xml version="1.0" encoding="utf-8" ?>
<problem
        package="ru.codemore.contest"
        id="A"
        type="standard">

    <statement language="ru_RU">

        <title>...</title>

        <description>
            <p>...</p>
        </description>

        <input_format>
            <p>...</p>
        </input_format>

        <output_format>
            <p>...</p>
        </output_format>

        <notes>
            <p>...</p>
        </notes>

    </statement>

    <examples>

        <example>
            <input>...</input>
            <output>...</output>
        </example>

    </examples>

</problem>
{% endhighlight %}

* Параметры в теге `problem`, по документации ejudge, не используются. 
Можно записать любые значения, например, в `id` номер задачи (A), а в `type` - `standard`
* В тегах `title`, `description`, `input_format`, `output_format`, `notes` 
текст должен быть в формате [XHTML](https://ru.wikipedia.org/wiki/XHTML) 
(т.е. корректность тегов строго проверяется). 
Любой из этих тегов может отсутствовать
* `title` содержит название задачи
* `description` содержит основную часть условия задачи
* `input_format` содержит подробное описание формата входных данных. 
Для параметров должны быть указаны диапазоны значений. 
Также здесь рекомендуется обращать внимание участников на разделители параметров 
(одиночные пробелы, произвольное количество пробелов, переводы строк и т.п.) 
* `output_format` содержит подробное описание формата выходных данных
* `notes` содержит примечания к условию
* Для лучшего отображения рекомендуется абзацы текста в тегах 
`description`, `input_format`, `output_format`, `notes` оборачивать в теги `<p>`
* Для вставки изображения в условие нужно поместить его файл в каталог задачи и добавить в условие
`<img src="${getfile}=имя_файла.png"/>`
* `examples` содержит примеры входных и выходных данных. 
Каждый пример описывается тегом `example`, тег `input` содержит пример входных данных,`output` - выходных.
Данные в тегах `input` и `output` будут отображаться с сохранением форматирования, обращайте внимание на лишние пробелы

Пример `statement.xml` реальной задачи:

{% highlight xml linenos %}
<?xml version="1.0" encoding="utf-8" ?>
<problem
        package="ru.pskovedu.contest"
        id="rot13"
        type="standard">

    <statement language="ru_RU">

        <title>Шифр ROT13</title>

        <description>
            <p>
                Алгоритм шифрования ROT13 является вариацией шифра Цезаря.
            </p>
            <blockquote>
                Применение алгоритма ROT13 к части текста требует простой замены каждого
                буквенного символа на соответствующий ему со сдвигом на 13 позиций в алфавите.
                A становится N, B становится O, и т. д. до М, которое становится Z, а затем
                последовательно применяются буквы из начала алфавита: N становится A,
                O становится B, и так далее до Z, которая становится М. Затронуты лишь те буквы,
                которые используются в английском алфавите; цифры, символы, пробелы и все остальные
                символы остаются без изменений.
            </blockquote>
            <a href="https://ru.wikipedia.org/wiki/ROT13">https://ru.wikipedia.org/wiki/ROT13</a>
        </description>

        <input_format>
            <p>
                В первой строке дано целое число N (1&le;N&le;100) - длина строки.
            </p>
            <p>
                Во второй - строка состоящая из N символов - заглавных и строчных латинских букв,
                пробелов и знаков препинания ",.!?-" (не включая кавычки), зашифрованная по алгоритму ROT13.
            </p>
            <p>
                Гарантируется, что строка не начинается и не заканчивается пробелом.
            </p>
        </input_format>

        <output_format>
            <p>
                Расшифрованная строка.
            </p>
        </output_format>

    </statement>

    <examples>

        <example>
            <input>
13
Uryyb, jbeyq!
            </input>
            <output>Hello, world!</output>
        </example>

    </examples>

</problem>
{% endhighlight %}

[Статья в ejudge wiki](https://ejudge.ru/wiki/index.php/Statement.xml) 
содержит описания и других тегов, которые можно включить в условие.

## Решение жюри

Решение задачи, предоставленное жюри. 

Должно проходить все тесты, соотвествовать ограничениям по времени и памяти, 
а также полностью соответствовать правилам олимпиады (если правилами накладываются какие-либо особые граничения).

Также рекомендуется, чтобы решение было написано на языке, разрешенном на олимпиаде. 

Пример решения (для задачи, описанной выше):

{% highlight java linenos %}
package rot13;

import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        in.nextLine();
        String s = in.nextLine();
        System.out.println(rot13(s));
    }

    public static String rot13(String s) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isAlphabetic(c)) {
                if (Character.isUpperCase(c)) {
                    c = (char)((c - 'A' + 13) % 26 + 'A');
                } else {
                    c = (char)((c - 'a' + 13) % 26 + 'a');
                }
            }
            sb.append(c);
        }

        return sb.toString();
    }

}
{% endhighlight %}

## Набор тестов

Тест - это два текстовых файла, содержащих корректные входные и выходные данные задачи. 
Рекомендуется, чтобы:

* Выходные данные содержали вывод решения жюри
* Первые тесты соответствовали тестам из приверов в условии
* Входные данные соответствовали рекомендациям polygon:
    - каждая строка завершается EOLN (переводом строки);
    - не содержат символы с кодами меньше 32;
    - не содержат начальных или конечных пробелов;
    - не содержат два подряд идущих пробела;
    - не содержат начальных или конечных пустых строк;
    - файл не пустой.

Файлы тестов можно поместить в каталог `tests`, файлы входных данных назвать номером теста, 
файлы выходных данных - номером теста и расширением `.a` (расположение и наименование можно изменить в настройках контеста).

## Чекер

Чекер - программа, проверяющая корректность решения участника, использующая три файла: входные данные,
выходные данные жюри, выходные данные участника.

Проверка может закончиться с одним из результатов:

* OK - решение принято
* WA (Wrong Answer) - решение неправильное
* PE (Presentation Error) - нарушен формат вывода
* FAIL - проверка завершилась с ошибкой 

Для написания чекеров обычно используется библиотека [testlib](https://github.com/MikeMirzayanov/testlib),
предоставляющая многие полезные методы. 
При использовании библиотеки, нужно ее код (`testlib.h`) также включить в файлы задачи.

testlib предоставляет [несколько стандартных чекеров](https://github.com/MikeMirzayanov/testlib/tree/master/checkers), например:

* `fcmp.cpp` - Lines, doesn't ignore whitespaces
* `hcmp.cpp` - Single huge integer
* `lcmp.cpp` - Lines, ignore whitespaces
* `ncmp.cpp` - Single or more int64, ignores whitespaces
* `rcmp4.cpp` - Single or more double, max any error 1e-4
* `rcmp6.cpp` - Single or more double, max any error 1e-6
* `rcmp9.cpp` - Single or more double, max any error 1e-9
* `wcmp.cpp` - Sequence of tokens
* `yesno.cpp` - Single yes or no, case insensitive

Пример чекера для задачи, описанной выше (используется стандартный `fcmp.cpp`):

{% highlight cpp linenos %}
#include "testlib.h"
#include <string>
#include <vector>
#include <sstream>

using namespace std;

int main(int argc, char * argv[])
{
    setName("compare files as sequence of lines");
    registerTestlibCmd(argc, argv);

    std::string strAnswer;

    int n = 0;
    while (!ans.eof()) 
    {
        std::string j = ans.readString();

        if (j == "" && ans.eof())
          break;

        strAnswer = j;
        std::string p = ouf.readString();

        n++;

        if (j != p)
            quitf(_wa, "%d%s lines differ - expected: '%s', found: '%s'", n, englishEnding(n).c_str(), compress(j).c_str(), compress(p).c_str());
    }
    
    if (n == 1)
        quitf(_ok, "single line: '%s'", compress(strAnswer).c_str());
    
    quitf(_ok, "%d lines", n);
}
{% endhighlight %}

## Настройки контеста

Каждой задаче соответствует раздел в настройках контеста (файл `serve.cfg`). 

Для задания общих настроек для всех задач используются "абстрактные" задачи. Пример настройки такой задачи:

{% highlight ini linenos %}
[problem]
abstract
short_name = "PskovGeneric"
use_stdin
use_stdout
use_corr
xml_file = "statement.xml"
test_pat = "%02d"
corr_pat = "%02d.a"
time_limit = 5
real_time_limit = 10
max_vm_size = 256M
max_stack_size = 256M
max_file_size = 256M
check_cmd = "check"
{% endhighlight %}

Здесь определены настройки:

* Имя задачи `PskovGeneric`
* Используются стандартные потоки ввода и вывода
* Условие хранится в файле `statement.xml`
* Имя входных данных теста - его номер (не менее двух символов с ведущим нулем при необходимости)
* Имя выходных данных теста - его номер (аналогично входным данным) и расширение `.a`
* Ограничение на процессорное время выполнения 5 секунд, ограничение астрономического времени 10 секунд
* Ограничение памяти 256МБ

Далее описываются настройки конкретных задач.

Пример настройки для задачи. описанной выше:

{% highlight ini linenos %}
[problem]
super = PskovGeneric
internal_name = "rot13"
short_name = "B"
long_name = "Шифр ROT13"
{% endhighlight %}

Здесь определены настройки:

* Базовая абстрактная задача `PskovGeneric` (описанная выше)
* Внутреннее имя `rot13` (в каталоге с таким именем задача будет хранится на сервере ejudge)
* Краткое имя задачи `B`
* Длинное имя задачи `Шифр ROT13`

[Статья в ejudge wiki](https://ejudge.ru/wiki/index.php/Serve.cfg) содержит подробное описание настроек контеста.

## Polygon

Задачи удобно готовить в системе [polygon](https://polygon.codeforces.com/). 
Она поддерживает множество возможностей по организации работы над отдельными задачами и над контестом в целом.

Некоторые полезные возможности:

* Поддержка управления версиями всех ресурсов задачи
* Генераторы для тестов
* Валидаторы для тестов
* Автоматическая проверка чекеров и решений на тестах задачи (с контролем времени и памяти)

Существует возможность автоматизированной загрузки задач и контестов из polygon в ejudge. 
Однако на момент написания руководства условия не импортировались: 
polygon использует для оформления условий TeX, а ejudge HTML. 
