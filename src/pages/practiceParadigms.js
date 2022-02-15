/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.practiceParadigms = {
	setup: data => {
		pageData.paradigm = JSON.parse (JSON.stringify (constants.paradigms [data.paradigmName]));
		
		pageData.remainingElements = [];
		
		for (let i = 0; i < pageData.paradigm.rows.length; i++) {
			//todo remove, don't use empty elements in paradigms, replace loop with below concat
			// pageData.remainingElements = pageData.remainingElements.concat (pageData.paradigm.rows [i].elements);
			for (let j = 0; j < pageData.paradigm.rows [i].elements.length; j++) {
				if (pageData.paradigm.rows [i].elements [j].text !== undefined) {
					pageData.remainingElements.push (pageData.paradigm.rows [i].elements [j]);
				}
			}
		}
		
		pageData.currentElement = utilities.randomElement (pageData.remainingElements);
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
			<select class = "mediumFont" onchange = ${ event => {
				pages [currentPage].setup ({
					paradigmName: event.target.value
				});
				
				update ();
			} }>
				${ Object.keys (constants.paradigms).map (paradigm => html`<option class = "smallFont">${ paradigm }</option>`) }
			</select>
			
			${ Paradigm (pageData.paradigm.columnLabels, pageData.paradigm.rows, element => {
				if (element.answered) {
					return;
				}
				
				//if answer is correct
				if (pageData.currentElement.text === element.text) {
					element.answered = true;
					
					//set incorrect to false for all elements
					for (let i = 0; i < pageData.remainingElements.length; i++) {
						pageData.remainingElements [i].incorrect = false;
					}
					
					pageData.remainingElements.splice (pageData.remainingElements.indexOf (element), 1);
					
					if (pageData.remainingElements.length < 1) {
						pages [currentPage].setup ({
							paradigmName: pageData.paradigm.name
						});
					}
					
					else {
						pageData.currentElement = utilities.randomElement (pageData.remainingElements);
					}
				}
				
				else {
					element.incorrect = true;
				}
				
				update ();
			}) }
			
			${ Question (pageData.currentElement.text, pageData.currentElement.underlined) }
		</div>`
};