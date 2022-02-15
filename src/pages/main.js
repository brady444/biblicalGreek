/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.main = {
	content: () => html
		`<div class = "pageContainer flexColumnTop fullWidth">
			${ SectionGroup ([
				Section ("Bill Mounce", [
					SectionLink ("BillMounce.com", null, "https://billmounce.com"),
					
					SectionLink ("Dictionary", null, "https://www.billmounce.com/greek-dictionary"),
					
					SectionLink ("Workbook Answer Key", null, "http://doxa.billmounce.com.s3.amazonaws.com/bbg4_answer_key.pdf")
				]),
				
				Section ("New Testament", [
					SectionLink ("Reader", null, "https://www.gntreader.com"),
					
					SectionLink ("Interlinear", null, "https://www.abarim-publications.com/Interlinear-New-Testament")
				])
			]) }
			
			${ SectionGroup ([
				Section ("Vocabulary", [
					SectionLink ("Dictionary", () => navigate ("dictionary")),
					
					SectionLink ("Practice", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary")
				]),
				
				Section ("Paradigms", [
					SectionLink ("View", () => navigate ("viewParadigms", {
						paradigmName: Object.keys (constants.paradigms) [0]
					})),
					
					SectionLink ("Practice", () => navigate ("practiceParadigms", {
						paradigmName: Object.keys (constants.paradigms) [0]
					}))
				]),
				
				Section ("Parsing", [
					SectionLink ("Parser", () => navigate ("parser")),
					
					SectionLink ("Practice", () => navigate ("practiceParsing", { forms: constants.parsingForms }))
				])
			]) }
			
			${ SectionGroup ([
				Section ("Other", [
					SectionLink ("Windows Typing Guide", null, "https://www.ctsfw.edu/wp-content/uploads/2016/02/Greek-Unicode-Keyboard-Input-Windows-10.pdf"),
					
					SectionLink ("About", () => navigate ("about"))
				])
			]) }
		</div>`
};