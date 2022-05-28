/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const SectionGroup = content => html
	`<div class = "sectionGroup fullWidth flexColumn largePadding">
		<div class = "flexTop flexWrap extraExtraLargeGap">${ content }</div>
	</div>`;

const Section = (name, content) => html
	`<div class = "flexColumn smallGap">
		<p class = "mediumFont">${ name }</p>
		
		${ content }
	</div>`;

const SectionLink = (text, path, href) => html
	`<a class = "link smallFont gray" href = ${ path ? "#/" + path : href }>${ text }</a>`;

const ParadigmLabel = text => html`<div class = "paradigmLabel flexColumn flexExpand">
	${ text?.split ("\n").map (line => html
		`<p class = "mediumFont">${ line }</p>`
	) }
</div>`;

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
			`<div class = "fullWidth flex smallGap">
				${ ParadigmLabel () }
				
				${ columnLabels.map (label => ParadigmLabel (label)) }
			</div>` :
			null
		}
		
		${ rows.map (row => html
			`<div class = "fullWidth flex smallGap">
				${ ParadigmLabel (row.label) }
				
				${ row.elements.map (element => ParadigmElement (element, elementClickCallback)) }
			</div>`
		) }
	</div>`;

const Question = (text, underlined) => html
	`<div class = "flex">
		<p class = "extraExtraLargeFont">Where does <span class = ${ underlined ? "underlined" : null }>${ text }</span> go?</p>
	</div>`;