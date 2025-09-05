export function formatCurrency(priceCents){
    return (Math.round(priceCents)/100).toFixed(2);
}//Shared function used across multiple js files