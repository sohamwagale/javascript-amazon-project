import { cart, removeFromCart, calcTotalCartQuantity, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let orderSummaryHTML = ``;
const orderSummary =  document.querySelector('.js-order-summary');

function findMatchingItem(productId){
    return products.find(product => product.id === productId);
}

//Generates the HTML for all cart items.
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
                Quantity: <span class="quantity-label js-cart-quantity-label-${productId}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${productId}">
                Update
                </span>
                <input class = "quantity-input js-quantity-input js-quantity-input-${productId}" type = 'number' min = '0' max = '1000'  value = '${cartItem.quantity}' data-product-id = '${productId}'>
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


//Update checkout Items function
function updateCheckoutItemsTotal(){
    document.querySelector('.js-checkout-items')
        .innerHTML = `${calcTotalCartQuantity()} items`;
}
updateCheckoutItemsTotal(); //Call it once when the page is loaded


//Delete Cart Items
function deleteCartItems(currProductId){
    removeFromCart(currProductId);
    const deleteProductHTML = document.querySelector(
        `.js-cart-item-container-${currProductId}`
    );
    deleteProductHTML.remove();
    updateCheckoutItemsTotal();
}

//Link to delete items
document.querySelectorAll('.js-delete-link')
    .forEach((linkButton)=>{
        linkButton.addEventListener('click',()=>{
            const currProductId = linkButton.dataset.productId;
            deleteCartItems(currProductId);
        })
    });

//When clicked of Update link
document.querySelectorAll('.js-update-quantity-link')
    .forEach((quantityUpdateLink)=>{
        quantityUpdateLink.addEventListener('click',()=>{
            const currProductId = quantityUpdateLink.dataset.productId;

            document.querySelector(`.js-cart-item-container-${currProductId}`)
                .classList.add('is-editing-quantity');
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
        updateQuantity(currProductId,newQuantity);
        updateCheckoutItemsTotal();
        document.querySelector(`.js-cart-quantity-label-${currProductId}`).innerHTML = newQuantity;
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
            }
        })
    })

