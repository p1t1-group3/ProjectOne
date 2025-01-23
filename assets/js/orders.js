// if(document.readystate == 'loading'){
//     document.addEventListener('DOMContentloaded',ready)
// } else {
//     ready()
// }

const itemsOrdered = [];

// replace this by reading the contents of LocalStorage
const order = {
    items: [],
    itemTotal: 0,
    tip: 0,
    tax: 0,
    total: 0
}
console.log("RENDER ORDER")
renderOrder();
function renderProducts () {
    const productsDiv = document.querySelector(".products");

    Products.forEach(function(product, index) {

        productHtml = `<div id="product${index}" class="col product">
        <span class="productTitle">${product.title}</span>
        <img class="productImg" src="${product.imgUrl}">
        <div class="productDetails">
            <Span class="productPrice">${product.price}</Span>
            <button data-index="${index}" class="btn btn-secondary productbutton">Order</button>
        </div>
    </div>`
        productsDiv.innerHTML+= productHtml
    })

    productsDiv.addEventListener("click", addToOrder)
}



function renderOrder () {
    const orderItemsElement = document.querySelector(".orderItems");
    orderItemsElement.innerHTML = "";
    order.items.forEach(function(item) {
        let orderItemElement = createOrderItemElement(item.title, item.price, item.imgUrl, item.quantity);
        orderItemsElement.appendChild(orderItemElement)
    })
    document.querySelector('.orderTotalPrice').textContent = `$${order.total}`
    document.querySelector('.orderTax').textContent = `$${order.tax}`
}

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
    const orderLog = JSON.parse(localStorage.getItem('orderLog'));
    if (orderLog.length === null){ 
        orderArray = [];
    }
    else{
        orderArray = orderLog
    }
    for (var i = 0; i < orderRows.length; i++) {
        var orderRow = orderRows[i]
        var priceElement = orderRow.getElementsByClassName('itemPrice')[0]
        var quantityElement = orderRow.getElementsByClassName('orderQuantityInput')[0]
        var price =priceElement.innerText.replace('$','')
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

    calculateTotalsTaxesTip()

    // window.location.assign('history.html');
    
    
}

function removeOrderItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()

        calculateTotalsTaxesTip()
}
    
function quantityChanged(event) {
    var input = event.target
    if ( isNaN (input.value) || input.value <= 0) {
        input.value = 1
    }

    calculateTotalsTaxesTip()
 }

function addToOrder(event){
    console.log("CLICKED", event.target)
    if (event.target.matches("button")) {
        const productIndex = event.target.dataset.index;
        console.log(productIndex)
        const product = Products[productIndex];
        console.log(product)

        if (order.items.some(function(item) {
            return item.title == product.title;
        })) {
             // update quantity
             const sameItem = order.items.find(function(item) {
                return item.title == product.title;
            });
            sameItem.quantity++;
        } else {
            // add to order
            const newItem = {
                title: product.title,
                price: product.price,
                quantity: 1,
                imgUrl: product.imgUrl
            }
            order.items.push(newItem)
        }
        // save to local storage
        calculateTotalsTaxesTip();
        renderOrder();
    }
}

function calculateTotalsTaxesTip() {
    // get the subtotal by multiplying quantity of each item by price.
    // calculate sales tax of 10%
    // calcualte tip of 15%
    // calculate total = subtotal + tax + tip

    // total = Math.floor(Math.round(total * 100) / 100);
    // totalTax = Math.round(totalTax * 100) / 100
    // document.getElementsByClassName('orderTotalPrice')[0].innerText = '$' + total
    // document.getElementsByClassName('orderTax')[0].innerText = '$' + totalTax

}
calculateTotalsTaxesTip()
function createOrderItemElement(title, price, imgUrl, quantity) {
    var itemRow = document.createElement('div')
    itemRow.classList.add('orderRow')
    var orderItems = document.getElementsByClassName('orderItems')[0]
    var orderItemNames = orderItems.getElementsByClassName('orderItemTitle')
    var orderRowContents = `
                <div class="orderItem orderColumn">
                    <img class="orderItemImg" src="${imgUrl}" width="50" height="50">
                    <span class="orderItemTitle">${title}</span>
                </div>
                    <span class="itemPrice orderColumn">${price}</span>
                <div class="orderQuantity orderColumn">
                    <input class="orderQuantityInput" type="number" value="${quantity}">
                    <button class="btn btn-danger" type="button">remove</button>
                </div>`       
    itemRow.innerHTML = orderRowContents
    // orderItems.append(orderRow)
    itemRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeOrderItem)
    itemRow.getElementsByClassName('orderQuantityInput')[0].addEventListener('change', quantityChanged)
    return itemRow;
}






let Products = [
{
    imgUrl: 'https://images.pexels.com/photos/8165239/pexels-photo-8165239.jpeg',
    title: 'cheese',
    quantity: 1,
    price: 25.00
},
{
    imgUrl:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title:'pepperoni',
    quantity: 1,
    price:  28.00
},
{
    imgUrl: 'https://images.pexels.com/photos/2471171/pexels-photo-2471171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'margarita',
    quantity: 1,
    price: 28.00
},
{
    imgUrl: 'https://media.istockphoto.com/id/1330984367/photo/soft-and-chewy-parmesan-garlic-knots.jpg?s=2048x2048&w=is&k=20&c=0n_Pdiz__d98DfcVe45fWAgrE3IPwIFs2o7vCcnDSNk=',
    title:'knots',
    quantity: 1,
    price: 15.00
},
{
    imgUrl: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg',
    title:'drink',
    quantity: 1,
    price: 8.00
}
]

renderProducts();