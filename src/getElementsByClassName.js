// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
    var container = [];

    var walk = function(element){
      if (_.contains(element.classList, className)){
          container.push(element);
        }
        _.each(element.childNodes, function(childNode){
            walk(childNode);
        })
    };
    walk(document.body);
    return container;
};


