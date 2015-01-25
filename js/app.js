
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	function compareTo(y) {
  		var correct = false;
  		// Guage closeness of guess
  		function gaugeGuess(x) {
  			if ( x == y ) {
  				$( '#feedback' ).text( 'Yes! Click NEW GAME to play again.' );
  				$( 'h2#feedback' ).css( 'background-color', 'rgb(97, 216, 137)' );
  			}
  			else {
  				var compare = '',
  					m = '',
  					abs = Math.abs( x - y ),
  					lastGuess = $( 'ul#guessList li:nth-last-child(2)' ).text(),
  					absLast = Math.abs( lastGuess - y );

  				if ( $( 'ul#guessList' ).children().length > 1 ) {
  					if ( abs > absLast ) { m = 'Colder...'; }
  					else if ( abs < absLast ) { m = 'Warmer...'; }
  					else { m = 'Same distance.'; }
  				}
  				else {
  	  				if ( abs <= 5 ) { m = 'Very hot!'; }
	  				else if ( abs <= 10 ) { m = 'Hot!'; }
  					else if ( abs <= 20 ) { m = 'Warm...'; }
  					else if ( abs < 50 ) { m = 'Cold.'; }
  					else { m = 'Ice cold.'; }					
  				}

				if ( x > y ) { compare = ' Too high.'; }
  				else if (x < y ) { compare = ' Too low.'; }
  				
  				$( '#feedback' ).text( m + compare );
  			}
  		}

  		$( 'form' ).submit(function ( event ) {
  			var guess = + $( 'input:first' ).val();
  			console.log( 'Guess: ' + guess );
  		 	if ( typeof guess == 'number' && guess % 1 == 0 ) {

  		 		// Add guess to list of guesses and display correct guess count
  		 		$( 'ul#guessList' )
  		 			.append('<li>' + guess + '</li>')
  		 			.animate({
	  					scrollTop: $( 'ul#guessList li:last-child' ).offset().top
	  				}, 500);
  		 		$( 'span#count' ).text( $( 'ul#guessList' ).children().length );

  		 		new gaugeGuess(guess);
  		 		
  		 		}
	  		else {
	  			$( '#feedback' ).text( 'Not a valid number! Please try again.' )
	  		}
	  		$( 'input:first' ).val('');
	  		event.preventDefault();
		})

  	}

  	var secretNumber;

  	function newGame() {
  		function randNum(min, max) {
  			return Math.floor(Math.random() * (max - min + 1)) + min;
  		}

  		secretNumber = randNum(1, 100);
  		console.log('New game started. Secret number: ' + secretNumber);

  		new compareTo( secretNumber );
  	}

  	$( 'a.new' ).click(function() {
  		new newGame();
  	});

  	new newGame();

});


