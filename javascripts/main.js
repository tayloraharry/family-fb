"use strict";

let apiKeys = {};
let uid = {};

function putFamilyInDOM(){
  FbAPI.getFamily(apiKeys, uid).then(function(family){
    $("#family-data").html("");
    family.forEach(function(member) {
    $("#family-data").append(`<div>${"Name: " + member.name} <button class="btn btn-sm btn-danger delete" data-fbid=${member.id}>Delete Member</button></div>`);
    })
    console.log(family);
  });
}


$(document).ready(function(){
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
    firebase.initializeApp(apiKeys);
    putFamilyInDOM();
  });

  $("body").on("click", ".delete", function(){
   let itemId = $(this).data("fbid");
   console.log(itemId);
   FbAPI.deleteFamily(apiKeys, itemId).then(function(){
      putFamilyInDOM();
   });
  });


$("#show-fam-mbr-btn").on('click', function(){
  console.log("hey");
  $("#add-fam-mbr-form").removeClass("hidden");
  $("#show-fam-mbr-btn").addClass("hidden");
});

$("#add-fam-mbr-btn").on('click', function(){
  let skillsArray = $("#new-member-skills").val().split(',');
  let newFamilyMember = {
  "age": $("#new-member-age").val(),
  "gender": $("#new-member-gender").val(),
  "name": $("#new-member-name").val(),
  "skills": {
    "0": skillsArray[0].trim(),
    "1": skillsArray[1].trim(),
    "2": skillsArray[2].trim()
    }
  };
  FbAPI.addFamily(apiKeys, newFamilyMember).then(function(newFamilyMember){
    console.log("inside addFamily", newFamilyMember);
    putFamilyInDOM();
  });

});


$("#cancel-add-fam-mbr-btn").on('click', function(){
  $("#add-fam-mbr-form").addClass("hidden");
  $("#show-fam-mbr-btn").removeClass("hidden");
});



});
