"use strict";

const sectionButtons = document.getElementById ("sectionButtons");
const paradigms = document.getElementById ("paradigms");

const caseEndingsParadigmButton = document.getElementById ("caseEndingsParadigmButton");
const articleParadigmButton = document.getElementById ("articleParadigmButton");
const thirdPersonPronounParadigmButton = document.getElementById ("thirdPersonPronounParadigmButton");

const paradigm = document.getElementById ("paradigm");

const questionText = document.getElementById ("questionText");
const questionElement = document.getElementById ("questionElement");

const paradigmElements = document.getElementsByClassName ("paradigmElement");

const caseEndings = [
	{text: "ς", underlined: false},
	{text: "–", underlined: false},
	{text: "ν", underlined: false},
	{text: "υ", underlined: false},
	{text: "ς", underlined: false},
	{text: "υ", underlined: false},
	{text: "ͺ", underlined: false},
	{text: "ͺ", underlined: false},
	{text: "ͺ", underlined: false},
	{text: "ν", underlined: false},
	{text: "ν", underlined: false},
	{text: "ν", underlined: false},
	{text: "ι", underlined: false},
	{text: "ι", underlined: false},
	{text: "α", underlined: true},
	{text: "ων", underlined: true},
	{text: "ων", underlined: true},
	{text: "ων", underlined: true},
	{text: "ις", underlined: false},
	{text: "ις", underlined: false},
	{text: "ις", underlined: false},
	{text: "υς", underlined: false},
	{text: "ς", underlined: false},
	{text: "α", underlined: true}
];

const articles = [
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
];

const thirdPersonPronouns = [
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
];

let answers = [];

let remainingAnswers = [];

let currentAnswerIndex;

const randomInteger = (minimum, maximum) => {
	return Math.floor (Math.random () * (maximum - minimum + 1)) + minimum;
};

const clearParadigmElements = () => {
	for (let i = 0; i < paradigmElements.length; i++) {
		paradigmElements [i].firstElementChild.textContent = "";
		
		paradigmElements [i].firstElementChild.classList.remove ("answered");
	}
};

const updateQuestion = () => {
	if (remainingAnswers.length === 0) {
		remainingAnswers = [...answers];
		
		clearParadigmElements ();
	}
	
	currentAnswerIndex = randomInteger (0, remainingAnswers.length - 1);
	
	const caseEnding = remainingAnswers [currentAnswerIndex];
	
	questionElement.innerText = caseEnding.text;
	
	questionElement.classList.remove ("underlined");
	
	if (caseEnding.underlined) {
		questionElement.classList.add ("underlined");
	}
};

const setupElements = () => {
	for (let i = 0; i < paradigmElements.length; i++) {
		paradigmElements [i].answer = answers [i].text;
	}
};

for (let i = 0; i < paradigmElements.length; i++) {
	paradigmElements [i].firstElementChild.addEventListener ("click", () => {
		if (paradigmElements [i].firstElementChild.classList.contains ("answered")) {
			return;
		}
		
		//if answer is correct
		if (paradigmElements [i].answer === remainingAnswers [currentAnswerIndex].text) {
			paradigmElements [i].firstElementChild.textContent = remainingAnswers [currentAnswerIndex].text;
			
			//remove all incorrect indicators
			for (let j = 0; j < paradigmElements.length; j++) {
				paradigmElements [j].firstElementChild.classList.remove ("incorrect");
			}
			
			paradigmElements [i].classList.remove ("underlined");
			
			if (remainingAnswers [currentAnswerIndex].underlined === true) {
				paradigmElements [i].firstElementChild.classList.add ("underlined");
			}
			
			paradigmElements [i].firstElementChild.classList.add ("answered");
			
			remainingAnswers.splice (currentAnswerIndex, 1);
			
			updateQuestion ();
		}
		
		//if answer is incorrect
		else {
			paradigmElements [i].firstElementChild.classList.add ("incorrect");
		}
	});
}

caseEndingsParadigmButton.addEventListener ("click", () => {
	history.pushState (null, null);
	
	sectionButtons.style.display = "none";
	paradigms.style.display = "";
	
	clearParadigmElements ();
	
	answers = [...caseEndings];
	
	setupElements ();
	
	updateQuestion ();
});

articleParadigmButton.addEventListener ("click", () => {
	history.pushState (null, null);
	
	sectionButtons.style.display = "none";
	paradigms.style.display = "";
	
	clearParadigmElements ();
	
	answers = [...articles];
	
	setupElements ();
	
	updateQuestion ();
});

thirdPersonPronounParadigmButton.addEventListener ("click", () => {
	history.pushState (null, null);
	
	sectionButtons.style.display = "none";
	paradigms.style.display = "";
	
	clearParadigmElements ();
	
	answers = [...thirdPersonPronouns];
	
	setupElements ();
	
	updateQuestion ();
});

window.addEventListener ("load", () => {
	document.body.classList.remove ("removeOnLoad");
});

window.addEventListener ("popstate", () => {
	location.href = "/";
});