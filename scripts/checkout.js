import { cart, removeFromCart, calcTotalCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let orderSummaryHTML = ``;
const orderSummary =  document.querySelector('.js-order-summary');

function findMatchingItem(productId){
    return products.find(product => product.id === productId);
}

cart.forEach((cartItem)=>{

    const productId = cartItem.productId;

    const matchingItem = findMatchingItem(productId);
    
    //matchingItem.id === productId

    //console.log(matchingItem);

    orderSummaryHTML += 
    `
    <div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingItem.price)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${productId}">
                Update
                </span>
                <input class = "quantity-input js-quantity-input-${productId}" type = 'number' min = '1'>
                <span class = "link-primary save-quantity-link js-save-quantity-link" data-product-id = '${productId}'>
                Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${productId/*matchingItem.id*/}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
});

orderSummary.innerHTML = orderSummaryHTML;

//console.log(orderSummaryHTML);

function updateCheckoutItemsTotal(){
    document.querySelector('.js-checkout-items')
        .innerHTML = `${calcTotalCartQuantity()} items`;
}

updateCheckoutItemsTotal();

document.querySelectorAll('.js-delete-link')
    .forEach((linkButton)=>{
        linkButton.addEventListener('click',()=>{
            const currProductId = linkButton.dataset.productId;
            //console.log(currProductId);
            removeFromCart(currProductId);
            //console.log(cart)
            const deleteProductHTML = document.querySelector(
                `.js-cart-item-container-${currProductId}`
            );
            //console.log(deleteProductHTML);
            deleteProductHTML.remove();
            updateCheckoutItemsTotal();
        })
    });

document.querySelectorAll('.js-update-quantity-link')
    .forEach((quantityUpdateLink)=>{
        quantityUpdateLink.addEventListener('click',()=>{
            const currProductId = quantityUpdateLink.dataset.productId;
            console.log(currProductId);

            document.querySelector(`.js-cart-item-container-${currProductId}`)
                .classList.add('is-editing-quantity');

        }) 
    })

document.querySelectorAll('.js-save-quantity-link')
    .forEach((saveLinkBtn)=>{
        saveLinkBtn.addEventListener('click',()=>{
            const currProductId = saveLinkBtn.dataset.productId;
            console.log(currProductId);

            document.querySelector(`.js-cart-item-container-${currProductId}`)
                .classList.remove('is-editing-quantity');

            const inputQnty = Number(document.querySelector(`.js-quantity-input-${currProductId}`).value);
            console.log(inputQnty);
            

            updateCheckoutItemsTotal();
        })
    })

