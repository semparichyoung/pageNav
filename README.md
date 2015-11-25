# pageNav
Easy create bootstrap pagination and can only show limit page around the current page

In *.html file:

```html
<div id='content'>
  <div class='article'></div>
  <div class='article'></div>
  <div class='article'></div>
  .
  .
  .
</div>
<div id='pageNavArea'></div>
```

In *.js file:
```javascript
$("#pageNavArea").pageNav({
  //the content of which you want to use pagination to control
  "content": $(".article"),
  //how many article shown in one page
  "showNum": 1,
  //pagination will only show this number of page
  "visPage": 5
});
```

OR:

```javascript
  $("#pageNavArea").pageNav({
    "maxPage": 10,
    "visPage": 5,
    "callback": function(index){
      //index:the page index, start at 1.
      //You can use this to control the article yourself.
    };
  });
```


options:
  maxPage     int       
  callback    function  
  content     html elements
  showNum     int
  visPage     int             default:5
  index       int             default:1   //start page
  
Must have maxPage + callback or content + showNum to active this.
  
