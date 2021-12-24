"use strict";

export default () => (name, content) => html
	`<div class = "mediumGap flexColumnCenter">
		${ SectionHeader (name) }
		
		${ content }
	</div>`
;