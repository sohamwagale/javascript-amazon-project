import { cart } from "../../data/cart.js";
import { findDeliveryOption } from "../../data/deliveryOptions.js";
import { findMatchingItem } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productpriceCents = 0;
    let shippingpriceCents = 0;

    cart.cartItems.forEach((carItem)=>{
        const product = findMatchingItem(carItem.productId);
        productpriceCents += product.priceCents * carItem.quantity;

        const deliveryOption = findDeliveryOption(carItem.deliveryOptionId);
        shippingpriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTax = shippingpriceCents + productpriceCents;
    const tax = totalBeforeTax * 0.1;
    const totalpriceCents = totalBeforeTax + tax;

    const paymentSummaryHTML = 
    `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cart.calcTotalCartQuantity()}):</div>
    <div class="payment-summary-money">$${formatCurrency(productpriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingpriceCents)}</div>
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
    <div class="payment-summary-money">$${formatCurrency(totalpriceCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-button">
    Place your order
    </button>
    `

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-button')
        .addEventListener('click',async ()=>{

            try {
                const response = await fetch('https://supersimplebackend.dev/orders',{
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart
                    })
                });
                
                const order  = await response.json()
                console.log(order);

                addOrder(order);

            } catch (error) {
                console.log('Unexpected error')
            }

            window.location.href = 'orders.html'
            
        })
}