if(document.readystate == 'loading'){
    document.addEventListener('DOMContentloaded',ready)
} else {
    ready()
}
function ready() {
var removeOrderItemButtons = document.getElementsByClassName('btn-danger')

for (var i = 0; i < removeOrderItemButtons.length; i++){
    var button = removeOrderItemButtons[i]
    button.addEventListener('click',removeOderItem)
}
var quantityInputs = Document.getElementsByClassName('orderQuantityInput')

for (var i = 0; i < quantityInputs.length; i++){
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

function checkoutClicked(){
    alert ('Order confirmed, Thank you.')
    var orderItems.getElementsByClassName('orderItems')[0]
    while (orderItems.hasChildrenNode()){
    orderItems.removeChild(cartItems.firstChild)
    }
    updateOrderTotal()
}

function removeOderItem(event){
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateOrderTotal()
    }
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1

    }
    updateOrderTotal()
}

function addToOrderClicked(event){
    var button = event.target
    var shopItem = button.getElementsByClassName('product')
    var title = shopItem.getElementsByClassName('product')[0].innerText
    var price = shopItem.getElementsByClassName('product')[1].innerText
    //var imgUrl = shopItem.getElementsByClassName('productImg')[0].src
    addItemToOrder(title,price)
    updateOrderTotal()
}

function addItemToOrder(title,price){
    var orderRow = document.createElement('div')
    orderRow.classList.add('orderRow')
    var orderItems = document.getElementsByClassName('orderItems')
    var orderItems = oderItems.getElementsByClassName('orderItemTitle')
    for (var i = 0; orderItemNames.length; i++){
        if (orderItemNames[i].innerText == title)
            alert('this item is already in order.')
        return
    }
    var orderRowContents = ` <div class="orderItems">
                <div class="orderRow">
                <div class="order-item order-column">
                    <img class="cart-item-img" src="${imgUrl}" width="50" height="50">
                    <span class="orderItemTitle">${title}</span>
                </div>
                    <span class="itemPrice order-column">${price}</span>
                <div class="order-quantity order-column">
                        <input class="orderQuantityInput" type="number" valur="1">
                        <button class="btn btn-danger" type="button">remove</button>
                    </div>
                </div>
              </div>`
    orderRow.innerHTML = orderRowContents
    orderItems.append(orderRow)
    orderRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeOderItem)
    orderRow.getElementsByClassName('orderQuantityInput')[0].addEventListener('change',quantityChanged)
}

function updateOrderTotal(){
    var orderItemcontainer = document.getElementsByClassName('oderItems')[0]
    var orderRows = orderItemcontainer.getElementsByClassName('orderRow')
    var total =0
    for (var i = 0; i < removeOrderItemButtons.length; i++){
        var orderRows = orderRows[i]
        var priceEl = orderRows.getElementsByClassName('itemPrice')[0]
        var quantityEL = orderRows.getElementsByClassName('orderQuantityInput')[0]
        var price = parselFloat(priceEl.innerText.replace('$',""))
        var quantity = quantityEL.value
        total = total + (price*quantity)
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('orderTotlePrice')[0].innerText = '$' + total
}
// need to add sales tax and tip maybe
/*function calculateTaxes(price, quantity) {
    var salesTax = .10;
    var totalPrice = (price * quantity) * (1 + salesTax);
    return totalPrice;
}*/

let Products = [
{
    imgUrl: 'https://www.pexels.com/photo/a-close-up-shot-of-a-delicious-pizza-8165239/'
    title: 'cheese'
    price: 25.00
},
{
    imgUrl:'https://www.pexels.com/photo/pizza-on-brown-wooden-board-825661/'
    title:'pepperoni'
    price:  28.00
},
{
     imgUrl: 'https://www.pexels.com/photo/cooked-food-2471171/'
    title: 'margarita'
    price: 28.00
},
{
     imgUrl: 'https://media.istockphoto.com/id/1330984367/photo/soft-and-chewy-parmesan-garlic-knots.jpg?s=2048x2048&w=is&k=20&c=0n_Pdiz__d98DfcVe45fWAgrE3IPwIFs2o7vCcnDSNk='
    title:'knots'
    price: 15.00
},
{
     imgUrl: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg'
    title:'drink'
    price: 8.00
},
]

// base code for generating img in fav coulmon. orderHistory is filler need to figer out fill this out
let fav = Products.find(fav => fav.product === "orderHistory");

// code for checkout

