# Цели задания
* Практика работы с API. Научиться разделять приложение на несколько страниц с параметрами.
* На основе https://gorest.co.in/ создайте блог, который состоит из 2-х видов страниц (2-х html файлов):
* Список статей блога, который можно получить запросом GET https://gorest.co.in/public-api/posts?page=10, где page - номер страницы для постраничной навигации. Номер страницы должен браться из URL страницы из параметра page. На странице должны выводиться:
  - Список статей, где каждый элемент должен быть ссылкой на статью вида post.html?id=10 (вместо 10 - id соответствующей статьи). Сам список находится в свойстве data в ответе на список статей.
  - Постраничная навигация, построенная на основе свойства из ответа на список статей meta.pagination с информацией о кол-ве статей и страниц. Каждая ссылка должна вести на index.html?page=10 (вместо 10 - номер соответствующей страницы). При этом ссылка на первую страницу не должна иметь параметров, то есть должна просто вести на страницу index.html без параметров, так как 1 - это значение по умолчанию и его необязательно явно проставлять.
* Детальная страница статьи, которую можно получить запросом https://gorest.co.in/public-api/posts/{id статьи}. При этом id статьи должен браться из URL страницы из параметра id. На странице должны выводиться:
  - Заголовок (в тэге h1, свойство title из ответа на запрос) загруженной статьи.
  - Содержимое (в тэге p, свойство body из ответа на запрос).
  - Комментарии к статье в виде списка с именем автора и содержимым к каждому комментарию. Получить список комментариев к конкретной статье можно запросом GET https://gorest.co.in/public-api/comments?post_id=4 (вместо 4 - id статьи).