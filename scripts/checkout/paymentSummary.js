import { calcTotalCartQuantity, cart } from "../../data/cart.js";
import { findDeliveryOption } from "../../data/deliveryOptions.js";
import { findMatchingItem } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPrice = 0;
    let shippingPrice = 0;

    cart.forEach((carItem)=>{
        const product = findMatchingItem(carItem.productId);
        productPrice += product.price * carItem.quantity;

        const deliveryOption = findDeliveryOption(carItem.deliveryOptionId);
        shippingPrice += deliveryOption.price;
    });

    // console.log(productPrice);
    // console.log(shippingPrice);

    const totalBeforeTax = shippingPrice + productPrice;
    const tax = totalBeforeTax * 0.1;
    const totalPrice = totalBeforeTax + tax;

    const paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${calcTotalCartQuantity()}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
    `

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
}