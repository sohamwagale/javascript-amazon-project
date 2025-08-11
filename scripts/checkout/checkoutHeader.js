import { calcTotalCartQuantity } from "../../data/cart.js";

export default function renderCheckoutHeader(){
    document.querySelector('.js-header-middle')
        .innerHTML= 
        `
        Checkout (<a class="return-to-home-link js-checkout-items"
            href="amazon.html">${calcTotalCartQuantity()} items</a>)
        `;
}
