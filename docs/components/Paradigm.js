"use strict";

export default () => elements => html
	`<div class = "paradigm flexColumnCenter mediumPadding mediumGap">
		<div class = "paradigmRow flexRowCenter mediumGap">
			${ ParadigmLabel () }
			${ ParadigmLabel ("Masculine (2nd)") }
			${ ParadigmLabel ("Feminine (1st)") }
			${ ParadigmLabel ("Neuter (2nd)") }
		</div>
		
		${ [
			ParadigmRow ("Nominative Singular", [elements [0], elements [1], elements [2]]),
			ParadigmRow ("Genitive Singular", [elements [3], elements [4], elements [5]]),
			ParadigmRow ("Dative Singular", [elements [6], elements [7], elements [8]]),
			ParadigmRow ("Accusative Singular", [elements [9], elements [10], elements [11]]),
			ParadigmRow ("Nominative Plural", [elements [12], elements [13], elements [14]]),
			ParadigmRow ("Genitive Plural", [elements [15], elements [16], elements [17]]),
			ParadigmRow ("Dative Plural", [elements [18], elements [19], elements [20]]),
			ParadigmRow ("Accusative Plural", [elements [21], elements [22], elements [23]])
		] }
	</div>`
;