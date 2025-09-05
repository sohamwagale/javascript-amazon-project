import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";


// import '../data/backend-practice.js';


loadProducts(()=>{
    renderOrderSummary();
    renderCheckoutHeader();
    renderPaymentSummary();
});


