"use strict";

export default () => (text, onclick, href) => html`<a class = "sectionLink smallFont" onclick = ${ onclick } href = ${ href }>${ text }</a>`;