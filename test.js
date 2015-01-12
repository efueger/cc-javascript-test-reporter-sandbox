(function( undefined ) {
    "use strict";

    function isPrime( number ) {
        var prime = true, i;
      
        if ( isNumber( number ) ) {
            for ( i = 3; i < number; i++ ) {
              if ( number % i === 0 ) {
                  prime = false;
              } 
            }
        } else {
            prime = false;
        }
      
        return prime;
    }
  
    function isNumber( number ) {
        return !isNaN( parseFloat( number ) ) && isFinite( number );
    }
  
    console.log( isPrime( 109 ) );
}());
//Test123456