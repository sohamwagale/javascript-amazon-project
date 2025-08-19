import { addToCart , cart, loadFromStorage } from "../../data/cart.js";

describe('test suite : Add to cart', ()=>{

    it('adds existing product to the cart ',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        const b4q = cart[0].quantity;
        const selectedQuantity = 2
        const cartLen = cart.length;

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',selectedQuantity);
        expect(cart[0].quantity).toEqual(b4q + selectedQuantity);
        expect(cart.length).toEqual(cartLen);

    });


    it('adds neew product to the cart ',()=>{

        // Required if there are items in the Local storage which they arent in my case
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        // Re-Load the empty cart using above function
        loadFromStorage();

        spyOn(localStorage,'setItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        console.log(cart.length);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    });
})