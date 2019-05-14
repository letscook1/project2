//This file is served up for the account pages, Either create or update account
'use strict';

$(document).ready(function() {
  //Form submission code can be relocated here. to have it served only on the create/update
  $('#submit_form').on('click', function(event) {
    event.preventDefault();
    errorArray = [];
    errors = false;
    var validator = require('validator');

    if (!validator.isLength($('#create-username')[{ min: 4, max: 30 }])) {
      errors = true;
      errorArray.push('Username must be between 4-30 characters long');
      $('#create-username').removeClass('d-none');
    } else {
      $('#create-username').addClass('d-none');
    }
    if (
      !validator.isLength($('#create-password')[{ min: 6, max: 10 }]) &&
      !$('#create-password')
        .val()
        .trim()
        .match(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]/)
    ) {
      errors = true;
      errorArray.push(
        'Password must contain one letter and one number and be between 6-10 characters'
      );
      $('#create-password').removeClass('d-none');
    } else {
      $('#create-password').addClass('d-none');
    }
    if (!validator.isEmail($('#create-email'))) {
      errors = true;
      errorArray.push('Please enter a valid e-mail Address');
      $('#create-email').removeClass('d-none');
    } else {
      $('#create-email').addClass('d-none');
    }
  });
});
