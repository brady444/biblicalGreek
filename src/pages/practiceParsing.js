/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.practiceParsing = {
	setup: () => {
		pageData.remainingForms = [];
		
		for (let i = 0; i < constants.vocabulary.length; i++) {
			for (let j = 0; j < constants.vocabulary [i].forms.length; j++) {
				pageData.remainingForms.push (constants.vocabulary [i].forms [j]);
			}
		}
		
		pageData.reset = () => {
			pageData.currentForm = utilities.randomElement (pageData.remainingForms);
			
			console.log (pageData.currentForm);
			console.log (constants.formUseProperties);
		};
		
		pageData.reset ();
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
			<div class = "centerContainer smallWidth flexColumn mediumGap">
				<p class = "extraExtraLargeFont">${ pageData.currentForm.text }</p>
				
				<div class = "flex mediumGap">
					<input class = "fullWidth mediumFont" placeholder = "Lexical form..." />
					
					<button class = "mediumFont">Submit</button>
				</div>
				
				<div class = "fullWidth flexColumn mediumGap">
					${ pageData.currentForm.uses.map (use => html
						`${ Object.keys (use)
							.filter (property => property !== "frequency" && property !== "partOfSpeech" && property !== "description")
								.map (property => html
									`<p class = "mediumFont">${ property.charAt (0).toUpperCase () + property.slice (1) }</p>
									
									<select class = "fullWidth mediumFont">
										${ constants.formUseProperties [property].map (value => html
											`<option class = "mediumFont">${ value.charAt (0).toUpperCase () + value.slice (1) }</option>`
										) }
									</select>`
						) }`
					) }
				</div>
			</div>
		</div>`
};