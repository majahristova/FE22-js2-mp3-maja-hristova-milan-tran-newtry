import anime from "../node_modules/animejs/lib/anime.es.js";


export function getCartItems(){
    const cartItemString = localStorage.getItem('cartItems');
    return  cartItemString? JSON.parse(cartItemString):null; 
}

 export function addToCart(data) {
    const cartItemsString = localStorage.getItem('cartItems')
    if (cartItemsString) {
        const cartItems = JSON.parse(cartItemsString);
        cartItems.push(data)
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        console.log( 'cartItems',cartItems)
        const cartCount = document.getElementById('cart-count');
        const count = parseInt(cartCount.innerText || '1') + 1;
        cartCount.innerText = count;
        anime({
            targets: cartCount,
            scale: [1, 1.5, 1],
            duration: 1000,
            easing: 'easeInOutQuad'
        });
        
    }
    else {
        const cartItems = [data];
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        const cartCount = document.getElementById('cart-count')

        console.log('cartItemsInElse', cartItems);
    }
    const cartImage = document.getElementById('shoppingCartImage');

    cartImage.addEventListener('mouseenter', () => {
      anime({
        targets: cartImage,
        translateY: -50,
        rotate: 360, // add rotate property
        duration: 500,
        easing: 'easeInOutQuad'
      });
    });
    
    cartImage.addEventListener('mouseleave', () => {
      anime({
        targets: cartImage,
        translateY: 0,
        rotate: 0, // reset rotation
        duration: 500,
        easing: 'easeInOutQuad'
      });
    });
}    

// console.log(purchaseBtnfunc());