/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const Header = () => html
	`<div id = "header" class = "flexRowCenter mediumFont">
		<a class = "smallPadding" onclick = ${ () => navigate ("main") }>Biblical Greek</a>
	</div>`;

const SectionGroup = (name, content) => html
	`<div class = "sectionGroup flexColumnCenter largePadding">
		<p class = "largeFont">${ name }</p>
		
		<div class = "flexRowCenterStart extraLargeGap">${ content }</div>
	</div>`;

const Section = (name, content) => html
	`<div class = "flexColumnCenter smallGap">
		<p class = "mediumFont">${ name }</p>
		
		${ content }
	</div>`;

const SectionLink = (text, onclick, href) => html
	`<a class = "sectionLink smallFont" onclick = ${ onclick } href = ${ href }>${ text }</a>`;

const ParadigmLabel = text => html
	`<p class = "paradigmLabel flexRowCenter">${ text }</p>`;

const ParadigmElementStatic = element => html
	`<div class = "paradigmElement flexRowCenter">
		<p class = ${ "flexRowCenter answered" + (element.underlined ? " underlined" : "") }>${ element.text }</p>
	</div>`;

const ParadigmElement = element => html
	`<div class = "paradigmElement flexRowCenter">
		<p class = ${ "flexRowCenter" + (element.answered ?
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
	`<div class = "paradigmElement flexRowCenter">
		<p class = ${ "flexRowCenter" + (square.answered ?
			" answered" :
				square.incorrect ?
					" incorrect" :
					"") } onclick = ${ () => {
			if (square.answered) {
				return;
			}
			
			const caseIndex = pageData.currentForm.cases.indexOf (square.form.case);
			const numberIndex = pageData.currentForm.numbers.indexOf (square.form.number);
			const genderIndex = pageData.currentForm.genders.indexOf (square.form.gender);
			
			//if the answer is correct
			if (caseIndex > -1 && numberIndex > -1 && genderIndex > -1) {
				pageData.currentForm.remainingMatches -= 1;
				
				square.answered = true;
				
				//if we have answered all squares for this form
				if (pageData.currentForm.remainingMatches < 1) {
					//set incorrect and answered to false for all squares
					for (let i = 0; i < pageData.squares.length; i++) {
						pageData.squares [i].answered = false;
						pageData.squares [i].incorrect = false;
					}
					
					pageData.currentWord.forms.splice (pageData.currentWord.forms.indexOf (pageData.currentForm), 1);
					
					if (pageData.currentWord.forms.length < 1) {
						pageData.remainingWords.splice (pageData.remainingWords.indexOf (pageData.currentWord), 1);
					}
					
					if (pageData.remainingWords.length < 1) {
						pages [currentPage].setup ();
					}
					
					else {
						pageData.currentWord = utilities.randomElement (pageData.remainingWords);
						
						pageData.currentForm = utilities.randomElement (pageData.currentWord.forms);
						
						pageData.currentForm.remainingMatches = pageData.currentForm.cases.length * pageData.currentForm.numbers.length * pageData.currentForm.genders.length;
					}
				}
			}
			
			else {
				square.incorrect = true;
			}
			
			update ();
		} }>${ square.answered ? pageData.currentForm.text : null }</p>
	</div>`;

const ParadigmRow = (labelText, elements) => html
	`<div class = "paradigmRow flexRowCenter">
		${ ParadigmLabel (labelText) }
		
		${ elements }
	</div>`;

const Paradigm = elements => html
	`<div class = "paradigm flexColumnCenter smallGap mediumPadding">
		<div class = "paradigmRow flexRowCenter smallGap">
			${ ParadigmLabel () }
			${ ParadigmLabel ("Masculine (2nd)") }
			${ ParadigmLabel ("Feminine (1st)") }
			${ ParadigmLabel ("Neuter (2nd)") }
		</div>
		
		${ [
			ParadigmRow ("Nominative Singular", [elements [0], elements [1], elements [2]]),
			ParadigmRow ("Genitive Singular", [elements [3], elements [4], elements [5]]),
			ParadigmRow ("Dative Singular", [elements [6], elements [7], elements [8]]),
			ParadigmRow ("Accusative Singular", [elements [9], elements [10], elements [11]]),
			ParadigmRow ("Nominative Plural", [elements [12], elements [13], elements [14]]),
			ParadigmRow ("Genitive Plural", [elements [15], elements [16], elements [17]]),
			ParadigmRow ("Dative Plural", [elements [18], elements [19], elements [20]]),
			ParadigmRow ("Accusative Plural", [elements [21], elements [22], elements [23]])
		] }
	</div>`;

const Question = (text, underlined) => html
	`<div class = "flexRowCenter">
		<p class = "mediumPadding extraLargeFont">Where does <span id = "questionElement" class = ${ underlined ? "underlined" : null }>${ text }</span> go?</p>
	</div>`;