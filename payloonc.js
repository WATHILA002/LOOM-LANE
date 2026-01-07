/* PAYMENT */
const TAX_RATE = 0.08;

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* SHOW PRODUCTS */
function renderPaymentProducts() {
    const cart = getCart();
    const box = document.getElementById("checkoutProducts");

    if (cart.length === 0) {
        box.innerHTML = "<p>No products found.</p>";
        return;
    }

    let html = "";
    cart.forEach(item => {
        html += `
      <div class="pay-item">
        <img src="${item.image}">
        <div>
          <b>${item.name}</b><br>
          Qty: ${item.quantity}<br>
          LKR ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `;
    });

    box.innerHTML = html;
}

/* TOTALS */
function renderTotals() {
    const cart = getCart();
    let subtotal = 0;

    cart.forEach(i => {
        subtotal += i.price * i.quantity;
    });

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = (subtotal * TAX_RATE).toFixed(2);
    document.getElementById("total").innerText = (subtotal * (1 + TAX_RATE)).toFixed(2);
}

function payNow() {
    const name = cardName.value.trim();
    const num = cardNumber.value.trim();
    const exp = cardExpiry.value.trim();
    const cvv = cardCVV.value.trim();

    if (!name || num.length !== 16 || !/^\d+$/.test(num) || cvv.length !== 3) {
        alert("Invalid card details");
        return;
    }

    alert("✅ Your payment successful!");

    localStorage.removeItem("cart");
    window.location.href = "productslane.html";
}

document.addEventListener("DOMContentLoaded", () => {
    renderPaymentProducts();
    renderTotals();
});