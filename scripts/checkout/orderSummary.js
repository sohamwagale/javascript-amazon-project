//import { cart, removeFromCart, calcTotalCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";
import { deliveryOptions, findDeliveryOption ,calcDeliveryDate } from "../../data/deliveryOptions.js";
import { findMatchingItem, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from '../checkout/checkoutHeader.js'
//To use namedExport or default export is in the hands of the library maker

export function renderOrderSummary(){

    let orderSummaryHTML = ``;
    const orderSummary =  document.querySelector('.js-order-summary');

    //Generates the HTML for all cart items.
    cart.cartItems.forEach((cartItem)=>{

        const productId = cartItem.productId;
        const matchingItem = findMatchingItem(productId);
        
        //matchingItem.id === productId

        //console.log(matchingItem);

        //Delivery Date Selection
        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = findDeliveryOption(deliveryOptionId);

        
        const dateString = calcDeliveryDate(deliveryOption); 

        orderSummaryHTML += 
        `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingItem.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingItem.name}
                </div>
                <div class="product-price">
                    ${matchingItem.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${productId}">
                    <span>
                    Quantity: <span class="quantity-label js-cart-quantity-label-${productId}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${productId}">
                    Update
                    </span>
                    <input class = "quantity-input js-quantity-input js-quantity-input-${productId}" type = 'number' min = '0' max = '1000'  value = '${cartItem.quantity}' data-product-id = '${productId}'>
                    <span class = "link-primary save-quantity-link js-save-quantity-link" data-product-id = '${productId}'>
                    Save
                    </span>
                    <span class="delete-quantity-link js-delete-link-${productId} link-primary js-delete-link" data-product-id=${productId/*matchingItem.id*/}>
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(productId,cartItem)}   
                </div>
            </div>
        </div>
        `;
    });

    function deliveryOptionsHTML(productId,cartItem){
        let html = ``;

        deliveryOptions.forEach((deliveryOption)=>{
            const dateString =  calcDeliveryDate(deliveryOption);

            const priceString = deliveryOption.price === 0
                ? 'Free'
                : `$${formatCurrency(deliveryOption.price)} -`;


            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html +=
            `
            <div class="delivery-option js-delivery-option" 
                data-delivery-option-id ='${deliveryOption.id}' 
                data-product-id = '${productId}'>

                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}"
                ${isChecked ? 'checked' : ''}>
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `
        });
        return html;
    }

    orderSummary.innerHTML = orderSummaryHTML;


    //Update checkout Items function
    // function updateCheckoutItemsTotal(){
    //     document.querySelector('.js-checkout-items')
    //         .innerHTML = `${calcTotalCartQuantity()} items`;
    // }
    // renderCheckoutHeader();
    //updateCheckoutItemsTotal(); //Call it once when the page is loaded


    //Delete Cart Items
    function deleteCartItems(currProductId){
        cart.removeFromCart(currProductId);
        // const deleteProductHTML = document.querySelector(
        //     `.js-cart-item-container-${currProductId}`
        // );
        // deleteProductHTML.remove();
        renderOrderSummary();
        // updateCheckoutItemsTotal();
    }

    //Link to delete items
    document.querySelectorAll('.js-delete-link')
        .forEach((linkButton)=>{
            linkButton.addEventListener('click',()=>{
                const currProductId = linkButton.dataset.productId;
                deleteCartItems(currProductId);
                renderPaymentSummary();
                renderCheckoutHeader();
            })
        });

    //When clicked of Update link
    document.querySelectorAll('.js-update-quantity-link')
        .forEach((quantityUpdateLink)=>{
            quantityUpdateLink.addEventListener('click',()=>{
                const currProductId = quantityUpdateLink.dataset.productId;

                document.querySelector(`.js-cart-item-container-${currProductId}`)
                    .classList.add('is-editing-quantity');

                // renderPaymentSummary();
            }); 
        });


    //dataset used to get which element or button was clicked (READ)
    //whereas class = '{productId}' used to target a specific element (WRITE)


    //To handle and changes in Quantity
    function handleSaveQuantity(currProductId){
        document.querySelector(`.js-cart-item-container-${currProductId}`)
            .classList.remove('is-editing-quantity');

        const newQuantity = Number(document.querySelector(`.js-quantity-input-${currProductId}`).value);

        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        else if(newQuantity === 0){
            deleteCartItems(currProductId);
        }
        else{
            cart.updateQuantity(currProductId,newQuantity);
            renderOrderSummary();
            renderPaymentSummary();
            renderCheckoutHeader();
            // updateCheckoutItemsTotal();
            // document.querySelector(`.js-cart-quantity-label-${currProductId}`).innerHTML = newQuantity;
        } 
    }

    //Handle the change after clicking SAVE
    document.querySelectorAll('.js-save-quantity-link')
        .forEach((saveLinkBtn)=>{
            saveLinkBtn.addEventListener('click',()=>{
                const currProductId = saveLinkBtn.dataset.productId;
                handleSaveQuantity(currProductId);   
            })
        })

    //Handle the change after clicking ENTER
    document.querySelectorAll('.js-quantity-input')
        .forEach((inputArea)=>{
            inputArea.addEventListener('keydown',(event)=>{
                if(event.key === "Enter"){
                    const productId = inputArea.dataset.productId;
                    handleSaveQuantity(productId);
                    renderPaymentSummary();
                }
            })
        })

    //Event Listener For the Radio Buttons
    document.querySelectorAll('.js-delivery-option')
        .forEach((deliveryOptionBtn)=>{
            deliveryOptionBtn.addEventListener('click',()=>{
                const deliveryOptionId = deliveryOptionBtn.dataset.deliveryOptionId;
                const productId = deliveryOptionBtn.dataset.productId;
                cart.updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

};

//MVC Model-> View -> Controller -> Model