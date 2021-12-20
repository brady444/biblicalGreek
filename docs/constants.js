"use strict";

export default {
	paradigmRowLabels: [
		"Nominative Singular",
		"Genitive Singular",
		"Dative Singular",
		"Accusative Singular",
		"Nominative Plural",
		"Genitive Plural",
		"Dative Plural",
		"Accusative Plural"
	],
	
	paradigms: [
		{
			name: "Case Endings",
			imageSrc: "/res/caseEndingsParadigm.png",
			
			elements: [
				{text: "ς"},
				{text: "–"},
				{text: "ν"},
				{text: "υ"},
				{text: "ς"},
				{text: "υ"},
				{text: "ͺ"},
				{text: "ͺ"},
				{text: "ͺ"},
				{text: "ν"},
				{text: "ν"},
				{text: "ν"},
				{text: "ι"},
				{text: "ι"},
				{text: "α", underlined: true},
				{text: "ων", underlined: true},
				{text: "ων", underlined: true},
				{text: "ων", underlined: true},
				{text: "ις"},
				{text: "ις"},
				{text: "ις"},
				{text: "υς"},
				{text: "ς"},
				{text: "α", underlined: true}
			]
		},
		
		{
			name: "The Article",
			imageSrc: "/res/theArticleParadigm.png",
			
			elements: [
				{text: "ὁ"},
				{text: "ἡ"},
				{text: "τό"},
				{text: "τοῦ"},
				{text: "τῆς"},
				{text: "τοῦ"},
				{text: "τῷ"},
				{text: "τῇ"},
				{text: "τῷ"},
				{text: "τόν"},
				{text: "τήν"},
				{text: "τό"},
				{text: "οἱ"},
				{text: "αἱ"},
				{text: "τά"},
				{text: "τῶν"},
				{text: "τῶν"},
				{text: "τῶν"},
				{text: "τοῖς"},
				{text: "ταῖς"},
				{text: "τοῖς"},
				{text: "τούς"},
				{text: "τάς"},
				{text: "τά"}
			]
		},
		
		{
			name: "The 3rd Person Pronoun",
			imageSrc: "/res/the3rdPersonPronounParadigm.png",
			
			elements: [
				{text: "αὐτός"},
				{text: "αὐτή"},
				{text: "αὐτό"},
				{text: "αὐτοῦ"},
				{text: "αὐτῆς"},
				{text: "αὐτοῦ"},
				{text: "αὐτῷ"},
				{text: "αὐτῇ"},
				{text: "αὐτῷ"},
				{text: "αὐτόν"},
				{text: "αὐτήν"},
				{text: "αὐτό"},
				{text: "αὐτοί"},
				{text: "αὐταί"},
				{text: "αὐτά"},
				{text: "αὐτῶν"},
				{text: "αὐτῶν"},
				{text: "αὐτῶν"},
				{text: "αὐτοῖς"},
				{text: "αὐταῖς"},
				{text: "αὐτοῖς"},
				{text: "αὐτούς"},
				{text: "αὐτάς"},
				{text: "αὐτά"}
			]
		}
	]
	
	// paradigms: [
	// 	{
	// 		name: "Case Endings",
	// 		rows: [
	// 			[
	// 				{text: "ς"},
	// 				{text: "–"},
	// 				{text: "ν"}
	// 			],
				
	// 			[
	// 				{text: "υ"},
	// 				{text: "ς"},
	// 				{text: "υ"}
	// 			],
				
	// 			[
	// 				{text: "ͺ"},
	// 				{text: "ͺ"},
	// 				{text: "ͺ"}
	// 			],
				
	// 			[
	// 				{text: "ν"},
	// 				{text: "ν"},
	// 				{text: "ν"}
	// 			],
				
	// 			[
	// 				{text: "ι"},
	// 				{text: "ι"},
	// 				{text: "α", underlined: true}
	// 			],
				
	// 			[
	// 				{text: "ων", underlined: true},
	// 				{text: "ων", underlined: true},
	// 				{text: "ων", underlined: true}
	// 			],
				
	// 			[
	// 				{text: "ις"},
	// 				{text: "ις"},
	// 				{text: "ις"}
	// 			],
				
	// 			[
	// 				{text: "υς"},
	// 				{text: "ς"},
	// 				{text: "α", underlined: true}
	// 			]
	// 		]
	// 	},
		
	// 	{
	// 		name: "The Article",
	// 		rows: [
	// 			[
	// 				{text: "ὁ"},
	// 				{text: "ἡ"},
	// 				{text: "τό"}
	// 			],
				
	// 			[
	// 				{text: "τοῦ"},
	// 				{text: "τῆς"},
	// 				{text: "τοῦ"}
	// 			],
				
	// 			[
	// 				{text: "τῷ"},
	// 				{text: "τῇ"},
	// 				{text: "τῷ"}
	// 			],
				
	// 			[
	// 				{text: "τόν"},
	// 				{text: "τήν"},
	// 				{text: "τό"}
	// 			],
				
	// 			[
	// 				{text: "οἱ"},
	// 				{text: "αἱ"},
	// 				{text: "τά"}
	// 			],
				
	// 			[
	// 				{text: "τῶν"},
	// 				{text: "τῶν"},
	// 				{text: "τῶν"}
	// 			],
				
	// 			[
	// 				{text: "τοῖς"},
	// 				{text: "ταῖς"},
	// 				{text: "τοῖς"}
	// 			],
				
	// 			[
	// 				{text: "τούς"},
	// 				{text: "τάς"},
	// 				{text: "τά"}
	// 			]
	// 		]
	// 	},
		
	// 	{
	// 		name: "The 3rd Person Pronoun",
	// 		rows: [
	// 			[
	// 				{text: "αὐτός"},
	// 				{text: "αὐτή"},
	// 				{text: "αὐτό"}
	// 			],
				
	// 			[
	// 				{text: "αὐτοῦ"},
	// 				{text: "αὐτῆς"},
	// 				{text: "αὐτοῦ"}
	// 			],
				
	// 			[
	// 				{text: "αὐτῷ"},
	// 				{text: "αὐτῇ"},
	// 				{text: "αὐτῷ"}
	// 			],
				
	// 			[
	// 				{text: "αὐτόν"},
	// 				{text: "αὐτήν"},
	// 				{text: "αὐτό"}
	// 			],
				
	// 			[
	// 				{text: "αὐτοί"},
	// 				{text: "αὐταί"},
	// 				{text: "αὐτά"}
	// 			],
				
	// 			[
	// 				{text: "αὐτῶν"},
	// 				{text: "αὐτῶν"},
	// 				{text: "αὐτῶν"}
	// 			],
				
	// 			[
	// 				{text: "αὐτοῖς"},
	// 				{text: "αὐταῖς"},
	// 				{text: "αὐτοῖς"}
	// 			],
				
	// 			[
	// 				{text: "αὐτούς"},
	// 				{text: "αὐτάς"},
	// 				{text: "αὐτά"}
	// 			],
	// 		]
	// 	}
	// ]
};