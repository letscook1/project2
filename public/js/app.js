'use strict';

$(document).ready(function () {
  $("#login_btn").on("click", (event) => {
    event.preventDefault();
    var loginCheck = {
      username: $("#username-login").val().trim(),
      password: $("#user-password").val().trim()
    }
    $.post("/api/account/login", loginCheck)
      .then(function (response) {
        //console.log(response);
        if (response === "success") {
          $(location).attr('href', '/');
        } else {
          $("#login_error").removeClass("invisible");
          $("#login_error").text(response);
        }
      });
  });

  $('#create-new-account').on('click', event => {
    event.preventDefault();

    let newUser = {
      username: $('#create-username')
        .val()
        .trim(),
      password: $('#create-password')
        .val()
        .trim(),
      email: $('#create-email')
        .val()
        .trim()
    };

    //console.log(newUser);

    $.ajax('/api/account/register', {
      type: 'POST',
      data: newUser
    }).then(function (response) {
      if (response === 'success') {
        $(location).attr('href', '/login');
      } else {
        $(location).attr('href', '/register');
      }
    });
  });

  //Update Account Info
  $('#update-account').on('click', event => {
    event.preventDefault();

    let updateUser = {
      username: $('#update-username')
        .val()
        .trim(),
      password: $('#update-password')
        .val()
        .trim(),
      email: $('#update-email')
        .val()
        .trim()
    };

    $.ajax('/api/account', {
      type: 'POST',
      data: updateUser
    }).then(function (response) {
      if (response === 'success') {
        $(location).attr('href', '/account');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  //Add A new Item to the cart
  $('.add-item').on('click', function(event) {
    event.preventDefault();

    let addItem = {
      num: 1,
      each_price: $(this).data("price"),
      productId : $(this).data("id")
    };

    $.ajax('/api/cart', {
      type: 'POST',
      data: addItem
    }).then(function (response) {
      //console.log(response);
      if (response === 'created' || response === 'updated') {
        $(location).attr('href', '/cart');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  //delete an item from the cart
  $('.delete-item').on('click', event => {
    event.preventDefault();

    //

    $.ajax('/cart', {
      type: 'POST',
      data: deleteItem
    }).then(function (response) {
      if (response === 'success') {
        $(location).attr('href', '/cart');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  //update quantity of an item
  $('.update-quantity').on('click', event => {
    event.preventDefault();

    //

    $.ajax('/cart', {
      type: 'POST',
      data: updateQuantity
    }).then(function (response) {
      if (response === 'success') {
        $(location).attr('href', '/cart');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  //Search Button
  $('#navbar-search-btn').on('click', event => {
    event.preventDefault();

    let search = $('#search').val();

    //

    $.ajax('/search/:criteria', {
      type: 'GET',
      data: search
    }).then(function (response) {
      if (response === 'success') {
        $(location).attr('href', '/:criteria');
      } else {
        $(location).attr('href', '/');
      }
    });
  });
});
