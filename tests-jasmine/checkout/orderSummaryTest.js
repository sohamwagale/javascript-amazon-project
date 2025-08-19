import { loadFromStorage } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary',()=>{

    const prodId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: prodId,
                quantity : 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays the cart',()=>{

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-product-quantity-${prodId}`).innerText
        ).toContain('Quantity: 1');

        //Hide the HTML again
        //Using afterEach
    });


    it('removes the product', ()=>{{
        // Never modify localStorage so always mock it using spyOn and call Fake

        document.querySelector(`.js-delete-link-${prodId}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(0);
    }});
});