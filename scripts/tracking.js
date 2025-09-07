import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { findMatchingItem, loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader, updateTotalCartQuantity } from "./amazon-header.js";
import { formatDateMod } from "./utils/date.js";


renderAmazonHeader();
updateTotalCartQuantity();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const prodId = url.searchParams.get('prodId');


async function loadProducts() {
    await loadProductsFetch();
    const productProd = findMatchingItem(prodId);

    document.querySelector('.product-info-js')
        .innerHTML = `${productProd.name}`


    document.querySelector('.product-image-js')
        .innerHTML = `<img class="product-image" src="${productProd.image}">`
}
loadProducts();

let orderProd;
let orderOrd;
orders.forEach(order => {
    if(order.id === orderId){
        orderOrd = order;
        order.products.forEach((product)=>{
            if(product.productId === prodId){
                orderProd = product;
            }
        })
    }
});

document.querySelector('.delivery-date-js')
    .innerHTML = `Arriving on ${formatDateMod(orderProd.estimatedDeliveryTime)}`;

document.querySelector('.product-quantity-js')
    .innerHTML = `Quantity: ${orderProd.quantity}`


function calcPer() {
    const currTime = new Date();
    const orderTime = new Date(orderOrd.orderTime); // convert ISO string → Date
    const deliveryTime = new Date(orderProd.estimatedDeliveryTime);
    return (currTime - orderTime) / (deliveryTime - orderTime)*100;
}

const progress = calcPer();
document.querySelector('.progress-bar').style.width = progress + '%';


let currentStatus = '';
if (progress > 0 && progress < 50) {
  currentStatus = 'Preparing';
} else if (progress >= 50 && progress < 100) {
  currentStatus = 'Shipped';
} else {
  currentStatus = 'Delivered';
}

document.querySelectorAll('.progress-label').forEach(label => {
  label.classList.toggle('current-status', label.dataset.status === currentStatus);
});
