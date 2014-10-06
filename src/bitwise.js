// helper function for displaing results
var output = function(operator, result) {
    document.getElementById(operator).innerHTML = result;
};

// variables
var a = 5;
var b = 13;


// ~a - NOT
// inverts all the bits
output('not', ~a); // -6
