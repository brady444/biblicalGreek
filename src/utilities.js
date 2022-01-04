const utilities = {
	randomInteger: (minimum, maximum) =>
		Math.floor (Math.random () * (maximum - minimum + 1)) + minimum,
	
	randomElement: array =>
		array [utilities.randomInteger (0, array.length - 1)]
};