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
        this.saveToLocalStorage();
    }

    updateDeliveryOption(productId, cartDeliveryOptionId){
        const matchingCartItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        matchingCartItem.deliveryOptionId = cartDeliveryOptionId;
        this.saveToLocalStorage();
    }


    loadCartFetch(){
        const cart_promise = fetch('https://supersimplebackend.dev/cart').then((response)=>{
            return response.text();
        }).then((responseJSON)=>{
            console.log(responseJSON);
        })

        return cart_promise;
    }
}

export const cart = new Cart('cart-oop');