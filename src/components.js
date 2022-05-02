/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const SectionGroup = content => html
	`<div class = "sectionGroup flexColumn fullWidth largePadding">
		<div class = "flexTop flexWrap extraLargeGap">${ content }</div>
	</div>`;

const Section = (name, content) => html
	`<div class = "flexColumn smallGap">
		<p class = "mediumFont">${ name }</p>
		
		${ content }
	</div>`;

const SectionLink = (text, path, href) => html
	`<a class = "link smallFont gray" href = ${ path ? "#/" + path : href }>${ text }</a>`;

const ParadigmLabel = text => html
	`<p class = "paradigmLabel flex flexExpand mediumFont">${ text }</p>`;

const ParadigmElement = (element, onclick) => html
	`<div class = "flex flexExpand">
		<p class = ${ "paradigmElementText flex extraExtraLargeFont" + (element.answered ?
			element.underlined ?
				" answered underlined" :
				" answered" :
			element.incorrect ?
				" incorrect" :
				"") } onclick = ${ onclick ? () => onclick (element) : null }>${ element.answered ? element.text : null }</p>
	</div>`;

const Paradigm = (columnLabels, rows, elementClickCallback) => html
	`<div id = "paradigm" class = "flexColumn smallGap mediumPadding">
		${ columnLabels.length > 0 ? html
			`<div class = "flex fullWidth smallGap">
				${ ParadigmLabel () }
				
				${ columnLabels.map (label => ParadigmLabel (label)) }
			</div>` : null }
		
		${ rows.map (row => html
			`<div class = "flex fullWidth smallGap">
				${ ParadigmLabel (row.label) }
				
				${ row.elements.map (element => ParadigmElement (element, elementClickCallback)) }
			</div>`
		) }
	</div>`;

const Question = (text, underlined) => html
	`<div class = "flex">
		<p class = "extraExtraLargeFont">Where does <span class = ${ underlined ? "underlined" : null }>${ text }</span> go?</p>
	</div>`;

const Word = (word, forms) => html
	`<div class = "vocabularyWord flexColumnLeft mediumGap mediumPadding">
		<div class = "wordContainer flexColumnLeft mediumGap">
			<p class = "largeFont">${ word.lexicalForm }</p>
			
			${ word.vocabularyForm ? html
				`<p class = "smallFont">${ word.vocabularyForm }</p>` :
				null
			}
			
			${ word.transliteration || word.simplifiedTransliteration ? html
				`<p class = "smallFont">${ word.transliteration ?? word.simplifiedTransliteration }</p>` :
				null
			}
			
			${ word.type ? html
				`<p class = "smallFont">${ word.type }</p>` :
				null
			}
			
			<div class = "flexColumnLeft extraSmallGap">
				${ word.shortGloss.split ("\n").map (line => html
					`<p class = "smallFont">${ line }</p>`
				) }
			</div>
			
			${ word.strongsNumber || word.gkNumber ? html
				`<div class = "flexColumnLeft extraSmallGap">
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
			
			<p class = "smallFont">Chapter: ${ word.chapter }</p>
		</div>
		
		${ (forms || word.forms).length > 0 ? html
			`<p class = "smallFont">Forms:</p>
			
			${ (forms || word.forms).map (form => html
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