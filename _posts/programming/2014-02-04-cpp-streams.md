---
layout: post
title: Потоки в C++
author: Alexey Nurgaliev
section: programming
language: C++
---

### Потоки вывода (ostream)

Для вывода данных используеся оператор `<<`. Этот опрератор определен для всех встроенных типов C++ и некоторых классов, входящих в стандартную библиотеку. Для вывода перевода строки можно использовать специальный объект `endl`.

Примеры использования потока вывода:

{% highlight cpp %}
int i = 10;
char c = 'A';
char cs[] = "C string";
bool b = true;
double d = 3.14159265;
string s = "STL string";

cout << i <<endl;
cout << c << 'B' << endl;
cout << cs << endl << b << endl;
cout << d << endl;
cout << s << endl;
{% endhighlight %}

Будет выведено:

{% highlight text %}
10
AB
C string
1
3.14159
STL string
{% endhighlight %}

Также оператор `<<` можно использовать и со своими классами, определив для них перегруженный оператор. Например, для структуры `Book` перегруженный оператор может выглядеть так:

{% highlight cpp %}
struct Book{
	string title, author;
	int num_pages;
	
	ostream& operator<<(ostream& s){
		return (s << author << " " << title << " (" << num_pages << ")");
	}
};
{% endhighlight %}

Некоторые методы класса ostream:

* `put(char c)` - записать символ _с_ в поток
* `write(const char* s, streamsize n)` - записать первые n элементов массива s в поток (streamsize представляет целое число со знаком, например, int)
* `flush()` - записать значение из буфера
* `close()` - закрытие потока

### Потоки ввода (istream)

Для ввода используется оператор `>>`. Он также определен для всех встроенных типов и некоторых классов стандартной библиотеки.

Оператор `>>` также можно определить для своих классов:

{% highlight cpp %}
istream& operator>>(istream& s)
{
	...
}
{% endhighlight %}

Некоторые методы класса istream:

* `get()` - считать следующий символ
* `get(char *buf, streamsize n)` - считать максимум n-1 символ и поместить в массив buf
* `get(char *buf, streamsize n, char delim)` - считывание символов до символа-разделителя delim (разделитель не считывается и остается в потоке)
* `getline(char *buf, streamsize n)`
* `getline(char *buf, streamsize n, char delim)`
* `peek()` - считывает следующий символ, но оставляет его в потоке
* `ignore(streamsize n = 1, int delim = EOF)` - извлекает символы из потока до тех пор, пока их число меньше n или пока не встретился символ delim
* `putback(char c)` - добавляет символ с в текущую позицию потока
* `unget()` - возвращает последний считанный символ в поток

### Форматирование

Для управления форматом вывода можно устанавливать специальные флаги потока методом `setf(ios_base::fmtflags f)`. Но удобнее пользоваться манипуляторами - специальными функциями, реализованными в заголочных файлах `<istream>`, `<ostream>` (они по умолчанию включены в `<iostream>`) и `<iomanip>`.

Основные манипуляторы ввода/вывода:

* `boolalpha` - стороковое представление логических значений
* `noboolalpha` - числовое представление логических значений

{% highlight cpp %}
cout << boolalpha << true << endl;
cout << noboolalpha << false;
{% endhighlight %}

Выведет:

{% highlight text %}
true
0
{% endhighlight %}

* `showbase` - включает вывод 0 перед восьмеричными и 0x перед шестнадцатеричными числами
* `noshowbase` - выключает вывод 0 и 0x
* `dec` - вывод чисел в десятичной системе счисления
* `oct` - в восьмеричной
* `hex` - в шестнадцатеричной
* `uppercase` - заглавные буквы в записи шестнадцатеричных чисел и чисел с плавающей запятой в научной записи
* `nouppercase` - строчные буквы в записи чисел

