class CupcakeInCart {
  constructor(name, price, amount) {
      this.name = name;
      this.price = price;
      this.amount = amount;
  }
}
let orderList = [];
document.addEventListener('DOMContentLoaded', () => {
  orderList = JSON.parse(localStorage.getItem('cart'));
  let orderPage = document.querySelector('#order-page');
  let totalPriceforOrder = 0;
  orderList.forEach(cupcake => {
      orderPage.innerHTML += `  <div class="card mt-3">
                                          <div class="card-body">
                                              <h5 class="card-title">${cupcake.name}</h5>
                                              <div class="float-right">
                                                  <p class="card-text">Total Price: <span>${cupcake.price * cupcake.amount}</span> kr <br/>
                                                  Amount: ${cupcake.amount}</p>
                                              </div>
                                          </div>
                                      </div>`
      totalPriceforOrder += cupcake.price * cupcake.amount;
  })
  document.querySelector('#total-price').innerHTML = totalPriceforOrder;
});