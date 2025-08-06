export let cart = [
    {
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 3
    },
    {
        productId : '54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity : 3
    }
];

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(cartItem.productId = productId){
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
            quantity: selectedQuantity
        });
    }
};

export function removeFromCart(productId){
    let matchingItemForDelete;
    cart.forEach((product)=>{
        if(product.productId === productId){
            matchingItemForDelete = product;
        }
    });
    cart = cart.filter(item => item !== matchingItemForDelete);
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