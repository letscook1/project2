/* eslint-disable no-undef */
'use strict';

$(document).ready(()=> {

    $.get("/category/list", data => {
        data.categoryList.forEach(element=> $("#dropdownItems").append("<a class='dropdown-item' href='/category/" + element.id + " ' title='" + element.description + "'>" + element.name + "</a>"));
    });

    $.get("/user/status", data => {
        if (data.user) {
            $("#account_link").removeClass("d-none");
            $("#cart_logout").removeClass("d-none");
            $("#login_register").addClass("d-none");
            $.get("/cart/info", data => {
                $("#cart_info").removeClass("d-none");
                $("#cart_info").text(data.cartInfo.totalItems + " items| $" + data.cartInfo.totalCost);
            });
        }
    });

    $("#login_btn").on("click", (event) => {
        event.preventDefault();
        var loginCheck = {
            username: $("#username-login").val().trim(),
            password: $("#user-password").val().trim()
        }
        $.post("/api/account/login", loginCheck)
            .then(res=> {
                if (res === "success") {
                    $(location).attr('href', '/');
                } else {
                    $("#login_error").removeClass("invisible");
                    $("#login_error").text(res);
                }
            });
    });

    $('#create-new-account').on('click', event => {
        event.preventDefault();
        // add input validation here
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
        if (!$("#create-email").val().trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            errors = true;
            errorArray.push("'Email' field was blank or not in the proper format!");
        }
        if ($("#create-password").val().trim() !== $("#create-password-verify").val().trim()) {
            errors = true;
            errorArray.push("'Password' and 'Verify Password' fields don't match!");
        }
        if (errors) {
            $("#register_error").removeClass("invisible");
            $("#register_error").html(errorArray.join("<br />"));
        } else {
            let newUser = {
                username: $('#create-username').val().trim(),
                password: $('#create-password').val().trim(),
                email: $('#create-email').val().trim()
            };
            $.ajax('/api/account/register', {
                type: 'POST',
                data: newUser
            }).then(res => {
                if (res === 'success') {
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
        $("#account_error").addClass("invisible");
        $("#account_success").addClass("invisible");
        var errorArray = [];
        var errors = false;
        if (!$("#update-username").val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
            errors = true;
            errorArray.push("'Username' field must be from 6 to 15 characters with no special characters!");
        }
        if ($("#update-password").val().trim() === "") {
            // password field was left blank so it won't update
        } else {
            if (!$("#update-password").val().trim().match(/^[a-zA-Z0-9 _-]{6,15}$/)) {
                errors = true;
                errorArray.push("'Password' field must be from 6 to 15 characters with no special characters!");
            }
        }
        if (!$("#update-email").val().trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            errors = true;
            errorArray.push("'Email' field was not in the proper format!");
        }
        if ($("#update-password").val().trim() !== $("#verify-update-password").val().trim()) {
            errors = true;
            errorArray.push("'Password' and 'Verify Password' fields don't match!");
        }
        if (errors) {
            $("#account_error").removeClass("invisible");
            $("#account_error").html(errorArray.join("<br />"));
        } else {
            let updateUser = {
                username: $('#update-username').val().trim(),
                password: $('#update-password').val().trim(),
                email: $('#update-email').val().trim()
            };
            $.ajax('/api/account', {
                type: 'PUT',
                data: updateUser
            }).then( res =>{
                if (res === 'success') {
                    $("#account_success").removeClass("invisible");
                    $("#account_success").text("You have successfully updated your account.");
                } else if (res === 'duplicate') {
                    $("#account_error").removeClass("invisible");
                    $("#account_error").text("The submitted 'Username' is already in use.!");
                } else {
                    $("#account_error").removeClass("invisible");
                    $("#account_error").text("Your account failed to update.");
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
        }).then(res=> {
            if (res === 'created' || res === 'updated') {
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
        }).then(res => {
            if (res === 'success') {
                $(location).attr('href', '/cart');
            } else {
                $(location).attr('href', '/cart');
            }
        });
    });

    //update quantity of an item
    $('.update-quantity').on('click', event => {
        event.preventDefault();

        



        $.ajax('/cart', {
            type: 'POST',
            data: updateQuantity
        }).then(res => {
            if (res === 'success') {
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
        $.post("/api/cart/submitted", orderTotal).then(()=> $(location).attr('href', '/'));
    });

    // Search Button
    $('#navbar-search-btn').on('click', event => {
        event.preventDefault();
        let search = $('#navbar-search-input').val();
        $(location).attr('href', '/search/' + search);
    });

});