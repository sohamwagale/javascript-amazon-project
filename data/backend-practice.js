const xhr = new XMLHttpRequest();

const products = new XMLHttpRequest();


xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})

// products.addEventListener('loading',()=>{
//     console.log("Loading");
// })

products.addEventListener('load',()=>{
    console.log(products.responseURL);
    console.log(products.getResponseHeader(''))
    console.log("DOne")
})

// products.addEventListener('loadend',()=>{
//     console.log("Load ENded");
// })


xhr.open('GET','https://supersimplebackend.dev/hello');
// xhr.open('GET','https://supersimplebackend.dev/products/first');
// xhr.open('GET','https://supersimplebackend.dev/documentation');
xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');

//SEnding a GET request  is same as putting the link in the browse
// Just the fact that the browser displays it as Text or HTML

xhr.send();

products.open('GET','https://supersimplebackend.dev/products')
products.send();