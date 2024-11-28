function myLogin() {
  window.location.assign("login.html");
}
function myRegister() {
  window.location.assign("register.html");
}
function myCart() {
  window.location.assign("cart.html");
}

let productData = [];
let basket = JSON.parse(localStorage.getItem("productData")) || [];
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    productData = data;
    displayProducts(productData);
    setupEventListeners();
  })
  .catch((err) => {
    console.error("Failed to fetch products:", err);
  });

// Function to display products
function displayProducts(products) {
  const productHTML = products
    .map(
      (product) => `

            <div class="card">
            <img src="${product.image}" alt="img" class="images">
            <h2 class="title">${product.title}</h2>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price}</p>
            <div>
                <button class="btn btn-secondary mb-2" onclick="add_to_cart('${product.image}','${product.title}','${product.price}')"  >Add to Cart</button>
            
              </div>
        </div>
    `
    )
    .join("");
  document.getElementById("cards").innerHTML = productHTML;
}

let add_to_cart = (image, title, price) => {
  basket.push({
    img: image,
    title: title,
    price: parseFloat(price),
  });
  localStorage.setItem("productdata", JSON.stringify(basket));

  calculate();
};

let calculate = () => {
  let cartPage = (document.getElementById(
    "cart-page"
  ).innerHTML = `<i class="fa-solid fa-cart-shopping me-2"></i>Cart (${basket.length})`);
  let cartAmount = basket.length;
  cartPage.innerHTML = cartAmount;
};
calculate();
function setupEventListeners() {
  document.getElementById("all-btn").addEventListener("click", () => {
    displayProducts(productData);
  });

  document.getElementById("mens-btn").addEventListener("click", () => {
    const filteredProducts = productData.filter(
      (product) => product.category === "men's clothing"
    );
    displayProducts(filteredProducts);
  });

  document.getElementById("womens-btn").addEventListener("click", () => {
    const filteredProducts = productData.filter(
      (product) => product.category === "women's clothing"
    );
    displayProducts(filteredProducts);
  });

  document.getElementById("jewelery-btn").addEventListener("click", () => {
    const filteredProducts = productData.filter(
      (product) => product.category === "jewelery"
    );
    displayProducts(filteredProducts);
  });

  document.getElementById("electronics-btn").addEventListener("click", () => {
    const filteredProducts = productData.filter(
      (product) => product.category === "electronics"
    );
    displayProducts(filteredProducts);
  });
}
