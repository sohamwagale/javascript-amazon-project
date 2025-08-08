export function formatCurrency(price){
    return (Math.round(price)/100).toFixed(2);
}//Shared function used across multiple js files