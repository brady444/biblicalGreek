/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.main = {
	content: () => html
		`<div class = "pageContainer flexColumnTop">
			${ SectionGroup ([
				Section ("Bill Mounce", [
					SectionLink ("BillMounce.com", null, "https://billmounce.com"),
					
					SectionLink ("Workbook Answer Key", null, "http://doxa.billmounce.com.s3.amazonaws.com/bbg4_answer_key.pdf")
				]),
				
				Section ("New Testament", [
					SectionLink ("Reader", null, "https://www.gntreader.com"),
					
					SectionLink ("Interlinear", null, "https://bible.xojocloud.net/")
				])
			]) }
			
			${ SectionGroup ([
				Section ("Vocabulary", [
					SectionLink ("Dictionary", "dictionary"),
					
					SectionLink ("Practice", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary")
				]),
				
				Section ("Paradigms", [
					SectionLink ("View", "paradigm"),
					
					SectionLink ("Practice", "practiceParadigm")
				]),
				
				Section ("Parsing", [
					SectionLink ("Parser", "parser"),
					
					SectionLink ("Practice", "practiceParsing")
				])
			]) }
			
			${ SectionGroup ([
				Section ("Other", [
					SectionLink ("Scrabble", "scrabble"),
					
					SectionLink ("About", "about")
				])
			]) }
		</div>`
};