/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.viewParadigms = {
	setup: data => {
		pageData.paradigm = JSON.parse (JSON.stringify (constants.paradigms [data.paradigmName]));
		
		for (let i = 0; i < pageData.paradigm.rows.length; i++) {
			for (let j = 0; j < pageData.paradigm.rows [i].elements.length; j++) {
				pageData.paradigm.rows [i].elements [j].answered = true;
			}
		}
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
			
			${ Paradigm (pageData.paradigm.columnLabels, pageData.paradigm.rows) }
		</div>`
};