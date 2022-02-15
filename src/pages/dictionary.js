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
			<input class = "mediumMargin mediumFont" placeholder = "Search..." oninput = ${ event => {
				pageData.setWords (constants.vocabulary.filter (word =>
					utilities.simplifyGreek (word.lexicalForm).includes (utilities.simplifyGreek (utilities.englishToGreek (event.target.value)))
				));
				
				update ();
			} } />
			
			<div class = "flexTop flexWrap fullWidth">
				${ Object.keys (pageData.words).map (letter =>
					SectionGroup (
						Section (letter, html
							`<div class = "flex flexWrap largeGap">
								${ pageData.words [letter].map (word =>
									SectionLink (word.lexicalForm, () => navigate ("word", {
										word: word
									}))
								) }
							</div>`
						)
					)
				) }
			</div>
		</div>`
};