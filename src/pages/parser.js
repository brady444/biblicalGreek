/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.parser = {
	setup: () => {
		pageData.words = [];
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
			<div class = "inputContainer flex">
				<input class = "fullWidth mediumFont" placeholder = "Enter Greek..." oninput = ${ event => {
					pageData.words = [];
					
					const words = event.target.value
						.trim ()
						.split (" ")
						.map (word => utilities.simplifyGreek (utilities.englishToGreek (word)));
					
					for (let i = 0; i < words.length; i++) {
						for (let j = 0; j < constants.vocabulary.length; j++) {
							if (constants.vocabulary [j].forms.length === 0 && utilities.simplifyGreek (constants.vocabulary [j].lexicalForm) === utilities.simplifyGreek (words [i])) {
								pageData.words.push ({
									word: constants.vocabulary [j]
								});
							}
							
							else {
								const forms = [];
								
								for (let k = 0; k < constants.vocabulary [j].forms.length; k++) {
									if (utilities.simplifyGreek (constants.vocabulary [j].forms [k].text) === utilities.simplifyGreek (words [i])) {
										forms.push (constants.vocabulary [j].forms [k]);
									}
								}
								
								if (forms.length > 0) {
									pageData.words.push ({
										word: constants.vocabulary [j],
										forms: forms
									});
								}
							}
						}
					}
					
					update ();
				} } />
			</div>
			
			<div class = "flexTop flexWrap mediumGap">
				${ pageData.words.map (word => Word (word.word, word.forms)) }
			</div>
		</div>`
};