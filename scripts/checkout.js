import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";



// import '../data/backend-practice.js';

/*
new Promise(()=>{
    console.log("Prosime has Started");
    loadProducts((resolve)=>{ // resolve is a function that is passed as a parameter to goto next step
        console.log('Loading has finished'); // This step occurss at the end of 'load' event happening 
        resolve(); //Only after the resolve is called the next step is executed
    })
}).then(()=>{
    console.log("Promise resolved, This is the next step");
})
*/


Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value 1');
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value 2');
        })
    })

]).then((values_array)=>{
    console.log(values_array);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})



// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('Value 1');// Whateverwe give to resolve is gonna be saved for next 'Then' parameter
//     });
// }).then((value_1)=>{
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve(); // It wont move to the next step unless the resolve function is called
//             console.log(value_1)
//         });
//     });
// }).then(()=>{
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// })





/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
    })
});
// Wait for the loadProducts to finish as the funciton passed is execute at the end
// then wait for the loadcart to to finish for the same above reason
// then the render functions are called
*/
