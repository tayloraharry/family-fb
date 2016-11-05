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

  $("#add").on("click", function(){
  let newItem = {
    "age":$("#user-input").val(),
    "gender": false,
    "name": uid
  };
  FbAPI.addTodos(apiKeys, newItem).then(function(item){
    console.log("inside addTodos", item);
    putTodoInDOM();
  });
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
  let newFamilyMember = {
  "age": $("#new-member-age").val(),
  "gender": $("#new-member-gender").val(),
  "name": $("#new-member-name").val(),
  "skills": {
    "0": $("#new-member-skill-1").val(),
    "1": $("#new-member-skill-2").val(),
    "2": $("#new-member-skill-3").val()
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
