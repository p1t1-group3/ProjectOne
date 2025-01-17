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
const acceptBtn = document.getElementById('acceptBtn');
const homeBtn = document.getElementById('homeB');
const aboutBtn = document.getElementById('aboutB');
let UpdatedInfo = JSON.parse(localStorage.getItem('customerInfo'));


// I have made UpdatedInfo a global variable so that we can update the signUpModalBtn text content with the user's name.

if (UpdatedInfo !== null) {
  console.log(`You have successfully signed up. Welcome ` + `${UpdatedInfo.Name}`);
  document.getElementById('userSignUP').textContent = UpdatedInfo.Name + `'s Order History`;
  document.getElementById('userSignUP').style.fontSize = 'inhert';   
  signUPModalBtn.addEventListener('click',function(event){
    window.location.href = 'history.html';
    // If they have their name saved in local storage, then the Sign Up button changes to a link to their Order History
  })  
} else {
  document.getElementById('userSignUP').textContent = 'Sign Up';
}

acceptBtn.addEventListener('click',function(event){
  event.preventDefault();
  // Changed this from userSignUP button to acceptBtn which is inside the modal because we don't want to set any values until they click Accept
  const customerInfo = {
    Name: customerName.value,
    Email: customerEmail.value,
    phone: customerNumber.value.trim(),
    address:customerAddress.value,
  };

  localStorage.setItem('customerInfo', JSON.stringify(customerInfo));

  UpdatedInfo = customerInfo;
  customerSignUp();

});

function customerSignUp() {
  
    console.log(`You have successfully signed up. Welcome ` + `${UpdatedInfo.Name}`);
    document.getElementById('userSignUP').textContent = UpdatedInfo.Name + `'s Order History`;
    document.getElementById('userSignUP').style.fontSize = 'inhert';     
  
}

// Added link to Home Page
homeBtn.addEventListener('click',function(event){
  event.preventDefault();
  window.location.href = 'index.html'
});

// Added link to About Page
aboutBtn.addEventListener('click',function(event){
  event.preventDefault();
  window.location.href = 'about.html'
})

          
    
