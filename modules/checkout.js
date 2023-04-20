import { getCartItems } from "./cart.js";
import { baseUrl } from "../firebase.js";



export function renderSingleCartItem(cartItem){
    console.log(`renderOneCartItem`, cartItem);
    const div = document.querySelector("#checkoutContainer")
    const nameForProduct = document.createElement('h1');
    div.append(nameForProduct);
    nameForProduct.innerText = cartItem.name;

    const priceForProduct = document.createElement('h3');
    div.append(priceForProduct);
    priceForProduct.innerText = cartItem.price +'kr';

}

function renderCartItems(){
    const cartItems = getCartItems();

    if(!cartItems){
        return;
    }
    let totalPrice = 0;
    for(let i = 0; i<cartItems.length; i++){
        let currentCartItem = cartItems[i];
        renderSingleCartItem(currentCartItem);
        totalPrice += parseInt(currentCartItem.price);
    }

    const totalElement = document.createElement('h3');
    totalElement.innerText = `Total Price: ${totalPrice} kr`;
    document.querySelector("#checkoutContainer").appendChild(totalElement);
   
    const clearCartButton = document.createElement('button');
    clearCartButton.innerText = 'Clear Cart';
    clearCartButton.addEventListener('click', function clearCart(){
        localStorage.removeItem('cartItems');
        const checkoutContainer = document.querySelector("#checkoutContainer");
        checkoutContainer.innerHTML = "";
        const totalElement = document.createElement('h3');
        totalElement.innerText = `Total Price: 0 kr`;
        checkoutContainer.appendChild(totalElement);
      
      }
      );

    document.querySelector("#checkoutContainer").appendChild(clearCartButton);
}

renderCartItems();

function getTotal(){
    const cartItems = getCartItems();
    if(!cartItems){
      return;
    }
    let temp = cartItems.map(function(cartItem){
      return parseInt(cartItem.price);
    });
    let sum = temp.reduce(function(prev, next){
      return prev + next;
    }, 0);
    console.log(sum);
  }
getTotal();  

 


const purchaseButton = document.querySelector("#purchase-btn")
purchaseButton.addEventListener('click',onPurchaseButtonClicked)


async function onPurchaseButtonClicked(){

  const cartItemString = localStorage.getItem('cartItems');
  
 if(cartItemString ){
    const cartItems = JSON.parse(cartItemString)
    for(let i=0; i<cartItems.length; i++){
      const news = cartItems[i]
      const newdata = await updatePurchaseItems(news);

    }
 }

 setTimeout(() => {
  alert('it has been purchased ');
  localStorage.removeItem('cartItems');
  location.href ="./index.html";


}, 4000 )


}


async function updatePurchaseItems(news) {
  try {
      
          const firstItem = {
           ...news,
            saldo: news.saldo,
          }
      
      const newUrl = `${baseUrl}productinfo/${firstItem.id}.json`;
          const response = await fetch(newUrl);
          const dataInStock = await response.json();
          const currentInStock = dataInStock.saldo;
          const amount = 1
          const resultInStock = currentInStock - amount;
          console.log(currentInStock)
          console.log(resultInStock)


          if(currentInStock < 0){
            alert('there is no products')
          }

          let object ={
            method: 'PATCH',
                body: JSON.stringify({saldo: resultInStock}),
                headers: {
                    'Content-Type': 'application/json'
          }
        }
            await fetch(newUrl,object)

  }catch (error) {
      console.log(error)
  }}






