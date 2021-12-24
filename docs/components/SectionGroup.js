"use strict";

export default () => (name, content) => html
	`<div class = "sectionGroup flexColumnCenter largePadding">
		<p class = "largeFont">${ name }</p>
		
		<div class = "flexRowCenterStart largeGap">${ content }</div>
	</div>`
;