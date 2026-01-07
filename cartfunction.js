const TAX_RATE = 0.08;
let qty = 1;

// Price and image maps for your 12 products//
const priceMap = {
  "Wooden self Rack": 3400,
  "Wooden Deer": 2800,
  "Wooden Table Lamp": 4000,
  "Key hanger": 2000,
  "Porcelain vase": 7000,
  "Porcelain elephant": 6500,
  "Porcelain lamp": 12500,
  "Porcelain Candle": 1200,
  "Carnation Flower": 8500,
  "Gardinea flowers": 6500,
  "Sun flowers": 7650,
  "Garnation flowers": 4500
};

const imageMap = {
  "Wooden self Rack": "selfrackloon.jpg",
  "Wooden Deer": "wdear1.jpg",
  "Wooden Table Lamp": "tablelamploon.jpg",
  "Key hanger": "keyloon1.jpg",
  "Porcelain vase": "pvaseloon.jpg",
  "Porcelain elephant": "peleloon1.jpg",
  "Porcelain lamp": "plamploon.jpg",
  "Porcelain Candle": "pcandleloon1.jpg",
  "Carnation Flowe": "ffloon.jpg",
  "Gardinea flowers": "fcloon.jpg",
  "Sun flowers": "fkloon.jpeg",
  "Garnation flowers": "fmloon.jpeg"
};

function changePdImg(el) {

  document.getElementById("pdBigImg").src = el.src;


  document.querySelectorAll(".pd-thumbs img").forEach(img => {
    img.classList.remove("active");
  });
  el.classList.add("active");
}

// ----------- PRODUCT DETAIL -----------// 
function pdQty(val) {
  qty = Math.max(1, qty + val);
  const qtyInput = document.getElementById("pdQtyVal");
  if (qtyInput) qtyInput.value = qty;
}

function pdAddCart() {
  const btn = document.getElementById("pdAddCartBtn");
  if (!btn) return;

  const productName = btn.getAttribute("data-product-name");
  if (!productName) return;

  const price = priceMap[productName] || 0;
  const image = imageMap[productName] || "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === productName);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ name: productName, price: price, image: image, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  // alert removed to prevent popup on Buy Now
  updateCartCount();

  // Lock the product detail add to cart button after adding
  btn.innerText = "Added";
  btn.disabled = true;
  btn.classList.add("added");
}

function pdBuyNow(button) {
  const productName = button.getAttribute("data-name");
  const productPrice = parseFloat(button.getAttribute("data-price"));
  const productImage = button.getAttribute("data-image");
  const quantity = parseInt(document.getElementById("pdQtyVal").value) || 1;

  const newCart = [{
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: quantity
  }];

  localStorage.setItem("cart", JSON.stringify(newCart));
  window.location.href = "confirmorder.html";
}

// ----------- CART MANAGEMENT ----------- //
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById("cartcount");
  if (cartCountElem) {
    cartCountElem.innerText = totalCount;
    cartCountElem.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
}

function renderCart() {
  const cart = getCart();
  const cartProductsElem = document.getElementById("cartProducts");
  const totalItemsElem = document.getElementById("totalItems");
  const totalPriceElem = document.getElementById("totalPrice");
  if (!cartProductsElem) return;
  if (cart.length === 0) {
    cartProductsElem.innerHTML = "<p>Your cart is empty.</p>";
    if (totalItemsElem) totalItemsElem.innerText = "0";
    if (totalPriceElem) totalPriceElem.innerText = "LKR 0.00";
    updateCartCount();
    return;
  }
  let totalItems = 0;
  let subtotal = 0;
  cartProductsElem.innerHTML = "";
  cart.forEach(item => {
    totalItems += item.quantity;
    subtotal += item.price * item.quantity;
    cartProductsElem.innerHTML += `
      <div class="cart-item"> 
        <img src="${item.image}" alt="${item.name}" style="width:80px; height:auto;"> 
        <div class="cart-item-info"> 
          <h4>${item.name}</h4> 
          <p>Price: LKR ${item.price.toFixed(2)}</p> 
          <p>Quantity: ${item.quantity}</p> 
          <p>Subtotal: LKR ${(item.price * item.quantity).toFixed(2)}</p> 
          <button class="remove-btn" data-name=${JSON.stringify(item.name)}>Remove</button> 
        </div> 
      </div>
    `;
  });
  if (totalItemsElem) totalItemsElem.innerText = totalItems;
  if (totalPriceElem) totalPriceElem.innerText = "LKR" + subtotal.toFixed(2);
  updateCartCount();
}

