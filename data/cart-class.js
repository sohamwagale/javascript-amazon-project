class Cart {

    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }
    
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToLocalStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(productId,selectedQuantity){
        let matchingItem;

        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        })

        // const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        if(matchingItem){
            matchingItem.quantity +=selectedQuantity;
        }
        else{
            this.cartItems.push({
                productId: productId,
                quantity: selectedQuantity,
                deliveryOptionId : '1'
            });
        }

        this.saveToLocalStorage();
    }

    removeFromCart(productId){
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.saveToLocalStorage();
    }

    calcTotalCartQuantity(){
        let cartTotalQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
            cartTotalQuantity += cartItem.quantity;
        });

        return cartTotalQuantity;
    }

    updateQuantity(productId,newQuantity){
        const product = this.cartItems.find(item => item.productId === productId);
        if(product){
            product.quantity = newQuantity;
        }
        //console.log('Updated cart:', cart);
        this.saveToLocalStorage();
    }

    updateDeliveryOption(productId, cartDeliveryOptionId){
        const matchingCartItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        matchingCartItem.deliveryOptionId = cartDeliveryOptionId;
        this.saveToLocalStorage();
    }

}

const cart = new Cart('cart-oop');
// cart.localStorageKey = 'cart-oop'

const businessCart = new Cart('cart-busines');
// businessCart.localStorageKey = 'cart-business'

// const cart  = Cart('cart-oop');
// const businessCart  = Cart('cart-business')

// cart.loadFromStorage();
// businessCart.loadFromStorage();

cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",2)
console.log(cart.cartItems)

console.log(businessCart instanceof Cart);