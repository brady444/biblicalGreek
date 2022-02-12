/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const Header = () => html
	`<div id = "header" class = "flex fullWidth mediumFont">
		<a class = "smallPadding" onclick = ${ () => navigate ("main") }>Biblical Greek</a>
	</div>`;

const SectionGroup = content => html
	`<div class = "sectionGroup flexColumn fullWidth largePadding">
		<div class = "flexTop flexWrap extraLargeGap">${ content }</div>
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

const ParadigmElement = (element, clickCallback) => html
	`<div class = "paradigmElement flex">
		<p class = ${ "flex" + (element.answered ?
			element.underlined ?
				" answered underlined" :
				" answered" :
			element.incorrect ?
				" incorrect" :
				"") } onclick = ${ clickCallback ? () => clickCallback (element) : null }>${ element.answered ? element.text : null }</p>
	</div>`;

const Paradigm = (columnLabels, rows, elementClickCallback) => html
	`<div class = "paradigm flexColumn smallGap mediumPadding">
		${ columnLabels.length > 0 ? html
			`<div class = "paradigmRow flex smallGap">
				${ ParadigmLabel () }
				
				${ columnLabels.map (label => ParadigmLabel (label)) }
			</div>` : null }
		
		${ rows.map (row => html
			`<div class = "paradigmRow flex mediumGap">
				${ ParadigmLabel (row.label) }
				
				${ row.elements.map (element => ParadigmElement (element, elementClickCallback)) }
			</div>`
		) }
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
		
		${ word.type ? html
			`<p class = "smallFont">${ word.type }</p>` :
			null
		}
		
		${ word.strongsNumber || word.gkNumber ? html
			`<div class = "flexColumn extraSmallGap">
				${ word.strongsNumber ? html
					`<p class = "smallFont">Strong's Number: ${ word.strongsNumber }</p>` :
					null
				}
				
				${ word.gkNumber ? html
					`<p class = "smallFont">GK Number: ${ word.gkNumber }</p>` :
					null
				}
			</div>` :
			null
		}
		
		<p class = "smallFont">Frequency: ${ word.frequency.toLocaleString () }</p>
		
		<div class = "flexColumn extraSmallGap">
			${ word.shortGloss.split ("\n").map (line => html`<p class = "smallFont">${ line }</p>`) }
		</div>
		
		${ (forms || word.forms).length > 0 ? html
			`${ (forms || word.forms).map (form => html
				`<div class = "fullWidth flexColumnLeft extraSmallGap">
					<p class = "smallFont">${ form.text }</p>
					
					${ form.uses.map (use => html
						`<p class = "smallFont gray">${ use.case } ${ use.number } ${ use.gender } (${ use.frequency.toLocaleString () })</p>`
					) }
				</div>`
			) }` :
			null
		}
	</div>`;