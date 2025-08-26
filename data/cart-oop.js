function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },

        saveToLocalStorage(){
            localStorage.setItem(localStorageKey,JSON.stringify(cart.cartItems));
        },

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
        },

        removeFromCart(productId){
            this.cartItems = this.cartItems.filter(item => item.productId !== productId);
            this.saveToLocalStorage();
        },

        calcTotalCartQuantity(){
            let cartTotalQuantity = 0;
            this.cartItems.forEach((cartItem)=>{
                cartTotalQuantity += cartItem.quantity;
            });

            return cartTotalQuantity;
        },

        updateQuantity(productId,newQuantity){
            const product = this.cartItems.find(item => item.productId === productId);
            if(product){
                product.quantity = newQuantity;
            }
            //console.log('Updated cart:', cart);
            this.saveToLocalStorage();
        },

        updateDeliveryOption(productId, cartDeliveryOptionId){
            const matchingCartItem = this.cartItems.find(cartItem => cartItem.productId === productId);
            matchingCartItem.deliveryOptionId = cartDeliveryOptionId;
            this.saveToLocalStorage();
        }
    };

    return cart;
}


const cart  = Cart('cart-oop');
const businessCart  = Cart('cart-business')

cart.loadFromStorage();

cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",2)
console.log(cart.cartItems)

// const businessCart = {
//     cartItems: undefined,

//     loadFromStorage(){
//         this.cartItems = JSON.parse(localStorage.getItem('cart-business')) || [];
//     },

//     saveToLocalStorage(){
//         localStorage.setItem('cart-business',JSON.stringify(cart.cartItems));
//     },

//     addToCart(productId,selectedQuantity){
//         let matchingItem;

//         this.cartItems.forEach((cartItem)=>{
//             if(cartItem.productId === productId){
//                 matchingItem = cartItem;
//             }
//         })

//         // const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

//         if(matchingItem){
//             matchingItem.quantity +=selectedQuantity;
//         }
//         else{
//             this.cartItems.push({
//                 productId: productId,
//                 quantity: selectedQuantity,
//                 deliveryOptionId : '1'
//             });
//         }

//         this.saveToLocalStorage();
//     },

//     removeFromCart(productId){
//         this.cartItems = this.cartItems.filter(item => item.productId !== productId);
//         this.saveToLocalStorage();
//     },

//     calcTotalCartQuantity(){
//         let cartTotalQuantity = 0;
//         this.cartItems.forEach((cartItem)=>{
//             cartTotalQuantity += cartItem.quantity;
//         });

//         return cartTotalQuantity;
//     },

//     updateQuantity(productId,newQuantity){
//         const product = this.cartItems.find(item => item.productId === productId);
//         if(product){
//             product.quantity = newQuantity;
//         }
//         //console.log('Updated cart:', cart);
//         this.saveToLocalStorage();
//     },

//     updateDeliveryOption(productId, cartDeliveryOptionId){
//         const matchingCartItem = this.cartItems.find(cartItem => cartItem.productId === productId);
//         matchingCartItem.deliveryOptionId = cartDeliveryOptionId;
//         this.saveToLocalStorage();
//     }
// };

// businessCart.loadFromStorage();
// businessCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",20)
// console.log(businessCart.cartItems)