function removeFromCart(name) {
  let cart = getCart().filter(item => item.name !== name);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function goToCheckout() {
  if (getCart().length === 0) {
    alert("Your cart is empty.");
    return;
  }
  window.location.href = "confirmorder.html";
}

// ----------- CHECKOUT ----------- //
function renderCheckoutProducts() {
  const cart = getCart();
  const container = document.getElementById("checkoutProducts");
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="checkout-item" style="display:flex;gap:10px; margin-bottom:15px;"> 
      <img src="${item.image}" alt="${item.name}" style="width:80px; height:auto;"> 
      <div> 
        <h3>${item.name}</h3> 
        <p>Price: LKR ${item.price.toFixed(2)}</p> 
        <p>Qty: ${item.quantity}</p> 
        <p>Subtotal: LKR ${(item.price * item.quantity).toFixed(2)}</p> 
      </div> 
    </div>
  `).join("");
}

function calculateCheckoutSummary() {
  const cart = getCart();
  let subtotal = 0;
  let qty = 0;
  cart.forEach(i => {
    subtotal += i.price * i.quantity;
    qty += i.quantity;
  });
  const subtotalElem = document.getElementById("subtotal");
  const taxElem = document.getElementById("tax");
  const totalElem = document.getElementById("total");
  const deliveryFeeElem = document.getElementById("deliveryFee");
  const totalQtyElem = document.getElementById("totalQuantity");
  if (subtotalElem) subtotalElem.innerText = subtotal.toFixed(2);
  if (taxElem) taxElem.innerText = (subtotal * TAX_RATE).toFixed(2);
  if (totalElem) totalElem.innerText = (subtotal * (1 + TAX_RATE)).toFixed(2);
  if (deliveryFeeElem) deliveryFeeElem.innerText = "Free";
  if (totalQtyElem) totalQtyElem.innerText = qty;
}

// ----------- ADDRESS MANAGEMENT ----------- //

// Check if saved address is valid //
document.addEventListener('DOMContentLoaded', () => {
  const proceedBtn = document.getElementById('proceedPaymentBtn');
  const modal = document.getElementById('addressModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const addressForm = document.getElementById('addressForm');

  // Show modal on Proceed button click //
  proceedBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Close modal on Cancel button click //
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Submit address form //
  addressForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values //
    const name = document.getElementById('recName').value.trim();
    const phone = document.getElementById('recPhone').value.trim();
    const region = document.getElementById('recRegion').value.trim();
    const address = document.getElementById('recAddress').value.trim();
    const landmark = document.getElementById('recLandmark').value.trim();
    const type = document.getElementById('addressType').value;

    // Validate required fields //
    if (!name || !phone || !region || !address) {
      alert('Please fill all required fields.');
      return;
    }

    // Save address to localStorage //
    const deliveryAddress = { name, phone, region, address, landmark, type };
    localStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress));

    // Close modal //
    modal.style.display = 'none';

    // Redirect to payment page //
    window.location.href = 'ppppppppaaaa.html';
  });

  // Optional: close modal if user clicks outside modal content //
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});


//  PRODUCT PAGE ADD TO CART BUTTON //
function addToCart(button, name, price, image) {
  if (button.classList.contains('added')) return;
  let cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();

  button.innerText = "Added";
  button.disabled = true;
  button.classList.add('added');

  // Also disable matching product detail page add button if exists //
  const pdBtn = document.querySelector('#pdAddCartBtn[data-product-name="' + name + '"]');
  if (pdBtn) {
    pdBtn.innerText = "Added";
    pdBtn.disabled = true;
    pdBtn.classList.add("added");
  }
}

//  PRODUCT FILTERS //
function initProductFilter() {
  const buttons = document.querySelectorAll('.filters button:not(.sort)');
  const products = document.querySelectorAll('.product-card');
  if (!buttons.length || !products.length) return;
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filterText = button.textContent.toLowerCase().trim();
      products.forEach(product => {
        const category = product.dataset.category.toLowerCase().trim();
        if (filterText === 'all needs') {
          product.style.display = 'block';
        } else {
          product.style.display = category === filterText ? 'block' : 'none';
        }
      });
    });
  });
}

// DISABLE ALREADY ADDED BUTTONS //
function disableAddedButtons() {
  const cart = getCart();
  document.querySelectorAll('.cart-btn').forEach(button => {
    const productName = button.getAttribute('data-name');
    if (cart.find(item => item.name === productName)) {
      button.innerText = 'Added';
      button.disabled = true;
      button.classList.add('added');
    }
  });
}

// INIT ON PAGE LOAD //
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Disable product detail add button if product in cart //
  const pdBtn = document.getElementById("pdAddCartBtn");
  if (pdBtn) {
    const productName = pdBtn.getAttribute("data-product-name");
    const cart = getCart();
    if (cart.find(item => item.name === productName)) {
      pdBtn.innerText = "Added";
      pdBtn.disabled = true;
      pdBtn.classList.add("added");
    }
  }

  if (document.getElementById("cartProducts")) {
    renderCart();
    document.getElementById("cartProducts").addEventListener("click", function (e) {
      const btn = e.target.closest(".remove-btn");
      if (!btn) return;
      const name = btn.dataset.name;
      if (name) removeFromCart(name);
    });
  }

  if (document.getElementById("checkoutProducts")) {
    renderCheckoutProducts();
    calculateCheckoutSummary();

    const proceedPayBtn = document.getElementById("proceedPayBtn");
    if (proceedPayBtn) {
      proceedPayBtn.addEventListener("click", () => {
        if (!isAddressValid()) {
          alert("Please fill your address first.");
          showAddressForm();
        } else {
          // Proceed to payment or confirmation page //
          window.location.href = "confirmorder.html";
        }
      });
    }

    const saveAddressBtn = document.getElementById("saveAddressBtn");
    if (saveAddressBtn) saveAddressBtn.addEventListener("click", saveAddress);

    displaySavedAddress();
  }

  const qtyInput = document.getElementById("pdQtyVal");
  if (qtyInput) qtyInput.value = qty;

  if (document.querySelector('.filters')) {
    initProductFilter();
  }

  disableAddedButtons();
});

//  GLOBAL DARK MODE //

(function () {
  // Applyed saved theme immediately //
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-mode");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".dark-toggle-btn");

    if (toggle) {
      toggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");

        if (document.documentElement.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
      });
    }
  });
})();


// date counter //
const targetDate = new Date("2026-02-01T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();


