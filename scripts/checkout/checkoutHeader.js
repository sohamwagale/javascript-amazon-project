// import { calcTotalCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";

export default function renderCheckoutHeader(){
    document.querySelector('.js-header-middle')
        .innerHTML= 
        `
        Checkout (<a class="return-to-home-link js-checkout-items"
            href="amazon.html">${cart.calcTotalCartQuantity()} items</a>)
        `;
}
