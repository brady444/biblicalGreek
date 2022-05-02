/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.paradigm = {
	setup: path => {
		pageData.setParadigm = paradigmName => {
			pageData.paradigmName = paradigmName;
			
			//change path
			utilities.setPath (path [0] + "/" + paradigmName.replaceAll (" ", ""));
			
			pageData.paradigm = JSON.parse (JSON.stringify (constants.paradigms [paradigmName]));
			
			for (let i = 0; i < pageData.paradigm.rows.length; i++) {
				for (let j = 0; j < pageData.paradigm.rows [i].elements.length; j++) {
					pageData.paradigm.rows [i].elements [j].answered = true;
				}
			}
		};
		
		pageData.setParadigm (Object.keys (constants.paradigms).find (paradigm => paradigm.replaceAll (" ", "") === path [1]) || Object.keys (constants.paradigms) [0]);
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
			<select class = "mediumFont" onchange = ${ event => {
				pageData.setParadigm (event.target.value);
				
				update ();
			} }>
				${ Object.keys (constants.paradigms).map (paradigm => html`<option ?selected = ${ paradigm === pageData.paradigmName }>${ paradigm }</option>`) }
			</select>
			
			${ Paradigm (pageData.paradigm.columnLabels, pageData.paradigm.rows) }
		</div>`
};