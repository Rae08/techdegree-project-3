// sets focus on the name field
$('#name').focus();

// initially hides the Your Job Role box
$('#other-title').hide();

$('#design option').first().hide();
$('#color').prepend("<option>Please select a theme</option>");
$('#color option').eq(0).attr('selected', 'selected');
$('#color option').hide();

// when design is selected, filters the color to only the colors available for that design
$('#design').change(function(event) {
  const value = event.target.value;
  if (value === "js puns") {
    $('#color option').hide();
    $('#color option').eq(1).prop('selected', 'true').show();
    $('#color option').eq(2).show();
    $('#color option').eq(3).show();
  } else {
    $('#color option').hide();
    $('#color option').eq(4).prop('selected', 'true').show();
    $('#color option').eq(5).show();
    $('#color option').eq(6).show();
  }
})

// creates a div to store the cost of the activities
const activitiesDiv = $('.activities').append('<div></div>');
const activities = $('.activities input')
let totalCost = 0;

// when activities are selected, calculate the total cost
$('.activities').change(function(event){
  const activity = event.target;
  let cost = parseInt(activity.getAttribute('data-cost'));
  let clickedDateAndTime = activity.getAttribute('data-day-and-time');
 
  if (event.target.checked) {
    totalCost += cost
  } else {
    totalCost -= cost;
  }
  const costText = `Total: $${totalCost}`;
  $('.activities div').text(costText);

  // when activities are selected, disable any activity that is at the same time
  for(let i = 0; i < activities.length; i += 1){
    let dateAndTime = activities[i].getAttribute('data-day-and-time');
    let input = $('.activities input').eq(i);
    if (clickedDateAndTime === dateAndTime && activities[i] !== activity){
      if (input.prop('disabled')) {
        input.prop('disabled', false);
      } else {
        input.prop('disabled', true);
      }
    }
  }
})

// adds a value of select payment method that cannot be clicked
$('#payment option[value="select method"]').prop('disabled', true);

// initially selects the credit card option, displays the card fields and hides bitcoin and paupal text
$('#payment option[value="credit card"]').prop('selected', true);
$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();


// toggle paypal text, bitcoin text and credit card inputs based on payment method value
$('#payment').change(function(event) {
  
  let currentOption = event.target.value;
  if(currentOption === "credit card"){
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if (currentOption === "paypal") {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if (currentOption === "bitcoin") {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  } else {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  }
})

// validation functions

// Name field can't be blank.
function isValidName(name){
  if (name === ""){ 
    return false;
  } 
  return true;
};

// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.

function isValidEmail(email) {
  let valid = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return valid.test(email);
}

// User must select at least one checkbox under the "Register for Activities" section of the form.

function hasActivities(){
  let activities = $('.activities input');
  let checkactivities = [];
  let valid = false;
  for(i=0; i < activities.length; i+=1){
   if (activities[i].checked){
     checkactivities.push(i);
   }
  }
  if (checkactivities.length > 0) {
    valid = true;
  } else {
    valid = false;
  }
return valid;
}

// credit card, zip code, and cvv must not be blank
// credit card between 13 and 16 digits;
// zip is 5 digits
// cvv is 3 digits

function hasValidCreditCard() {
  let paymentType = $('#payment').val();
  let card = $('#cc-num').val();
  let zip = $('#zip').val();
  let cvv = $('#cvv').val();
  
  let creditCardValid = /^\d{13,16}$/;
  let zipValid = /^\d{5}$/;
  let cvvValid = /^\d{3}$/;


    if (paymentType === 'credit card'){
    if (card === "" || creditCardValid.test(card) === false) {
    $('#cc-num').addClass('error')
    $('#cc-num').after("<div class='error'>Credit Card must be 13 - 16 digits</div>")
    
    }
    if (zip === "" || zipValid.test(zip) === false) {
    $('#zip').addClass('error')
    $('#zip').after("<div class='error'>Zip code must be 5 digits</div>")
      
    }
    if (cvv === "" || cvvValid.test(cvv) === false) {
      $('#cvv').addClass('error')
    $('#cvv').after("<div class='error'>Zip code must be 5 digits</div>")
    }
    
    if (creditCardValid.test(card) && zipValid.test(zip) && cvvValid.test(cvv)) {
      return true;
    } else {
      return false;
    }
  
  } else {
    return true;
  }
}

// on submit, prevent default and display error if any of the validation checks return false;

$( "form" ).submit(function( event ) {
  $('input').removeClass('error')
  $('div .error').remove()

  if (isValidName($('#name').val()) === false) {
    event.preventDefault();
    $('#name').addClass('error');
    $('#name').before("<div class='error'>Please Enter a Name</div>")
  }

  if (isValidEmail($('#mail').val()) === false)  {
    event.preventDefault();
    $('#mail').addClass('error')
    $('#mail').before("<div class='error'>Please Enter an Email</div>")
  }

  if (hasActivities() === false)  {
    event.preventDefault();
    $('.activities legend').after("<p class='error'>One activity must be selected</p>")
  }

  if (hasValidCreditCard() === false) {
    event.preventDefault();
  };

});


