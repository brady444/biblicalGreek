"use strict";

export default () => element => html
	`<div class = "flexRowCenter">
		<p class = "largePadding extraLargeFont">Where does <span id = "questionElement" class = ${ element.underlined ? "underlined" : null }>${ element.text }</span> go?</p>
	</div>`
;