/* Add item to cart
function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item is already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}*/

// Initialize or get the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already exists
    } else {
        // Add new item to the cart
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Confirm to the user that the item has been added
    alert(`${productName} has been added to your cart.`);
}

// Function to retrieve and display cart items on the cart page
function displayCartItems() {
    // Get cart data from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if cart is empty
    if (cart.length === 0) {
        document.getElementById('cartItems').innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Display each item in the cart
    const cartHtml = cart.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
    `).join('');

    document.getElementById('cartItems').innerHTML = cartHtml;

    // Display total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('totalPrice').innerText = `Total: ₹${totalPrice}`;
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    // Remove item from cart array
    cart = cart.filter(item => item.name !== productName);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh cart display
    displayCartItems();
}

// Call displayCartItems if on the cart page
if (document.body.contains(document.getElementById('cartItems'))) {
    displayCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Confirm checkout action
    if (confirm('Proceed to checkout?')) {
        // Clear the cart and update localStorage
        cart = [];
        localStorage.removeItem('cart');
        

        alert('Thank you for your purchase!');
        
       
        window.location.href = 'payment.html';
    }
} 
function new1(){
    window.location.href ='cart.html';
}



// Filter products based on search and category
function filterProducts() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        const category = product.getAttribute('data-category');
        const matchesSearch = name.includes(searchInput);
        const matchesCategory = categoryFilter === '' || category === categoryFilter;

        if (matchesSearch && matchesCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sort products based on price
function sortProducts() {
    const sortOrder = document.getElementById('sortOrder').value;
    const products = Array.from(document.querySelectorAll('.product'));
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        
        return sortOrder === 'lowToHigh' ? priceA - priceB : priceB - priceA;
    });

    // Append sorted products to the product list
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear current products
    products.forEach(product => {
        productList.appendChild(product);
    });

    // Reset the filter after sorting
    filterProducts();
}

// Load cart data if on cart page
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}
// Toggle payment method visibility
function togglePaymentMethod() {
    const paymentType = document.getElementById('paymentType').value;
    document.getElementById('cardPayment').style.display = paymentType === 'card' ? 'block' : 'none';
    document.getElementById('upiPayment').style.display = paymentType === 'upi' ? 'block' : 'none';
}

// Complete payment and show receipt
function completePayment() {
    // Capture form data
    const paymentType = document.getElementById('paymentType').value;
    const nameOnCard = document.getElementById('nameOnCard').value || '';
    const cardNumber = document.getElementById('cardNumber').value || '';
    const expiryDate = document.getElementById('expiryDate').value || '';
    const upiId = document.getElementById('upiId').value || '';

    // Validate form data (basic validation example)
    if (paymentType === 'card' && (!nameOnCard || !cardNumber || !expiryDate)) {
        alert('Please fill in all card details');
        return;
    }
    if (paymentType === 'upi' && !upiId) {
        alert('Please fill in the UPI ID');
        return;
    }

    // Generate receipt details
    const receiptDetails = `
        Payment Method: ${paymentType === 'card' ? 'Credit/Debit Card' : 'UPI'}<br>
        ${paymentType === 'card' ? `Name on Card: ${nameOnCard}<br>Card Number: **** **** **** ${cardNumber.slice(-4)}<br>Expiry Date: ${expiryDate}` : `UPI ID: ${upiId}`}<br>
        Total Amount: ₹12000
    `;

    // Show receipt section and insert receipt details
    document.getElementById('receiptDetails').innerHTML = receiptDetails;
    document.getElementById('receipt').style.display = 'block';
}

// Print the receipt
function printReceipt() {
    const printContent = document.getElementById('receipt').innerHTML;
    const originalContent = document.body.innerHTML;

    // Set body content to receipt for printing
    document.body.innerHTML = printContent;

    // Trigger print
    window.print();

    // Restore original body content
    document.body.innerHTML = originalContent;
}
