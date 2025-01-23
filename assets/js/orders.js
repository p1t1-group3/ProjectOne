if(document.readystate == 'loading'){
    document.addEventListener('DOMContentloaded',ready)
} else {
    ready()
}

const orderArray = [];

function ready() {
    var removeOrderItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeOrderItemButtons.length; i++) {
        var button = removeOrderItemButtons[i]
        button.addEventListener('click',removeOrderItem)
    }

    var quantityInputs = document.getElementsByClassName('orderQuantityInput')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToOrderButtons = document.getElementsByClassName('product')
    for (var i = 0; i < addToOrderButtons.length; i++){
        var button = addToOrderButtons[i] 
        button.addEventListener('click',addToOrderClicked)
    }

    document.getElementsByClassName('check')[0].addEventListener('click',checkoutClicked)
}

function checkoutClicked(event){
    
    var orderItemcontainer = document.getElementsByClassName('orderItems')[0]
    var orderRows = orderItemcontainer.getElementsByClassName('orderRow')
    var total = 0
    var totalTax = 0
    for (var i = 0; i < orderRows.length; i++) {
        var orderRow = orderRows[i]
        var priceElement = orderRow.getElementsByClassName('itemPrice')[0]
        var quantityElement = orderRow.getElementsByClassName('orderQuantityInput')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        var salesTax = .10;
        
        totalTax = total + (price * quantity) / 10;
        total = total + (price * quantity)* (1 + salesTax);       
        
    } 
    total = Math.round(total * 100) / 100;

    
    orderArray.push(total);
    console.log(orderArray);
    orderLog = JSON.stringify(orderArray);
    localStorage.setItem('orderLog',orderLog);

    var orderItems = document.getElementsByClassName('orderItems')[0]
    while (orderItems.hasChildNodes()){
    orderItems.removeChild(orderItems.firstChild)
    }

    updateOrderTotal()

    // window.location.assign('history.html');
    
    
}

function removeOrderItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()

        updateOrderTotal()
}
    
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

        updateOrderTotal()
 }

function addToOrderClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('productTitle')[0].innerText
    var price = shopItem.getElementsByClassName('productPrice')[0].innerText
    var imgUrl = shopItem.getElementsByClassName('productImg')[0].src
    addItemToOrder(title, price, imgUrl)

    updateOrderTotal()
}

function addItemToOrder(title,  price, imgUrl) {
    var orderRow = document.createElement('div')
    orderRow.classList.add('orderRow')
    var orderItems = document.getElementsByClassName('orderItems')[0]
    var orderItemNames = orderItems.getElementsByClassName('orderItemTitle')
    for (var i = 0; i < orderItemNames.length; i++) {
        if (orderItemNames[i].innerText == title) {
            alert('this item is already in order')
            return
        }
    }
    var orderRowContents = `
                <div class="orderItem orderColumn">
                    <img class="orderItemImg" src="${imgUrl}" width="50" height="50">
                    <span class="orderItemTitle">${title}</span>
                </div>
                    <span class="itemPrice orderColumn">${price}</span>
                <div class="orderQuantity orderColumn">
                    <input class="orderQuantityInput" type="number" value="1">
                    <button class="btn btn-danger" type="button">remove</button>
                </div>`       
    orderRow.innerHTML = orderRowContents
    orderItems.append(orderRow)
    orderRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeOrderItem)
    orderRow.getElementsByClassName('orderQuantityInput')[0].addEventListener('change', quantityChanged)
}



function updateOrderTotal(){
    var orderItemcontainer = document.getElementsByClassName('orderItems')[0]
    var orderRows = orderItemcontainer.getElementsByClassName('orderRow')
    var total = 0
    var totalTax = 0
    for (var i = 0; i < orderRows.length; i++) {
        var orderRow = orderRows[i]
        var priceElement = orderRow.getElementsByClassName('itemPrice')[0]
        var quantityElement = orderRow.getElementsByClassName('orderQuantityInput')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        var salesTax = .10;
        
        totalTax = total + (price * quantity) / 10;
        total = total + (price * quantity)* (1 + salesTax);
        
        
    }
    total = Math.round(total * 100) / 100
    totalTax = Math.round(totalTax * 100) / 100
    document.getElementsByClassName('orderTotalPrice')[0].innerText = '$' + total
    document.getElementsByClassName('orderTax')[0].innerText = '$' + totalTax
}

updateOrderTotal();

function addOrderItems() {
    const orders = document.getElementById('orders');
    const orderLog = JSON.parse(localStorage.getItem('orderLog'));

    if (!orderLog || orderLog.length === 0) {
        orders.appendChild('No orders found');
        return;
    }
    
    for (i=0; i<orderLog.length; i++){
    const orderItem = orderLog[i];
    const orderLine = document.createElement('p');
    orderLine.innerText = `Order # ${i+1}: Amount: ${orderLog[i]}`;
    orders.appendChild(orderLine);
    console.log(orderLine);
}
}

addOrderItems();

/*let Products = [
{
    imgUrl: 'https://images.pexels.com/photos/8165239/pexels-photo-8165239.jpeg',
    title: 'cheese',
    price: 25.00
},
{
    imgUrl:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title:'pepperoni',
    price:  28.00
},
{
     imgUrl: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'margarita',
    price: 28.00
},
{
     imgUrl: 'https://media.istockphoto.com/id/1330984367/photo/soft-and-chewy-parmesan-garlic-knots.jpg?s=2048x2048&w=is&k=20&c=0n_Pdiz__d98DfcVe45fWAgrE3IPwIFs2o7vCcnDSNk=',
    title:'knots',
    price: 15.00
},
{
     imgUrl: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg',
    title:'drink',
    price: 8.00
},
]

// base code for generating img in fav coulmon. orderHistory is filler need to figer out fill this out
let fav = Products.find(fav => fav.product === "orderHistory"); */