"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import constants from "../constants.js";

export default {
	content: () => html
		`<div class = "container flexColumnStartCenter largePadding mediumGap">
			${ constants.paradigms.map (paradigm => html`<img class = "paradigmImage" src = ${ paradigm.imageSrc } />`) }
		</div>`
};