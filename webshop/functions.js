document.addEventListener('DOMContentLoaded', (event) => {
  let productPage = document.querySelector('#products-page');
  fetch('./cupcakes.json')
      .then(response => response.json())
      .then(data => data.forEach(ele => {
          productPage.innerHTML += `  <div class="card mt-3">
                                          <div class="card-body">
                                              <h5 class="card-title">${ele.name}</h5>
                                              <div class="float-right">
                                                  <p class="card-text">Price: ${ele.price} kr</p>
                                                  <label for="exampleFormControlSelect1">Example select</label>
                                                  <select class="form-control" id="selector" style="width: 4rem;">
                                                      <option>1</option>
                                                      <option>2</option>
                                                      <option>3</option>
                                                      <option>4</option>
                                                      <option>5</option>
                                                      <option>6</option>
                                                      <option>7</option>
                                                      <option>8</option>
                                                      <option>9</option>
                                                      <option>10</option>
                                                  </select>
                                                  <a href="#" class="btn btn-success addToCart">Add To Cart</a>
                                              </div>
                                          </div>
                                      </div>`
      }))
      .catch(err => console.log(err))
      
      document.querySelector('.addToCart').addEventListener(function(e){
          console.log(e.target);
          
      })
      
  })