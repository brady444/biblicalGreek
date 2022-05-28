/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.word = {
	setup: path => {
		pageData.word = constants.vocabulary.find (word => word.lexicalForm === path [1]);
		
		if (pageData.word === undefined) {
			navigate ("dictionary");
			
			return false;
		}
	},
	
	content: () => html
		`<div class = "pageContainer flexTop extraExtraLargeGap mediumPadding">
			<div class = "wordContainer flexColumnLeft mediumGap">
				<p class = "extraExtraLargeFont">${ pageData.word.lexicalForm }</p>
				
				${ pageData.word.vocabularyForm ? html
					`<p class = "smallFont">${ pageData.word.vocabularyForm }</p>` :
					null
				}
				
				${ pageData.word.transliteration || pageData.word.simplifiedTransliteration ? html
					`<p class = "smallFont">${ pageData.word.transliteration ?? pageData.word.simplifiedTransliteration }</p>` :
					null
				}
				
				${ pageData.word.partOfSpeech ? html
					`<p class = "smallFont">${ pageData.word.partOfSpeech }</p>` :
					null
				}
				
				<div class = "flexColumnLeft extraSmallGap">
					${ pageData.word.shortGloss?.split ("\n").map (line => html
						`<p class = "smallFont">${ line }</p>`
					) }
					
					${ pageData.word.gloss?.split ("\n").map (line => html
						`<p class = "smallFont">${ line }</p>`
					) }
					
					${ pageData.word.definition?.split ("\n").map (line => html
						`<p class = "smallFont">${ line }</p>`
					) }
				</div>
				
				${ pageData.word.strongsNumber || pageData.word.gkNumber ? html
					`<div class = "flexColumnLeft extraSmallGap">
						${ pageData.word.strongsNumber ? html
							`<p class = "smallFont">Strong's Number: ${ pageData.word.strongsNumber }</p>` :
							null
						}
						
						${ pageData.word.gkNumber ? html
							`<p class = "smallFont">GK Number: ${ pageData.word.gkNumber }</p>` :
							null
						}
					</div>` :
					null
				}
				
				<p class = "smallFont">Frequency: ${ pageData.word.frequency.toLocaleString () }</p>
				
				<p class = "smallFont">Chapter: ${ pageData.word.chapter }</p>
				
				${ pageData.word.notes ? html
					`<div class = "flexColumnLeft extraSmallGap">
						${ pageData.word.notes?.split ("\n").map (line => html
							`<p class = "smallFont">${ line }</p>`
						) }
						
						<p class = "extraSmallFont gray">Mounce, William D.. Basics of Biblical Greek Grammar (Zondervan Language Basics Series). Zondervan Academic. (text might be modified)</p>
					</div>` :
					null
				}
				
				${ pageData.word.vocabularyUrlWord || pageData.word.dictionaryUrlWord ? html
					`<div class = "flexColumnLeft extraSmallGap">
						<p class = "smallFont">BillMounce.com</p>
						
						${ pageData.word.vocabularyUrlWord ? html
							`<a class = "link smallFont gray" href = ${ "https://www.billmounce.com/greekvocabulary/" + pageData.word.vocabularyUrlWord }>Vocabulary</p>` :
							null
						}
						
						${ pageData.word.dictionaryUrlWord ? html
							`<a class = "link smallFont gray" href = ${ "https://www.billmounce.com/greek-dictionary/" + pageData.word.dictionaryUrlWord }>Dictionary</p>` :
							null
						}
					</div>` :
					null
				}
			</div>
			
			${ pageData.word.forms.length > 0 ? html
				`<div class = "wordContainer flexColumnLeft largeGap">
					${ pageData.word.forms.map (form => html
						`<div class = "flexColumnLeft extraSmallGap">
							<p class = "smallFont">${ form.text }</p>
							
							${ form.uses.map (use => html
								`<p class = "smallFont gray">${ use.description }</p>`
							) }
						</div>`
					) }
				</div>` :
				null
			}
		</div>`
};