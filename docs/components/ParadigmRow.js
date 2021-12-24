"use strict";

export default () => (labelText, row) => html
	`<div class = "paradigmRow flexRowCenter">
		${ ParadigmLabel (labelText) }
		
		${ row.map (element => ParadigmElement (element)) }
	</div>`
;