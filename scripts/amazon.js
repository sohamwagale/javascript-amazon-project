import {cart} from '../data/cart.js';

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
                src="images/ratings/rating-${product.rating.stars *10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.price /100).toFixed(2)}
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

document.querySelectorAll('.js-add-to-cart')//using for each because we wanna add event listener to all buttons
    .forEach((button)=>{
        button.addEventListener('click',()=>{
            const productId = button.dataset.productId;//the kebab case product-name is converted to camel case productName

            let mathcingItem;

            cart.forEach((item)=>{
                if(item.productId = productId){
                    mathcingItem = item;
                }
            })

            const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
            console.log(selectedQuantity)
            if(mathcingItem){
                mathcingItem.quantity +=selectedQuantity;
            }
            else{
                cart.push({
                    productId:productId,
                    quantity: selectedQuantity
                });
            }

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

            let cartTotalQuantity = 0;
            cart.forEach((item)=>{
                cartTotalQuantity += item.quantity;
            })

            document.querySelector('.js-cart-total-quantity')
                .innerHTML = cartTotalQuantity;

            console.log(cartTotalQuantity);
            //console.log(cart.q)
        })
    })