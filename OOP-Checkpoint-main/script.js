const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const favoriteItems = document.getElementById("favorite-items");

// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const cartItem = this.items.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.renderCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.renderCart();
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0).toFixed(2);
  }

  renderCart() {
    cartItems.innerHTML = ""; // Clear previous items

    this.items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");

      itemElement.innerHTML = `
        <div class="name">${item.product.name}</div>
        <div class="price">${item.product.price.toFixed(2)} DH</div>
        <div class="quantity">
          <button class="btn minus">-</button>
          ${item.quantity}
          <button class="btn plus">+</button>
        </div>
        <i class="like-btn fas fa-heart"></i>
        <button class="delete-btn">Delete</button>
      `;

      const minusBtn = itemElement.querySelector(".minus");
      const plusBtn = itemElement.querySelector(".plus");
      const deleteBtn = itemElement.querySelector(".delete-btn");

      minusBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          this.renderCart();
        }
      });

      plusBtn.addEventListener("click", () => {
        item.quantity++;
        this.renderCart();
      });

      deleteBtn.addEventListener("click", () => {
        this.removeItem(item.product.id);
      });

      cartItems.appendChild(itemElement);
    });

    totalDisplay.textContent = `Total: ${this.getTotalPrice()} DH`;

    this.renderFavorites();
  }

  renderFavorites() {
    favoriteItems.innerHTML = ""; // Clear previous items

    this.items.filter(item => item.liked).forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
        <div class="name">${item.product.name}</div>
        <div class="price">${item.product.price.toFixed(2)} DH</div>
      `;
      favoriteItems.appendChild(itemElement);
    });
  }
}

// Initialize the cart
const cart = new ShoppingCart();

// Sample products
const product1 = new Product(1, "Product 1", 19.99);
const product2 = new Product(2, "Product 2", 9.99);

// Add items to the cart
cart.addItem(product1);
cart.addItem(product2, 2);

// Initial rendering of the cart
cart.renderCart();