{% highlight cpp %}
cout << showbase << uppercase;
cout << oct << 0777 << ' ';
cout << hex << 0xABC << endl;
cout << noshowbase << nouppercase;
cout << oct << 0777 << ' ';
cout << hex << 0xABC << endl;
{% endhighlight %}

Выведет:

{% highlight text %}
0777 0XABC
777 abc
{% endhighlight %}

* `skipws` - пропуск символов-разделителей (`' ', '\t', '\n', и т.п.`)
* `noskipws` - выключение пропуска разделителей
* `setw(int n)` - определяет минимальное количество символов, которые выведутся **следующей** операцией вывода
* `setfill(char c)` - символ-заполнитель
* `left` - выравнивание поля по левому краю
* `right` - выравнивание поля по правому краю
* `internal` - выравнивание поля по ширине

{% highlight cpp %}
cout << setw(10);
cout << setfill('#');
cout << 1 << endl;
cout << setw(5);
cout << 100 << endl;
cout << left << setw(10) << -100 << endl;
cout << right << setw(10) << -100 << endl;
cout << internal << setw(10) << -100 << endl;
{% endhighlight %}

Выведет:

{% highlight text %}
#########1
##100
-100######
######-100
-#######10
{% endhighlight %}

* `scientific` - научная запись для чисел с плавающей запятой
* `fixed` - фиксированная точность для чисел с плавающей запятой
* `setprecision` - точность вывода чисел (по умолчанию равна 6)

{% highlight cpp %}
cout << 1234.5678 << endl;
cout << scientific << 1234.5678 << endl;
cout << fixed << 1234.5678 << endl;

cout << setprecision(4);
cout << 1234.5678 << endl;
cout << scientific << 1234.5678 << endl;
cout << fixed << 1234.5678 << endl;
{% endhighlight %}

Выведет:

{% highlight text %}
1234.57
1.234568e+003
1234.567800
1234.5678
1.2346e+003
1234.5678
{% endhighlight %}

* `endl` - запись `\n` и очистка буфера
* `ends` - запись `\0`
* `flush` - очистка буфера потока
* `ws` - прочитать и проигнорировать символы-разделители

### Сотояние потока

Каждый поток `istream` или `ostream` имеет связанное с ним состояние.

Методы проверки состояния:

* `good()` - можно выполнить следующую операцию
* `eof()` - конец потока
* `fail()` - следующая операция не выполнится
* `bad()` - поток испорчен

### Стандартные потоки - iostream

Для реализации стандартного ввода/вывода в библиотеку C++ включен заголовочный файл `iostream`, содержащий следующие предопределенные объекты потоков:

* cin - стандартный поток ввода (соответствует потоку C stdin)
* cout - стандартный поток вывода (соответствует stdout)
* cerr - стандартный поток вывода ошибок (соответствует stderr)
* clog - стандартный поток вывода журнала (соответствует stderr)

### Файловые потоки - fstream

Файловые потоки расположены в заголовочном файле `<fstream>`. `ifstream` - поток ввода, `ofstream` - поток вывода.

Имя файла передается потоку либо в конструкторе, либо через вызов метода `open`.

{% highlight cpp %}
ofstream out_1("test1.txt");
ofstream out_2;
out_2.open("test2.txt");

...

out_1.close();
out_2.close();
{% endhighlight %}

### Строковые потоки - sstream

Строковые потоки расположены в заголовочном файле `<sstream>`. 

`istringstream` - поток ввода. Строка передается потоку в конструкторе.

`ostringstream` - поток вывода. Строку-результат возвращает метод `str()`.

{% highlight cpp %}
string str = "1 2 3";
istringstream iss(str);
ostringstream oss;
int a, b, c;
iss >> a >> b >> c;
oss << a << endl;
oss << setw(5) << setfill('#');
oss << b << endl;
oss << c;
cout << oss.str();
{% endhighlight %}

Выведет:

{% highlight text %}
1
####2
3
{% endhighlight %}