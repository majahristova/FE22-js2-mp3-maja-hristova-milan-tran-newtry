import { fetchingProducts } from "../firebase.js";
import { addToCart } from "./cart.js";

async function initiateStore(){
try {
  const data = await fetchingProducts();
  console.log(data)
 displayProduct(data)
    
} catch (error) {
    console.log(error)
}}

initiateStore();

function displayProduct(data) {

    const maincontainer = document.querySelector('#plant-container');

    for (let i= 0; i<data.length; i++) {
        // Create elements for product info
        const smallDivForProduct = document.createElement('div');
        smallDivForProduct.classList.add('smalldiv');
        const nameForProduct = document.createElement('h1');
        const priceForProduct = document.createElement('h3');
        const showImage = document.createElement('img');
        const leftInStorage = document.createElement('h5');
        // Create an "Add to cart" button element
        const addToCartButton = document.createElement('button');
        addToCartButton.innerText = 'Add to cart';
        addToCartButton.addEventListener('click', () => {
            // Add the product to the cart
            console.log('Adding product to cart:', data[i]);
            addToCart(data[i]);
            
        });    
        // Attach a click event handler to the button
        // Add the product info and button to the page

       maincontainer.appendChild(smallDivForProduct) 
        smallDivForProduct.appendChild(nameForProduct);
        smallDivForProduct.appendChild(priceForProduct);
        smallDivForProduct.appendChild(showImage);
        smallDivForProduct.appendChild(leftInStorage);
        smallDivForProduct.appendChild(addToCartButton);
        // Set the content of the product info elements
        nameForProduct.innerText = data[i].name;
        priceForProduct.innerText = data[i].price + ' kr';
        showImage.src = data[i].img;
        leftInStorage.innerText = 'Left in storage = ' + data[i].saldo;
          
   
    }    
}    



