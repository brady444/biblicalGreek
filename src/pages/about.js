/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.about = {
	content: () => html
		`<div class = "pageContainer flexColumnTop extraExtraLargeGap mediumPadding">
			<div class = "flexColumnTop smallGap">
				<p class = "mediumFont">About this website:</p>
				
				<p class = "smallFont">Data is/may be taken from BillMounce.com, Basics of Biblical Greek, and GNTReader.com.</p>
				
				<p class = "smallFont">Some data is modified.</p>
				
				<p class = "smallFont">Data may be missing, old, or inaccurate.</p>
				
				<p class = "smallFont">Contact: brady@bradywestveer.com</p>
			</div>
			
			<div class = "flexColumnTop smallGap">
				<p class = "mediumFont">Potential errors with data (errors may be missing, old, or inaccurate):</p>
				
				<div class = "flexColumnLeft">
					${ constants.vocabularyErrors.scraperErrors.map (error => html
						`<p class = "smallFont">${ error }</p>`
					) }
					
					${ constants.vocabularyErrors.errors.map (error => html
						`<p class = "smallFont">${ error }</p>`
					) }
				</div>
			</div>
		</div>`
};