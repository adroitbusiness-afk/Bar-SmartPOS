const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyN7B7xi0747vPY-bJP-vZ6PvbPw2CieIIncQzI4dTg1qs6ksl3aqfnUz3qepjhp3QhRQ/exec";

let currentCashier = "";
let cart = [];
let total = 0;

function login() {
    const pin = document.getElementById("pin").value;

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ action: "login", pin })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            currentCashier = data.name;
            document.getElementById("cashierName").innerText = data.name;
            document.getElementById("loginScreen").classList.add("hidden");
            document.getElementById("posScreen").classList.remove("hidden");
            loadProducts();
        } else {
            alert("Invalid PIN");
        }
    });
}

function loadProducts() {
    fetch(SCRIPT_URL + "?action=getProducts")
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById("products");
        container.innerHTML = "";

        products.forEach(p => {
            const btn = document.createElement("button");
            btn.innerText = `${p.Name} - ZMW ${p.Price}`;
            btn.onclick = () => addToCart(p);
            container.appendChild(btn);
        });
    });
}

function addToCart(product) {
    cart.push(product);
    total += Number(product.Price);
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cartItems");
    list.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.innerText = item.Name;
        list.appendChild(div);
    });

    document.getElementById("total").innerText = total;
}

function checkout() {
    if (cart.length === 0) return;

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "saveSale",
            cashier: currentCashier,
            cart: cart,
            total: total
        })
    })
    .then(res => res.json())
    .then(() => {
        cart = [];
        total = 0;
        updateCart();
        alert("Sale Completed");
    });
}

function openShiftClose() {
    const physicalCash = prompt("Enter Physical Cash:");

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "closeShift",
            cashier: currentCashier,
            physicalCash
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(`Shift Closed. Variance: ${data.variance} (${data.flag})`);
    });
}
