'use strict';

$(document).ready(function () {
  // this displays add to cart only if user is logged in otherwise it stays d-none
  let userStatus = $("#item-row").data("user");
  if(userStatus){
    $(".add-item-footer").removeClass("d-none");
  }
});
