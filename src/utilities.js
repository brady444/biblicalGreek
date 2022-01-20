const utilities = {
	randomInteger: (minimum, maximum) =>
		Math.floor (Math.random () * (maximum - minimum + 1)) + minimum,
	
	randomElement: array =>
		array [utilities.randomInteger (0, array.length - 1)],
	
	simplifyWord: word =>
		word.normalize ("NFD")
			.replaceAll (/\p{Diacritic}/gu, "")
			.replaceAll ("ς", "σ")
			.replaceAll ("⸂", "")
			.replaceAll ("⸃", "")
};