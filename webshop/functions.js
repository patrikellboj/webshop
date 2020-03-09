class CupcakeInCart {
  constructor(name, price, amount) {
      this.name = name;
      this.price = price;
      this.amount = amount;
  }
}
// Array that will contain items in cart
let cart = [];
document.addEventListener('DOMContentLoaded', () => {
  fetch('./cupcakes.json')
      .then(response => response.json())
      .then(data => displayProducts(data))
      .catch(err => console.log(err));
});
document.querySelector('#buyBtn').addEventListener('click', function(){
  console.log('buy btn clicked');
  // skicka items till local storage, samt visa nästa vy 'beställningar'
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("cart"))); // log test att se om vi kan dra ut rätt
  
  // empty cart when you buy
  cart = [];
  displayItemsInCart();
  
})
function displayProducts(data) {
  console.log(data);
  let productPage = document.querySelector('#products-page');
  data.forEach(cupcake => {
      productPage.innerHTML += `  <div class="card mt-3">
                                          <div class="card-body">
                                              <h5 class="card-title">${cupcake.name}</h5>
                                              <div class="float-right">
                                                  <p class="card-text">Price: <span>${cupcake.price}</span> kr</p>
                                                  <label for="cupcakeNo">Amount:</label>
                                                  <input type="number" id="cupcakeNo" value="1" min="1" max="10">
                                                  <br/>
                                                  <button class="btn btn-success addToCartBtn">Add To Cart</button>
                                              </div>
                                          </div>
                                      </div>`
  });
  let btns = document.querySelectorAll('.addToCartBtn');
  btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
          let name = this.parentNode.parentNode.firstElementChild.innerHTML;
          let price = parseInt(this.parentNode.firstElementChild.firstElementChild.innerHTML);
          let amount = parseInt(this.previousElementSibling.value);
          if (cart.some(cupcake => cupcake.name === name)) { // if cupcake already exists in cart
              let currCupcake = cart.find(cupcake => cupcake.name === name);
              currCupcake.amount += amount;
          } else { // if cupcake doesn't exists in cart
              cart.push(new CupcakeInCart(name, price, amount));
          }
          //reset input value to 1
          this.previousElementSibling.value = '1';
          displayItemsInCart();
      });
  })
} // function displayProducts end
function displayItemsInCart() {
  //Print out all items in cart to UI and update total price
  let cartPage = document.querySelector('#cart-page');
  cartPage.innerHTML = '';
  let totalPrice = 0;
  cart.forEach(cupcake => {
      cartPage.innerHTML += `  <div class="card mb-3">
                                          <div class="card-body">
                                              <h5 class="card-title">${cupcake.name}</h5>
                                              <div class="float-right">
                                                  <p class="card-text">
                                                  Amount: <span> ${cupcake.amount} st <br/>
                                                  Price: <span>${cupcake.price * cupcake.amount}</span> kr 
                                                  </p>
                                              </div>
                                          </div>
                                      </div>`
      
      totalPrice += (cupcake.price * cupcake.amount);
  });
  document.querySelector('#cart-total').innerHTML = totalPrice;
}