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
        // add input validation here
        var errorArray = [];
        var errors = false;
        var errorArray = [];
        var errors = false;
        if (!$("#create-username").val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
            errors = true;
            errorArray.push("'Username' field must be from 6 to 15 characters with no special characters!");
        }
        if (!$("#create-password").val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
            errors = true;
            errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!");
        }
        if ($("#create-email").val().trim().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/)) {
            errors = true;
            errorArray.push("'Email' field was not in the proper format!");
        }
        if (errors) {
            $("#register_error").removeClass("invisible");
            $("#register_error").text(errorArray.toString());
        } else {
            let newUser = {
                username: $('#create-username').val().trim(),
                password: $('#create-password').val().trim(),
                email: $('#create-email').val().trim()
            };
            $.ajax('/api/account/register', {
                type: 'POST',
                data: newUser
            }).then(function (response) {
                if (response === 'success') {
                    $(location).attr('href', '/login');
                } else {
                    $("#register_error").removeClass("invisible");
                    $("#register_error").text("Sorry, that username is already taken!");
                }
            });
        }
    });

    //Update Account Info
    $('#update-account').on('click', event => {
        event.preventDefault();
        var errorArray = [];
        var errors = false;
        if (!$("#update-password").val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
            errors = true;
            errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!");
        }
        if ($("#update-email").val().trim().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/)) {
            errors = true;
            errorArray.push("'Email' field was not in the proper format!");
        }
        if (errors) {
            $("#account_error").removeClass("invisible");
            $("#account_error").text(errorArray.toString());
        } else {
            let updateUser = {
                username: $('#update-username').val().trim(),
                password: $('#update-password').val().trim(),
                email: $('#update-email').val().trim()
            };
            $.ajax('/api/account', {
                type: 'PUT',
                data: updateUser
            }).then(function (response) {
                if (response === 'success') {
                    $(location).attr('href', '/account');
                } else {
                    $(location).attr('href', '/');
                }
            });
        }
    });

    //Add A new Item to the cart
    $('.add-item').on('click', function (event) {
        event.preventDefault();

        let addItem = {
            num: 1,
            each_price: $(this).data("price"),
            productId: $(this).data("id")
        };

        $.ajax('/api/cart', {
            type: 'POST',
            data: addItem
        }).then(function (response) {
            if (response === 'created' || response === 'updated') {
                $(location).attr('href', '/cart');
            } else {
                $(location).attr('href', '/');
            }
        });
    });

    //delete an item from the cart
    $('.delete-item').on('click', function (event) {
        event.preventDefault();

        var deleteItem = {
            id: $(this).val()
        };

        $.ajax('/api/cart', {
            type: 'DELETE',
            data: deleteItem
        }).then(function (response) {
            if (response === 'success') {
                $(location).attr('href', '/cart');
            } else {
                $(location).attr('href', '/cart');
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

    // submit an order
    $("#payment-button").on("click", (event) => {
        var orderTotal = {
            order_total: 1
        }
        event.preventDefault();
        $.post("/api/cart/submitted", orderTotal)
            .then(function (response) {
                $(location).attr('href', '/');
                // $(location).attr('href', '/account/orders/' + response.orderId);
            });
    });

    // Search Button
    $('#navbar-search-btn').on('click', event => {
        event.preventDefault();
        let search = $('#navbar-search-input').val();
        $(location).attr('href', '/search/' + search);
    });
});
