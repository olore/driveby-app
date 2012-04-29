//gg-data.js

/*
gifts[UID]
  recipient
  amount
  description
*/

GG.loadGifts = function() {
  if (localStorage["gifts"] == null) {
    return {};
  } 
  return $.parseJSON(localStorage["gifts"]);
}

GG.giftCount = function() {
  //Don't use this http://stackoverflow.com/questions/5223/length-of-javascript-associative-array
  return Object.keys(GG.loadGifts()).length;
}

GG.saveGifts = function(gifts) {
  localStorage['gifts'] = JSON.stringify(gifts);
}

