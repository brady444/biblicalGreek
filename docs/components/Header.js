"use strict";

export default () => html
	`<div id = "header" class = "flexRowCenter mediumFont">
		<a class = "smallPadding" onclick = ${ () => {
			navigate ("");
		} }>Biblical Greek</a>
	</div>`
;