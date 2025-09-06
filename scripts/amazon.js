//import {cart, addToCart ,calcTotalCartQuantity} from '../data/cart.js';
import { cart } from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/money.js';


/**
 * import * as cartModule from '../data/cart.js';
 * 
 * cartModule.cart
 * cartModule.addToCart('id');
 */

loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let prodHTML = '';
    products.forEach((product)=>{
        prodHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-priceCents">
                    ${product.getpriceCents()}
                </div>

                <div class="product-quantity-container">
                    <select class = "js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}
                

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = '${product.id}'>
                    Add to Cart
                </button>
            </div>`
    });
    const productsElement = document.querySelector(".js-products-grid");
    productsElement.innerHTML = prodHTML;


    const addedMessageTimeouts = {};

    function addedAnimation(productId){
        const addedDisplay = document.querySelector(`.js-added-to-cart-${productId}`);
        addedDisplay.classList.add('added-to-cart-visible');

        const previousTimeoutId = addedMessageTimeouts[productId];
        //hya productId che kahi previous timeouts asle tar te clear karayche
        if(previousTimeoutId){
            clearTimeout(previousTimeoutId)
        }

        const addedDisplayTimeoutId =setTimeout(()=>{
            addedDisplay.classList.remove('added-to-cart-visible');
        },2000);

        addedMessageTimeouts[productId] = addedDisplayTimeoutId;
        //nantar tyach productId la navin timeoutId assign karaycha override karun
    }


    function updateTotalCartQuantity(){
        document.querySelector('.js-cart-total-quantity')
            .innerHTML = cart.calcTotalCartQuantity();
    }

    updateTotalCartQuantity();

    document.querySelectorAll('.js-add-to-cart')//using for each because we wanna add event listener to all buttons
        .forEach((button)=>{
            button.addEventListener('click',()=>{
                const productId = button.dataset.productId;//the kebab case product-name is converted to camel case productName

                const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
                cart.addToCart(productId,selectedQuantity);
                // addToCart(productId);

                // console.log(cart);

                addedAnimation(productId);    

                updateTotalCartQuantity();
            })
        });
}