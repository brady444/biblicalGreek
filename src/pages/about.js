/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.about = {
	content: () => html
		`<div class = "pageContainer flexColumnTop extraExtraLargeGap mediumPadding">
			<div class = "flexColumnTop halfWidth largeGap">
				<p class = "smallFont">Contact: brady@bradywestveer.com</p>
				
				<p class = "smallFont">Some or all of the data on this website might be taken from or adapted from BillMounce.com, GNTReader.com, Basics of Biblical Greek Grammar (Zondervan Language Basics Series), and/or other outside sources.</p>
				
				<p class = "smallFont">Some or all of the data on this website might be modified from its original form.</p>
				
				<p class = "smallFont">Some or all of the data on this website might be missing, old, or inaccurate.</p>
				
				<p class = "extraSmallFont gray">Mounce, William D.. Basics of Biblical Greek Grammar (Zondervan Language Basics Series). Zondervan Academic. (text might be modified)</p>
			</div>
			
			${ constants.vocabularyErrors.scraperErrors.length > 0 || constants.vocabularyErrors.errors.length > 0 ? html
				`<div class = "flexColumnTop halfWidth largeGap">
					<p class = "smallFont">This website might use automated systems to retrieve and format data. These systems might output some potential inaccuracies or errors with the data. Some or all of the errors may be outdated or inaccurate. Some or all of the errors are listed below. Some of the errors might not be listed.</p>
					
					<div class = "flexColumnLeft smallGap">
						${ constants.vocabularyErrors.scraperErrors.map (error => html
							`<p class = "extraSmallFont">${ error }</p>`
						) }
						
						${ constants.vocabularyErrors.errors.map (error => html
							`<p class = "extraSmallFont">${ error }</p>`
						) }
					</div>
				</div>` :
				null
			}
		</div>`
};