'use strict'
/* eslint-env jquery, browser */
$(document).ready(() => {
  // Form submission JS. Served only on the create/update
  $('#create-new-account').on('click', event => {
    event.preventDefault()
    // add input validation here
    const errorArray = []
    let errors = false
    if (!$('#create-username').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
      errors = true
      errorArray.push("'Username' field must be from 6 to 15 characters with no special characters!")
    }
    if (!$('#create-password').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
      errors = true
      errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!")
    }
    if (!$('#create-email').val().trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      errors = true
      errorArray.push("'Email' field was blank or not in the proper format!")
    }
    if ($('#create-password').val().trim() !== $('#create-password-verify').val().trim()) {
      errors = true
      errorArray.push("'Password' and 'Verify Password' fields don't match!")
    }
    if (errors) {
      $('#register_error').removeClass('invisible')
      $('#register_error').html(errorArray.join('<br />'))
    } else {
      const newUser = {
        username: $('#create-username').val().trim(),
        password: $('#create-password').val().trim(),
        email: $('#create-email').val().trim()
      }

      $.ajax('/api/account/register', {
        type: 'POST',
        data: newUser
      }).then(res => {
        if (res === 'success') {
          $(location).attr('href', '/login')
        } else {
          $('#register_error').removeClass('invisible')
          $('#register_error').text('Sorry, that username is already taken!')
        }
      })
    }
  })

  // Update Account Info
  $('#update-account').on('click', event => {
    event.preventDefault()
    $('#account_error').addClass('invisible')
    $('#account_success').addClass('invisible')
    const errorArray = []
    let errors = false
    if (!$('#update-username').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
      errors = true
      errorArray.push("'Username' field must be from 6 to 15 characters with no special characters!")
    }
    if ($('#update-password').val().trim() === '') {
      // password field was left blank so it won't update
    } else {
      if (!$('#update-password').val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
        errors = true
        errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!")
      }
    }
    if (!$('#update-email').val().trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      errors = true
      errorArray.push("'Email' field was not in the proper format!")
    }
    if ($('#update-password').val().trim() !== $('#verify-update-password').val().trim()) {
      errors = true
      errorArray.push("'Password' and 'Verify Password' fields don't match!")
    }
    if (errors) {
      $('#account_error').removeClass('invisible')
      $('#account_error').html(errorArray.join('<br />'))
    } else {
      const updateUser = {
        username: $('#update-username').val().trim(),
        password: $('#update-password').val().trim(),
        email: $('#update-email').val().trim()
      }
      $.ajax('/api/account', {
        type: 'PUT',
        data: updateUser
      }).then(res => {
        if (res === 'success') {
          $('#account_success').removeClass('invisible')
          $('#account_success').text('You have successfully updated your account.')
        } else if (res === 'duplicate') {
          $('#account_error').removeClass('invisible')
          $('#account_error').text("The submitted 'Username' is already in use.!")
        } else {
          $('#account_error').removeClass('invisible')
          $('#account_error').text('Your account failed to update.')
        }
      })
    }
  })
})
