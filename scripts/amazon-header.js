import { cart } from "../data/cart.js";

export function renderAmazonHeader(){
  const amazonHeaderHTML = `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar search-bar-js" type="text" placeholder="Search">

      <button class="search-button search-button-js">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-total-quantity"> </div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `
  
  document.querySelector('.amazon-header-js')
    .innerHTML = amazonHeaderHTML;

}

export function updateTotalCartQuantity(){
  document.querySelector('.js-cart-total-quantity')
    .innerHTML = cart.calcTotalCartQuantity();
}
