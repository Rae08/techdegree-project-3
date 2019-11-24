// sets focus on the name field
$('#name').focus();

// initially hides the Your Job Role box
$('#other-title').hide();

$('#design option').first().hide();
$('#color').prepend("<option>Please select a theme</option>");
$('#color option').eq(0).attr('selected', 'selected');
$('#color option').hide();

// when design is selected, filter the color to only the colors available for that design
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

const activitiesDiv = $('.activities').append('<div></div>');
const activities = $('.activities input')
let totalCost = 0;

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

$('#payment option[value="select method"]').prop('disabled', true);
$('#payment option[value="credit card"]').prop('selected', true);
$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();

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
