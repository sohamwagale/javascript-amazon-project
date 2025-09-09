import { cart } from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';
import { renderAmazonHeader , updateTotalCartQuantity } from './amazon-header.js';

loadProductsFetch().then(()=>{
    renderAmazonHeader();
    renderProductsGrid();
})

function renderProductsGrid(){
    let prodHTML = '';

    const url = new URL(window.location.href)
    const srchQry = url.searchParams.get('searchQuery');
    console.log(srchQry)

    const searchBar = document.querySelector('.search-bar-js')
    if(srchQry){
        searchBar.value = srchQry;
    }

    let filteredProds = products
    if(srchQry){
        filteredProds = products.filter((product)=>{
        let matchingKeyword = false;
        product.keywords.forEach((keyword) => {
            if (keyword.toLowerCase().includes(srchQry.toLowerCase())) {
                matchingKeyword = true;
            }
        });

        return matchingKeyword ||
            product.name.toLowerCase().includes(srchQry.toLowerCase());        })
    }

    filteredProds.forEach((product)=>{
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
        if(previousTimeoutId){
            clearTimeout(previousTimeoutId)
        }

        const addedDisplayTimeoutId =setTimeout(()=>{
            addedDisplay.classList.remove('added-to-cart-visible');
        },2000);

        addedMessageTimeouts[productId] = addedDisplayTimeoutId;
    }

    updateTotalCartQuantity();

    document.querySelectorAll('.js-add-to-cart')
        .forEach((button)=>{
            button.addEventListener('click',()=>{
                const productId = button.dataset.productId;
                const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

                cart.addToCart(productId,selectedQuantity);
                addedAnimation(productId);    
                updateTotalCartQuantity();
            })
        });


    document.querySelector('.search-button-js')
        .addEventListener('click',()=>{
            const searchQuery = document.querySelector('.search-bar-js').value;
            console.log(searchQuery);
            open(`./index.html?searchQuery=${searchQuery}`,'_self')
        });

    document.querySelector('.search-bar-js')
        .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const searchQuery = event.target.value;
                console.log(searchQuery);
                open(`./index.html?searchQuery=${searchQuery}`, '_self');
            }
        });
}
