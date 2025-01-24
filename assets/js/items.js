document.addEventListener('DOMContentLoaded', function() {
    addOrderItems();
});

function addOrderItems() {
    let ordersElement = document.getElementById('orders');
    
    // Retrieve the orders array from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Check if ordersElement exists
    if (!ordersElement) {
        console.error("ordersElement is null");
        return;
    }

    // Clear previous content
    ordersElement.innerHTML = '';

    // Display each order
    if (orders.length === 0) {
        let noOrdersMessage = document.createElement('p');
        noOrdersMessage.innerText = 'No orders found';
        ordersElement.appendChild(noOrdersMessage);
    } else {
        orders.forEach(order => {
            let itemsText = order.items.map(item => `${item.quantity} x ${item.title} ($${item.price})`).join(', ');
            let orderLine = document.createElement('p');
            orderLine.innerText = `Order #${order.orderNumber}: Total: $${order.total.toFixed(2)}, Items: ${itemsText}, Tax: $${order.tax.toFixed(2)}`;
            ordersElement.appendChild(orderLine);
        });
    }
}