/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.parser = {
	setup: () => {
		pageData.parsedWords = [];
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
			<div class = "inputContainer flex">
				<input class = "fullWidth mediumFont" placeholder = "Enter Greek..." oninput = ${ event => {
					pageData.parsedWords = [];
					
					const inputWords = event.target.value
						.trim ()
						.split (" ")
						.map (word => utilities.englishToGreek (word));
					
					for (let i = 0; i < inputWords.length; i++) {
						for (let j = 0; j < constants.vocabulary.length; j++) {
							const word = JSON.parse (JSON.stringify (constants.vocabulary [j]));
							
							if (word.forms.length > 0) {
								const forms = [];
								
								for (let k = 0; k < word.forms.length; k++) {
									if (utilities.simplifyGreek (word.forms [k].text) === utilities.simplifyGreek (inputWords [i])) {
										forms.push (word.forms [k]);
									}
								}
								
								if (forms.length > 0) {
									word.forms = forms;
									
									pageData.parsedWords.push (word);
								}
							}
							
							else if (utilities.simplifyGreek (word.lexicalForm) === utilities.simplifyGreek (inputWords [i])) {
								pageData.parsedWords.push (word);
							}
						}
					}
					
					update ();
				} } />
			</div>
			
			<div class = "parseResults fullWidth flexTop flexWrap mediumGap">
				${ pageData.parsedWords.map (word => html
					`<div class = "wordContainer flexColumnLeft mediumGap mediumPadding">
						<p class = "extraExtraLargeFont">${ word.lexicalForm }</p>
						
						${ word.vocabularyForm ? html
							`<p class = "smallFont">${ word.vocabularyForm }</p>` :
							null
						}
						
						${ word.partOfSpeech ? html
							`<p class = "smallFont">${ word.partOfSpeech }</p>` :
							null
						}
						
						<div class = "flexColumnLeft extraSmallGap">
							${ word.shortGloss?.split ("\n").map (line => html
								`<p class = "smallFont">${ line }</p>`
							) }
							
							${ word.gloss?.split ("\n").map (line => html
								`<p class = "smallFont">${ line }</p>`
							) }
							
							${ word.definition?.split ("\n").map (line => html
								`<p class = "smallFont">${ line }</p>`
							) }
						</div>
						
						${ word.forms.length > 0 ? html
							`<div class = "flexColumnLeft largeGap">
								${ word.forms.map (form => html
									`<div class = "flexColumnLeft extraSmallGap">
										<p class = "largeFont">${ form.text }</p>
										
										${ form.uses.map (use => html
											`<p class = "smallFont gray">${ use.case } ${ use.tense } ${ use.voice } ${ use.mood } ${ use.person } ${ use.number } ${ use.gender } ${ use.declension } ${ use.superiority } ${ use.partOfSpeech } (${ use.frequency.toLocaleString () })</p>`
										) }
									</div>`
								) }
							</div>` :
							null
						}
						
						${ SectionLink ("Dictionary", "word/" + word.lexicalForm) }
					</div>`
				) }
			</div>
		</div>`
};