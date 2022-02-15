/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.word = {
	setup: data => {
		pageData.word = data.word;
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
			${ Word (pageData.word) }
		</div>`
};