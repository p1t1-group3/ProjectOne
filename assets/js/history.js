document.addEventListener("DOMContentLoaded", function () {
  addOrderItems();
  renderHistory();
  renderOrder();
});

function addOrderItems() {
  let ordersElement = document.getElementById("orders");

  // Retrieve the orders array from localStorage
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Check if ordersElement exists
  if (!ordersElement) {
    console.error("ordersElement is null");
    return;
  }

  // Clear previous content
  // ordersElement.innerText = '';

  // Display each order
  if (orders.length == 0) {
    let noOrdersMessage = document.createElement("p");
    noOrdersMessage.innerText = "No orders found";
    ordersElement.appendChild(noOrdersMessage);
  } else {
    // orders.forEach(order => {
    //     let itemsText = order.items.map(item => `${item.quantity} x ${item.title} ($${item.price})`).join(', ');
    //     let orderLine = document.createElement('p');
    //     orderLine.innerText = `Order #${order.orderNumber}: Total: $${order.total.toFixed(2)}, Items: ${itemsText}, Tax: $${order.tax.toFixed(2)}`;
    //     ordersElement.appendChild(orderLine);
    // });

    renderHistory();
    
  }
}

function renderHistory() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let ordersElement = document.getElementById("orders");
  
    if (!ordersElement) {
        console.error('Order history element not found.');
        return;
    }

    let tableHtml = `
      <table class="tableHistory">
        <tr>
          <th class="history historyHeader">Order</th>
          <th class="history historyHeader">Items</th>
          <th class="history historyHeader">Total</th>
          <th class="history historyHeader">Actions</th>
        </tr>
    `;
  
    orders.forEach(function (order, index) {
      let itemsText = order.items
        .map((item) => `${item.quantity} x ${item.title}`)
        .join(", ");
  
      tableHtml += `
        <tr>
          <td class="history historyOrder">${order.orderNumber}</td>        
          <td class="history historyItems">${itemsText}</td>       
          <td class="history historyTotal">$${order.total.toFixed(2)}</td>
          <td class="history historyActions">
            <button class="btn btn-primary btn-order-again" data-index="${index}">Order Again</button>
          </td>
        </tr>
      `;
      
    });
  
    tableHtml += `</table>`;
    ordersElement.innerHTML = tableHtml;
  
    // Add click listeners to "Order Again" buttons
    let orderAgainButtons = document.querySelectorAll(".btn-order-again");
    orderAgainButtons.forEach((button) =>
      button.addEventListener("click", handleOrderAgain)
    );
    
  }
  
  function handleOrderAgain(event) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderIndex = event.target.dataset.index;

    if (orderIndex >= 0 && orderIndex < orders.length) {
        let selectedOrder = orders[orderIndex];
        let currentOrder = JSON.parse(localStorage.getItem("order")) || {
            items: [],
            itemTotal: 0,
            tax: 0,
            tip: 0,
            total: 0,
        };

        // Add items from the selected order to the current order
        selectedOrder.items.forEach((item) => {
            let existingItem = currentOrder.items.find(
                (currentItem) => currentItem.title === item.title
            );
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                currentOrder.items.push({ ...item });
            }
        });

        // Recalculate totals
        currentOrder.itemTotal = currentOrder.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        currentOrder.tax = currentOrder.itemTotal * 0.1;
        currentOrder.tip = currentOrder.itemTotal * 0.15;
        currentOrder.total =
            currentOrder.itemTotal + currentOrder.tax + currentOrder.tip;

        // Save the updated order back to localStorage
        localStorage.setItem("order", JSON.stringify(currentOrder));

        // ** Re-render the modal content explicitly ** 
        renderOrder(); // Updates UI based on currentOrder data
        window.location.href = 'index.html';
    }
}
  
