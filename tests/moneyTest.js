import {formatCurrency} from '../scripts/utils/money.js'

console.log(formatCurrency(2095)==='20.95')
console.log(formatCurrency(0)==='0.00')
console.log(formatCurrency(2000.5)==='20.01')
