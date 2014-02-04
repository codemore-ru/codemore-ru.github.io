---
layout: post
title: Потоки в C++
author: Alexey Nurgaliev
section: programming
language: C++
---

<div class="alert alert-info">Статья еще не закончена.</div>

### Потоки вывода (ostream)

Для вывода данных используеся оператор `<<`. Это опрератор определен для всех стандартных типов C++ и некоторых классов, входящих в стандартную библиотеку. Для вывода перевода строки можно использовать специальный объект `endl`.

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

```
10
AB
C string
???
```

Также оператор << можно использовать и со своими классами, определив для них перегруженный оператор. Например, для структуры `Book` перегруженный оператор может выглядеть так:

{% highlight cpp %}
struct Book{
	string title, author;
	int num_pages;
	
	ostream& operator<<(ostream& s){
		return (s << autor << " " << title << " (" << num_pages << ")");
	}
};
{% endhighlight %}

Основные методы класса ostream:

* `put(char c)` - записать символ _с_ в поток
* `write(const char* s, streamsize n)` - записать первые n элементов массива s в поток (streamsize представляет целое число со знаком, например, int)
* `flush()` - записать значение из буфера



#### Форматированный вывод 

### Потоки ввода (istream)

### iostream

Для реализации стандартного ввода/вывода в библиотеку C++ включен заголовочный файл `iostream`, содержащий следующие предопределенные объекты потоков:

* cin - стандартный поток ввода (соответствует потоку C stdin)
* cout - стандартный поток вывода (соответствует stdout)
* cerr - стандартный поток вывода ошибок (соответствует stderr)
* clog - стандартный поток вывода журнала (соответствует stderr)

### fstream

### sstream