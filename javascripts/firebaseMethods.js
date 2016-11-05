"use strict";

var FbAPI = (function(oldFirebase) {

  oldFirebase.getFamily = function(apiKeys, uid) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'GET',
        url: `${apiKeys.databaseURL}/family.json`
      }).then((response)=>{
        //console.log("response", response);
        let family = [];
        Object.keys(response).forEach(function(key){
          response[key].id = key;
          family.push(response[key]);
        });
        resolve(family);
      }, (error) => {
        reject(error);
        console.log(error);
      });
    });
  };

  oldFirebase.addFamily = function(apiKeys, newFamilyMember) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'POST',
        url: `${apiKeys.databaseURL}/family.json`,
        data: JSON.stringify(newFamilyMember),
        dataType: 'json'
      }).then((response)=>{
        resolve(response);
        //console.log("response from POST", response);
      }, (error) => {
        reject(error);
        //console.log(error);
      });
    });
  };

  oldFirebase.deleteFamily = function(apiKeys, familyMemberId) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'DELETE',
        url: `${apiKeys.databaseURL}/family/${familyMemberId}.json`,
      }).then((response)=>{
        //console.log("response from Delte", response);
        resolve(response);
        console.log("attmped delte");
      }, (error) => {
        reject(error);
        //console.log(error);
      });
    });
  };

  oldFirebase.restoreFamily = function(apiKeys, familyMemberId) {
   return new Promise((resolve, reject) =>{
     $.ajax({
       method: 'POST',
       url: `${apiKeys.databaseURL}/family.json`,
       data: JSON.stringify(familyMemberId),
       dataType: 'json'
     }).then((response)=>{
       console.log("response from POST", response);
       resolve(response);
     }, (error)=>{
       reject(error);
     });
   });
 };

   oldFirebase.editFamily = function(apiKeys, familyMemberId, editedFamilyMember) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'PUT',
        url: `${apiKeys.databaseURL}/items/${familyMemberId}.json`,
        data: JSON.stringify(editedFamilyMember),
        dataType: 'json'
      }).then((response)=>{
        resolve(response);
        //console.log("response from POST", response);
      }, (error) => {
        reject(error);
        //console.log(error);
      });
    });
  };

  return oldFirebase;
})(FbAPI || {});