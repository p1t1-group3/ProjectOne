const signUp = document.getElementById("signUpModal")
const order = document.getElementById("orderModal")
const produce = document.getElementById("product")
const pizzamenu = document.getElementById("menu")
 const modalBodyEls= document.getElementsByClassName('modal-body');
const customerName =document.querySelector('.customer-name');
const signUpBtn  =document.querySelector('#userSignUP');
const customerInformation  =document.querySelector('#customerInfo');
const customerEmail  =document.querySelector('.customer-email');
const customerNumber  =document.querySelector('.customer-number');
const customerAddress  =document.querySelector('.customer-address');
const signUPModalBtn= document.querySelector('#userSignUP');



   signUpBtn.addEventListener('click', function (event) {
  event.preventDefault();

  const customerInfo = {
    Name: customerName.value,
    Email: customerEmail.value,
    phone: customerNumber.value.trim(),
    address:customerAddress.value,
  };

  localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
  customerSignUp();
});

function customerSignUp() {
  const UpdatedInfo = JSON.parse(localStorage.getItem('customerInfo'));
  if (customerInfo !== null) {
    console.log("you have successfully signed")
    document.querySelector('#userSignUP').textContent =
     UpdatedInfo.customerName+ `  ${UpdatedInfo.phone}`;
  }
}


          
    