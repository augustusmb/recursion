// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

    if(typeof obj === "object" && obj !== null && !Array.isArray(obj)){
        return stringifyObject(obj);
    }

    else if(Array.isArray(obj)){
        return stringifyArray(obj);
    }
    else{
      return stringifyImperatives(obj);
    }

};


function stringifyImperatives(input) {
  if (typeof input === 'string') {
    return '"' + input + '"';
  }
  else if (input === null) {
    return String(null);
  } else {
    return input.toString();
  }
}

function stringifyArray(array) {
  var container = [];

  if (_.isEmpty(array)) {
    return "[]";
  }

  for (var i = 0; i < array.length; i++) {
    if (typeof array[i] === 'object' && !Array.isArray(array[i]) && array[i] !== null) {
      container.push(stringifyObject(array[i]));
    }
    else if (Array.isArray(array[i])) {
      container.push(stringifyArray(array[i]));
    }
    else {
      container.push(stringifyImperatives(array[i]));
    }
  }
  return '[' + container.join() + ']';

}

function stringifyObject(obj) {

  var container = [];

  if(_.isEmpty(obj)){
    return "{}";
  }
  for (var key in obj) {
    if(typeof obj[key] === 'undefined' || typeof obj[key] === 'function'){
      continue;
    }
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
      container.push(stringifyImperatives(key) + ':' + stringifyObject(obj[key]));
    }
    else if(Array.isArray(obj[key])){
      container.push(stringifyImperatives(key) + ':' + stringifyArray(obj[key]));
    }
    else {
      container.push(stringifyImperatives(key) + ':' + stringifyImperatives(obj[key]));
    }
  }

  return '{' + container.join() + '}';
}




