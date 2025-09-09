import { formatCurrency } from "../scripts/utils/money.js";

export function findMatchingItem(productId){
  return products.find(product => product.id === productId);
}

class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars *10}.png`
  }

  getpriceCents(){
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML(){
    return ``
  }
}

class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target = "_blank">Size Chart</a>
    `
  }
}

export let products = []

export async function loadProductsFetch(){
  try {
    const response = await fetch('https://supersimplebackend.dev/products')
    products = await response.json()
    products = products.map((productDetails)=>{
      if(productDetails.type === 'clothing')
        return new Clothing(productDetails);
      return new Product(productDetails);
      });
    return products;

  } catch (error) {
    console.log("Error is :",error.message)
  }
}