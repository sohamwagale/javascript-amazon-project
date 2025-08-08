export let cart = JSON.parse(localStorage.getItem('cart')) || [
    
];

function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

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