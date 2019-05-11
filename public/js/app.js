"use strict";

$(document).ready(function () {

    $("#login_btn").on("click", function () {
        var loginCheck = {
            username : $("#username-login").val(),
            password : $("#user-password").val()
        }
        $.ajax("/api/account/login", {
            type: "POST",
            data: loginCheck
        }).then(function(response) {
            
        });
    });

    //if (req.isAuthenticated()) {}

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