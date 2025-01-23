function addOrderItems() {
    const orders = document.getElementById('orders');
    const orderLog = JSON.parse(localStorage.getItem('orderLog'));

    if (!orderLog || orderLog.length === null) {
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