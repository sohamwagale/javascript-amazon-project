export let cart;

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

loadFromStorage();


function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,selectedQuantity){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    // const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    if(matchingItem){
        matchingItem.quantity +=selectedQuantity;
    }
    else{
        cart.push({
            productId: productId,
            quantity: selectedQuantity,
            deliveryOptionId : '1'
        });
    }

    saveToLocalStorage();
};

export function removeFromCart(productId){
    cart = cart.filter(item => item.productId !== productId);

    saveToLocalStorage();
}

/*export function removeFromCart(productIdForDelete){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productIdForDelete){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}*/

export function calcTotalCartQuantity(){
    let cartTotalQuantity = 0;
    cart.forEach((cartItem)=>{
        cartTotalQuantity += cartItem.quantity;
    });

    return cartTotalQuantity;
}

export function updateQuantity(productId,newQuantity){
    const product = cart.find(item => item.productId === productId);
    if(product){
        product.quantity = newQuantity;
    }
    //console.log('Updated cart:', cart);
    saveToLocalStorage();
};


export function updateDeliveryOption(productId, cartDeliveryOptionId){
    const matchingCartItem = cart.find(cartItem => cartItem.productId === productId);
    // let matchingItem;
    // cart.forEach((cartItem)=>{
    //     if(cartItem.productId === productId){
    //         matchingItem = cartItem;
    //     }
    // })
    matchingCartItem.deliveryOptionId = cartDeliveryOptionId;
    saveToLocalStorage();
}

// export function loadCart(fun){
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load',()=>{
//     console.log(xhr.response);
//     fun();
//   })

//   xhr.open('GET','https://supersimplebackend.dev/cart');
//   xhr.send();
// }

export function loadCartFetch(){
    const cart_promise = fetch('https://supersimplebackend.dev/cart').then((response)=>{
        return response.text();
    }).then((responseJSON)=>{
        console.log(responseJSON);
    })

    return cart_promise;
}