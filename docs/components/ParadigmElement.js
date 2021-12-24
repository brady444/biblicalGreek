"use strict";

export default () => element => html
	`<div class = "paradigmElement flexRowCenter">
		<p class = ${ "flexRowCenter" + (element.answered ? (element.underlined ? " answered underlined" : " answered") : (element.incorrect ? " incorrect" : "")) } onclick = ${ () => {
			if (element.answered) {
				return;
			}
			
			if (pageData.remainingElements [pageData.questionElementIndex].text === element.text) {
				element.answered = true;
				
				for (let i = 0; i < pageData.currentElements.length; i++) {
					pageData.currentElements [i].incorrect = false;
				}
				
				pageData.remainingElements.splice (pageData.questionElementIndex, 1);
				
				if (pageData.remainingElements.length < 1) {
					pages [currentPage].setup ({
						elements: pageData.elements
					});
				}
				
				else {
					pageData.questionElementIndex = utilities.randomInteger (0, pageData.remainingElements.length - 1);
				}
			}
			
			else {
				element.incorrect = true;
			}
			
			update ();
		} }>${ element.answered ? element.text : null }</p>
	</div>`
;