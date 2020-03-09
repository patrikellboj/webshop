document.addEventListener('DOMContentLoaded', (event) => {
  let productPage = document.querySelector('#products-page');
  let cartPage = document.querySelector('#cart-page');
  let cupcakesObj = {};

  fetch('./cupcakes.json')
      .then(response => response.json())
      .then(saveData)
      .then(data => data.forEach((item, index) => {
          console.log(item);
          productPage.innerHTML += `  <div class="card mt-3">
                                          <div class="card-body">
                                              <h5 class="card-title">${item.name}</h5>
                                              <div class="float-right">
                                                  <p class="card-text">Price: ${item.price} kr</p>
                                                  <label for="exampleFormControlSelect1">Amount:</label>
                                                    <input type="number" id="cupcakeNo${index}" value="1" min="1" max="10">
                                                  <a href="#" class="btn btn-success addToCart" id="${index}">Add To Cart</a>
                                              </div>
                                          </div>
                                      </div>`
      }))
      .catch(err => console.log(err));

      function saveData(dataFromJson) {
        cupcakesObj = dataFromJson;
        return cupcakesObj;
      }


      const cart = {
        items: [],
      };

      function getNumberOfItems () {
        return cart.items.length;
      }

      function getTotalAmount () {
        let totalAmount = 0;
        cart.items.forEach(item => {
            totalAmount += item.price * item.amount;
        });
        return totalAmount;
      }

      function addToCart (item, amount) {
        // TODO: kolla om varan redan finns i varukorgen
        // om den finns -> plussa på amount och lägg inte till en ny
        console.log('addToCart item: ' + item);
        item.amount = amount;
        cart.items.push(item);
        console.log(cart);
        updateCartView();
      }

      function updateCartView () {
        // cartPage.innerHTML = '';
          cart.items.forEach(e => {
            cartPage.innerHTML += `<p>item: ${e.name}. price: ${e.price}. amount: ${e.amount}</p>`
            });
      }

      document.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'A') {
            let amount = document.getElementById('cupcakeNo' + e.target.id).value;
            amount = Number(amount);
            console.log(cupcakesObj[e.target.id]);
            addToCart(cupcakesObj[e.target.id], amount)
        }   
    });

    
  });
