import { renderAmazonHeader , updateTotalCartQuantity } from "./amazon-header.js"
import { orders } from '../data/orders.js';
import { findMatchingItem } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { formatDate } from "./utils/date.js";
import { cart } from "../data/cart.js";
// import { progress } from "./tracking.js";

async function ordersPageRender() {
  renderAmazonHeader();
  updateTotalCartQuantity();
  await loadProductsFetch();
  renderOrders();
}
ordersPageRender();


function isNotDel(delDate){
  const curr = new Date();
  const delivDate = new Date(delDate);
  console.log(delivDate,curr)
  return (delivDate>curr)
}

function renderOrders(){

  let orderContainerHTML = '';
  orders.forEach(order => {

    let productDetail = ``
    order.products.forEach(product => {
      let prod = findMatchingItem(product.productId);
      productDetail +=`
        <div class="product-image-container">
          <img src="${prod.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${prod.name}
          </div>
          <div class="product-delivery-date">
            ${isNotDel(product.estimatedDeliveryTime)? "Arriving" : "Delivered"} on: ${formatDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary buy-again-button-js" data-prod-id="${prod.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&prodId=${prod.id}">
            <!-- Use search params here to navigate like orderId and tracking id-->
              <!-- So that i know which tracking pagto open and for what item -->
            <button class="track-package-button button-secondary track-package-js" data-order-id="${order.id}" data-prod-id="${prod.id}">
              Track package
            </button>
          </a>
        </div>
      `
    })

    orderContainerHTML += `
      <div class="order-container">      
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
            ${productDetail}
        </div>
      </div>
    `
  });

    console.log(orders)
    document.querySelector('.order-container-js').innerHTML = orderContainerHTML;

    const addedMessageTimeouts = {};
    
        function addedAnimation(addedDisplay,productId){
        addedDisplay.innerHTML="✓ Added!";

        const previousTimeoutId = addedMessageTimeouts[productId];
        if(previousTimeoutId){
            clearTimeout(previousTimeoutId)
        }

        const addedDisplayTimeoutId =setTimeout(()=>{
            addedDisplay.innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>`
        },2000);

        addedMessageTimeouts[productId] = addedDisplayTimeoutId;
    }

  document.querySelectorAll('.buy-again-button-js')
    .forEach((butt)=>{
      butt.addEventListener('click',()=>{
        const prodId = butt.dataset.prodId;
        cart.addToCart(prodId,1);
        // renderAmazonHeader();
        updateTotalCartQuantity();
        console.log("Added");
        addedAnimation(butt,prodId);
      })
    })

}