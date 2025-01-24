document.addEventListener("DOMContentLoaded", function () {
  addOrderItems();
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

  tableHtml = `
    <table class="historyTable">
                <tr>
                    <th>Order</th>
                    <th>Items</th>
                    <th>Total</th>
                </tr>
    
    `;
//   ordersElement.innerHTML += tableHeaderHtml;
  orders.forEach(function (order, index) {
    let itemsText = order.items.map(
      (item) => `${item.quantity}  x ${item.title}`
    );

    orderHtml = `
        
        <tr>
            <td class="historyIndex">${order.orderNumber}</td>        
            <td class="historyItems">${itemsText.join(', ')}</td>       
            <td class="historyTotal">${order.total.toFixed(2)}</td>
        </tr>
        
        `;

    console.log(orderHtml);
    tableHtml+= orderHtml;
    
  });
  tableHtml += `</table>`;
  ordersElement.innerHTML = tableHtml;
}

