/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.word = {
	setup: path => {
		pageData.word = constants.vocabulary.find (word => word.lexicalForm === path [1]);
		
		if (pageData.word === undefined) {
			navigate ("dictionary");
		}
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
			${ Word (pageData.word) }
		</div>`
};