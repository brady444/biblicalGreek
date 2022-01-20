/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const Header = () => html
	`<div id = "header" class = "flex mediumFont">
		<a class = "smallPadding" onclick = ${ () => navigate ("main") }>Biblical Greek</a>
	</div>`;

const SectionGroup = content => html
	`<div class = "sectionGroup flexColumn largePadding">
		<div class = "flexTop extraLargeGap">${ content }</div>
	</div>`;

const Section = (name, content) => html
	`<div class = "flexColumn smallGap">
		<p class = "mediumFont">${ name }</p>
		
		${ content }
	</div>`;

const SectionLink = (text, onclick, href) => html
	`<a class = "sectionLink smallFont gray" onclick = ${ onclick } href = ${ href }>${ text }</a>`;

const ParadigmLabel = text => html
	`<p class = "paradigmLabel flex">${ text }</p>`;

const ParadigmElementStatic = element => html
	`<div class = "paradigmElement flex">
		<p class = ${ "flex answered" + (element.underlined ? " underlined" : "") }>${ element.text }</p>
	</div>`;

const ParadigmElement = element => html
	`<div class = "paradigmElement flex">
		<p class = ${ "flex" + (element.answered ?
			element.underlined ?
				" answered underlined" :
				" answered" :
			element.incorrect ?
				" incorrect" :
				"") } onclick = ${ () => {
			if (element.answered) {
				return;
			}
			
			//if answer is correct
			if (pageData.currentElement.text === element.text) {
				element.answered = true;
				
				//set incorrect to false for all elements
				for (let i = 0; i < pageData.currentElements.length; i++) {
					pageData.currentElements [i].incorrect = false;
				}
				
				pageData.remainingElements.splice (pageData.remainingElements.indexOf (pageData.currentElement), 1);
				
				if (pageData.remainingElements.length < 1) {
					pages [currentPage].setup ({
						paradigmName: pageData.paradigmName
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
		} }>${ element.answered ? element.text : null }</p>
	</div>`;

const ParadigmForm = square => html
	`<div class = "paradigmElement flex">
		<p class = ${ "flex" + (square.answered ?
			" answered" :
				square.incorrect ?
					" incorrect" :
					"") } onclick = ${ () => {
			if (square.answered) {
				return;
			}
			
			//if the answer is correct
			if (pageData.currentForm.text === square.text) {
				pageData.remainingMatches -= 1;
				
				square.answered = true;
				
				//if we have answered all squares for this form
				if (pageData.remainingMatches < 1) {
					//set incorrect to false for all squares
					for (let i = 0; i < Object.values (pageData.squares).length; i++) {
						Object.values (pageData.squares) [i].incorrect = false;
					}
					
					pageData.currentWord.forms.splice (pageData.currentWord.forms.indexOf (pageData.currentForm), 1);
					
					if (pageData.currentWord.forms.length < 1) {
						pageData.remainingWords.splice (pageData.remainingWords.indexOf (pageData.currentWord), 1);
						
						if (pageData.remainingWords.length < 1) {
							pages [currentPage].setup ();
						}
						
						else {
							//set answered to false for all squares
							for (let i = 0; i < Object.values (pageData.squares).length; i++) {
								Object.values (pageData.squares) [i].answered = false;
							}
							
							pageData.getNewWord ();
						}
					}
					
					else {
						pageData.getNewForm ();
					}
				}
			}
			
			else {
				square.incorrect = true;
			}
			
			update ();
		} }>${ square.answered ? square.text : null }</p>
	</div>`;

const ParadigmRow = (labelText, elements) => html
	`<div class = "paradigmRow flex mediumGap">
		${ ParadigmLabel (labelText) }
		
		${ elements }
	</div>`;

const Paradigm = elements => html
	`<div class = "paradigm flexColumn smallGap mediumPadding">
		<div class = "paradigmRow flex smallGap">
			${ ParadigmLabel () }
			${ ParadigmLabel ("Masculine (2nd)") }
			${ ParadigmLabel ("Feminine (1st)") }
			${ ParadigmLabel ("Neuter (2nd)") }
		</div>
		
		${ [
			ParadigmRow ("Nominative Singular", [
				elements [0],
				elements [1],
				elements [2]
			]),
			
			ParadigmRow ("Genitive Singular", [
				elements [3],
				elements [4],
				elements [5]
			]),
			
			ParadigmRow ("Dative Singular", [
				elements [6],
				elements [7],
				elements [8]
			]),
			
			ParadigmRow ("Accusative Singular", [
				elements [9],
				elements [10],
				elements [11]
			]),
			
			ParadigmRow ("Nominative Plural", [
				elements [12],
				elements [13],
				elements [14]
			]),
			
			ParadigmRow ("Genitive Plural", [
				elements [15],
				elements [16],
				elements [17]
			]),
			
			ParadigmRow ("Dative Plural", [
				elements [18],
				elements [19],
				elements [20]
			]),
			
			ParadigmRow ("Accusative Plural", [
				elements [21],
				elements [22],
				elements [23]
			])
		] }
	</div>`;

const Question = (text, underlined) => html
	`<div class = "flex">
		<p class = "extraLargeFont">Where does <span id = "questionElement" class = ${ underlined ? "underlined" : null }>${ text }</span> go?</p>
	</div>`;

const Word = (word, forms) => html
	`<div class = "vocabularyWord flexColumn mediumGap mediumPadding">
		<p class = "largeFont">${ word.lexicalForm }</p>
		
		${ word.vocabularyForm ? html
			`<p class = "smallFont">${ word.vocabularyForm }</p>` :
			null
		}
		
		<p class = "smallFont">${ word.definition }</p>
		
		<p class = "smallFont">Frequency: ${ word.frequency.toLocaleString () }</p>
		
		${ (forms || word.forms).length > 0 ? html
			`${ (forms || word.forms).map (form => html
				`<div class = "vocabularyForm flexColumnLeft extraSmallGap">
					<p class = "smallFont">${ form.text }</p>
					
					${ form.forms.map (_form => html
						`<p class = "smallFont gray">${ _form.case } ${ _form.number } ${ _form.gender }</p>`
					) }
				</div>`
			) }` :
			null
		}
	</div>`;