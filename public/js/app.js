"use strict";

$(document).ready(function () {

    // if (req.isAuthenticated()) {
    //     console.log("User: " + req.userId + " is logged in!");
    // } else {
    //     console.log("User is NOT logged in!");
    // }

    $("#login_btn").on("click", function (event) {
        event.preventDefault();
        var loginCheck = {
            username : $("#username-login").val(),
            password : $("#user-password").val()
        }
        $.ajax("/api/account/login", {
            type: "POST",
            data: loginCheck
        }).then(function(response) {
            console.log("testing");
        });
    });

    $("#create-new-account").on("click",(event)=>{
        event.preventDefault();

        let newUser = {
            username: $("#create-username").val().trim() ,
            password: $("#create-password").val().trim() ,
            email: $("#create-email").val().trim() ,
            full_name:$("#create-name").val().trim(),
            address: $("#create-address").val().trim() ,
            city: $("#create-city").val().trim(),
            state: $("#user-state").val(),
            zip_code:  $("#create-zipcode").val().trim()
        }
        
        console.log(newUser);

        $.ajax("/api/account/register", {
            type: "POST",
            data: newUser
        }).then(function(response) {
            console.log(newUser);
        });

    });

});