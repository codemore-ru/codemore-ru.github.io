---
title: Факторизация N чисел за O(N)
layout: post
---

Данный алгоритм позволяет за линейное время найти все простые числа от 0 до N включительно, также за линейное время факторизовать все числа на данном интервале.

Реализация алгоритма написана так, чтобы минимизировать объем выделяемой памяти.

{% highlight cpp %}
//Поиск простых чисел от 2 до N за O(N)
//Поиск наименьших делителей
//Если N до 2,5 млн., то достаточно uchar (1 байт), иначе short (2 байта)
#include<vector>
#include<cmath>
#include<algorithm>

template<class T>
class prime{
private:
 std::vector<unsigned>pr;
 std::vector<t>lp;//хранить индексы на pr, в которых находится наименьший делитель >1, или 0 - если число простое
public:
 prime(){};

 //Находит наименьшие делители для чисел от 0 до limit включительно
 prime(unsigned limit){
  lp.resize(++limit,0);
  pr.clear();
  pr.push_back(1);
  for(unsigned i=2;i<limit;++i){
   register unsigned max_index=lp[i];
   if(max_index==0){
    max_index=pr.size();
    pr.push_back(i);
   }
   register unsigned d;
   for(unsigned j=1;j<=max_index && (d=i*pr[j])<limit;++j)
    lp[d]=j;
  }
 }

 //Возвращает true, если число простое
 //И false, если нет, или неизвесно
 bool is_prime(unsigned number){
  return number<lp.size() && !lp[number];
 }

 //Возвращает порядковый номер простого числа за O( ln(pr.size()) )
 //0 - если число не простое, или неизвестно
 unsigned sequence_number(unsigned prime_number){
  if(!is_prime(prime_number))
   return 0;
  return std::lower_bound(pr.begin(),pr.end(),prime_number)-pr.begin();
 }

 //Возвращает простое число по его порядковому номеру,
 //0 - если такого простого числа нет в pr
 unsigned return_prime(unsigned sequence_number){
  if(sequence_number && sequence_number<pr.size())
   return pr[sequence_number];
  return 0;
 }

 //Возвращает наименьший делитель, 0 - если неизвесно
 unsigned least_divisor(unsigned number){
  if(number>=lp.size())
   return 0;
  if(is_prime(number))
   return number;
  return pr[lp[number]];
 }

 //Возвращает наибольшее число, для которого известен наименьший делитель
 unsigned limit(){
  return lp.size()-1;
 }

 //Возвращает факторизацию числа
 std::vector<unsigned> factorize(unsigned number){
  std::vector<unsigned> v;
  if(number<lp.size()){
   while(!is_prime(number)){
    v.push_back(pr[lp[number]]);
    number/=pr[lp[number]];
   }
   v.push_back(number);
  }
  return v;
 }
};

#include<iostream>
#include<ctime>

int main(){//Пример использования
 
 clock_t t_start=clock();
 prime<unsigned char>p(2500000);//249 (максимальный индекс)
 clock_t t_finish=clock();

 std::cout<<"work_time = "<<t_finish-t_start<<"\n";

 unsigned cnt_prime=0;
 for(unsigned i=10000;i<=11000;++i)
  if(p.is_prime(i))
   cnt_prime++;
 std::cout<<"cnt_prime (10000 to 11000) = "<<cnt_prime<<std::endl;

 std::cout<<"number_prime (13) = "<<p.sequence_number(13)<<std::endl;

 std::vector<unsigned> v=p.factorize(827364);
 unsigned mult=1;
 for(unsigned i=0;i<v.size();++i){
  std::cout<<v[i]<<" *"[i+1<v.size()];
  mult*=v[i];
 }
 std::cout<<"= "<<mult<<std::endl;

 return 0;
}
{% endhighlight %}