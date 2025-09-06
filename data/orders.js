export const orders = JSON.parse(localStorage.getItem('order')) || []

export function addOrder(order){
    orders.unshift(order);
    saveToStorage(orders);
}

function saveToStorage(orders){
    localStorage.setItem('order',JSON.stringify(orders))
}