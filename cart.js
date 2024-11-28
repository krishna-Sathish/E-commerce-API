let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("productdata")) || [];

let calculate = () => {
  let cartIcon = document.getElementById("cart-amount");
  cartIcon.innerHTML = `<i class="fa-solid fa-cart-shopping me-2"></i>Cart (${basket.length})`;
};

let totalProducts = basket.length;
let totalCost = basket.reduce((total, product) => total + product.price, 0);

let generateCart = () => {
  if (basket.length !== 0) {
    totalProducts = basket.length;
    totalCost = basket.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );

    shoppingCart.innerHTML = basket
      .map((products) => {
        let { title, price, img } = products;
        price = parseFloat(price);

        return `
        <div class="justify-content-between">
          <div class="d-flex justify-content-center align-items-center border border-subtle p-5">
            <div>
              <img src="${img}" alt="product" class="Images">
            </div>
            <div>
              <p class="title ms-5">${title}</p>
            </div>
<div>
  <button class="btn btn-danger mx-3" onclick="decreaseNumber('quantity-input-0', 'itemprice-0', 0)">-</button>
  <input type="number" id="quantity-input-0" value="1" min="1" class="cart-input">
  <button class="btn btn-success mx-3" onclick="increaseNumber('quantity-input-0', 'itemprice-0', 0)">+</button>
  <span id="quantity-display-0" class="text-center">1</span> x $<span id="itemprice-0" data-price="50.00">50.00</span>
</div>

          </div>
        </div>`;
      })
      .join("");

    shoppingCart.innerHTML += `
      <div class="mt-5 p-4 border border-dark rounded align-self-start">
        <h2 class="h2 text-center">Order Summary</h2>
        <p class="fs-5 mb-2 order-summary-total-products">Total Products: <span>${totalProducts}</span></p>
        <p class="fs-5 mb-2">Shipping: $30</p>
        <p class="fs-5 mb-4 order-summary-total-amount">Total amount: $<span>${(
          totalCost + 30
        ).toFixed(2)}</span></p>
        <button class="btn bg-dark text-white">Go to Checkout</button>
      </div>`;
  } else {
    shoppingCart.innerHTML = `
      <p class="text-center">Your cart is empty</p>
      <button class="btn btn-secondary continue-shopping" onclick="myIndex()">Continue Shopping</button>`;
  }
};

function myIndex() {
  window.location.assign("index.html");
}
function myLogin() {
  window.location.assign("login.html");
}
function myRegister() {
  window.location.assign("register.html");
}


const decreaseNumber = (quantityInputId, productPriceId, productIndex) => {
  let quantityInput = document.getElementById(quantityInputId);
  let productPrice = document.getElementById(productPriceId);
  let quantityDisplay = document.getElementById(
    `quantity-display-${productIndex}`
  );
  let price = parseFloat(productPrice.getAttribute("data-price"));

  if (quantityInput.value > 0) {
    quantityInput.value = parseInt(quantityInput.value) - 1;

    quantityDisplay.innerText = quantityInput.value;
    productPrice.innerText = (price * quantityInput.value).toFixed(2);

    totalProducts--;
    totalCost -= price;

    if (quantityInput.value == 0) {
      basket.splice(productIndex, 1);
      localStorage.setItem("productdata", JSON.stringify(basket));
      generateCart();
    }

    updateOrderSummary();
  }
};

const increaseNumber = (quantityInputId, productPriceId, productIndex) => {
  let quantityInput = document.getElementById(quantityInputId);
  let productPrice = document.getElementById(productPriceId);
  let quantityDisplay = document.getElementById(
    `quantity-display-${productIndex}`
  );
  let price = parseFloat(productPrice.getAttribute("data-price"));

  if (quantityInput.value < 10) {
    quantityInput.value = parseInt(quantityInput.value) + 1;

    quantityDisplay.innerText = quantityInput.value;
    productPrice.innerText = (price * quantityInput.value).toFixed(2);

    totalProducts++;
    totalCost += price;

    updateOrderSummary();
  }
};

// Function to update the order summary dynamically
const updateOrderSummary = () => {
  document.querySelector(".order-summary-total-products span").innerText =
    totalProducts;
  document.querySelector(".order-summary-total-amount span").innerText = (
    totalCost + 30
  ).toFixed(2);
};

generateCart();
calculate();
