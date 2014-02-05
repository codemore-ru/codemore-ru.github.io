---
layout: post
title: Стандартные библиотеки С/С++
author: Valentin Gubarev
section: programming
language: 'C/C++'
---


#`<cstdio>`

Определённые типы:

`FILE`, `fpos_t`, `size_t`

Определённые константы:

`SEEK_SET`, `SEEK_CUR`, `SEEK_END`
`FILENAME_MAX`, `FOPEN_MAX`
`stdin`, `stdout`, `stderr`
`_IOREAD`, `_IOWRT`
`_IOFBF`, `_IOLBF`, `_IONBF`
`_IOMYBUF`, `_IOEOF`, `_IOERR`, `_IOSTRG`, `_IORW`

Определённые функции:

`clearerr`, `fclose`, `feof`, `ferror`, `fflush`, `fgetc`, `fgetpos`, `fgets`, `fopen`, `fprintf`, `fputc`, `fputs`, `fread`, `freopen`, `fscanf`, `fseek`, `fsetpos`, `ftell`, `fwrite`, `getc`, `getchar`, `gets`, `perror`, `printf`, `putc`, `putchar`, `puts`, `remove`, `rename`, `rewind`, `scanf`, `setbuf`, `setvbuf`, `snprintf`, `sprintf`, `sscanf`, `tmpfile`, `tmpnam`, `ungetc`, `vfprintf`, `vprintf`, `vsnprintf`, `vsprintf`, `vfscanf`, `vscanf`, `vsscanf`


#`<ccmath>`

Определённые константы:

`HUGE_VAL`, `HUGE_VALF`, `HUGE_VALL`, `INFINITY`, `math_errhandling`, `NAN`

Определённые типы:

`double_t`, `float_t`

Определённые функции:

`abs`, `acos`, `acosh`, `asin`, `asinh`, `atan`, `atan2`, `atanh`, `cbrt`, `ceil`, `copysign`, `cos`, `cosh`, `erf`, `erfc`, `exp`, `exp2`, `expm1`, `fabs`, `fdim`, `floor`, `fma`, `fmax`, `fmin`, `fmod`, `fpclassify`, `frexp`, `hypot`, `ilogb`, `isfinite`, `isgreater`, `isgreaterequal`, `isinf`, `isless`, `islessequal`, `islessgreater`, `isnan`, `isnormal`, `isunordered`, `ldexp`, `lgamma`, `llrint`, `llround`, `log`, `log10`, `log1p`, `log2`, `logb`, `lrint`, `lround`, `modf`, `nan`, `nanf`, `nanl`, `nearbyint`, `nextafter`, `nexttoward`, `pow`, `remainder`, `remquo`, `rint`, `round`, `scalbln`, `scalbn`, `signbit`, `sin`, `sinh`, `sqrt`, `tan`, `tanh`, `tgamma`, `trunc`


#`<cstring>`

Определённые константы:

`NULL`

Определённые типы:

`size_t`

Определённые функции:

`memchr`, `memcmp`, `memcpy`, `memmove`, `memset`, `strcat`, `strchr`, `strcmp`, `strcoll`, `strcpy`, `strcspn`, `strerror`, `strlen`, `strncat`, `strncmp`, `strncpy`, `strpbrk`, `strrchr`, `strspn`, `strstr`, `strtok`, `strxfrm`


#`<string>`

Определённые константы:

Определённые типы:

Определённые функции:

`stod`, `stof`, `stoi`, `stol`, `stold`, `stoll`, `stoul`, `stoull`, `to_string`, `to_wstring`

Методы:

`append`, `assign`, `at`, `back`, `begin`, `capacity`, `cbegin`, `cend`, `clear`, `compare`, `copy`, `crbegin`, `crend`, `c_str`, `data`, `empty`, `end`, `erase`, `find`, `find_first_not_of`, `find_first_of`, `find_last_not_of`, `find_last_of`, `front`, `get_allocator`, `insert`, `lenght`, `max_size`, `operator +=`, `operator =`, `operator []`, `pop_back`, `push_back`, `rbegin`, `rend`, `replace`, `reserve`, `resize`, `rfind`, `shrink_to_fit`, `size`, `substr`, `swap`

Константы:

`npos`

non-member overloads:

`getline`, `operator +`, `operator <<`, `operator >>`, `operator ==`, `operator !=`, `operator <`, `operator >`, `operator <=`, `operator >=`, `swap`

#Функции для работы со строками и символами

`isalnum`, `isalpha`, `isblank`, `iscntrl`, `isdigit`, `isgraph`, `islower`, `isprint`, `ispunct`, `isspace`, `isupper`, `isxdigit`, `memchr`, `memcmp`, `memcpy`, `memmove`, `memset`, `strcat`, `strchr`, `strcmp`, `strcoll`, `strcpy`, `strcspn`, `strerror`, `strlen`, `strncat`, `strncmp`, `strncpy`, `strpbrk`, `strrchr`, `strspn`, `strstr`, `strtok`, `strxfrm`, `tolower`, `toupper`

