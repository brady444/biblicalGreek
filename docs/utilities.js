"use strict";

export default {
	randomInteger: (minimum, maximum) => {
		return Math.floor (Math.random () * (maximum - minimum + 1)) + minimum;
	}
};