/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.dictionary = {
	setup: () => {
		pageData.setWords = words => {
			pageData.words = {};
			
			for (let i = 0; i < words.length; i++) {
				const letter = utilities.simplifyGreek (words [i].lexicalForm.charAt (0)).toUpperCase ();
				
				if (pageData.words [letter] === undefined) {
					pageData.words [letter] = [];
				}
				
				pageData.words [letter].push (words [i]);
			}
		};
		
		pageData.setWords (constants.vocabulary);
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop">
			<div class = "inputContainer flex mediumPadding">
				<input class = "fullWidth mediumFont" placeholder = "Search..." oninput = ${ event => {
					pageData.setWords (constants.vocabulary.filter (word =>
						utilities.simplifyGreek (word.lexicalForm).includes (utilities.simplifyGreek (utilities.englishToGreek (event.target.value.trim ())))
					));
					
					update ();
				} } />
			</div>
			
			<div class = "fullWidth flexTop flexWrap">
				${ Object.keys (pageData.words).map (letter =>
					SectionGroup (
						Section (letter, html
							`<div class = "flex flexWrap largeGap">
								${ pageData.words [letter].map (word =>
									SectionLink (word.lexicalForm, "word/" + word.lexicalForm)
								) }
							</div>`
						)
					)
				) }
			</div>
		</div>`
};