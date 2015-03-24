
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(800);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(800);
	});


	// Guage closeness of guess
	function gaugeGuess(x, y) {
		if ( x == y ) {
			$( 'h2#feedback' )
				.text( 'Correct! Click NEW GAME to play again.' )
				.css( 'background-color', 'rgb(97, 216, 137)' );
		}
		else {
			var compare = '',
				m = '',
				abs = Math.abs( x - y ),
				lastGuess = $( 'ul#guessList li:nth-last-child(2)' ).text(),
				absLast = Math.abs( lastGuess - y );

			// Gauge first guess and compare subsequent guesses to the last guess
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

    $( 'form' ).submit(function (event) {
        console.log('submitted');
        event.preventDefault();
        var guess = + $( 'input:first' ).val();
        if ( guess < 1 || guess > 100 ) {
            $( '#feedback' ).text( 'Please pick a number between 1 and 100.' )
        }
        else if ( typeof guess == 'number' && guess % 1 == 0 && 1 <= guess <= 100) {

            // Add guess to list of guesses and display correct guess count
            $( 'ul#guessList' )
                .append('<li>' + guess + '</li>')
                .animate({
                scrollTop: $( 'ul#guessList li:last-child' ).offset().top
            }, 500);
            $( 'span#count' ).text( $( 'ul#guessList' ).children().length );

            gaugeGuess(guess, secretNumber);
            
            }

        else {
            $( '#feedback' ).text( 'Not a valid number! Please try again.' )
        }
        $( 'input:first' ).val('');
    });

	var secretNumber;

	function newGame() {
		// Clear previous game (if any)
		$( 'ul#guessList' ).children().remove();
		$( 'span#count' ).text( $( 'ul#guessList' ).children().length );
		$( 'h2#feedback' )
			.text( 'Guess a number!' )
			.css( 'background-color', 'rgb(204, 50, 85)' );

		// Generate secret number
		function randNum(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		secretNumber = randNum(1, 100);
		console.log('New game started. Secret number: ' + secretNumber);
	}

	$( 'a.new' ).click(function() {
		newGame();
	});

	newGame();

});


