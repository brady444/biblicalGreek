/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

const update = () =>
	render (document.body, html
		`<div id = "header" class = "flex fullWidth mediumFont">
			<a class = "smallPadding" onclick = ${ () => navigate ("main") }>Biblical Greek</a>
		</div>
		
		${ pages [currentPage].content () }`
	);

const navigate = (page, data) => {
	currentPage = page;
	
	//reset page data
	pageData = {};
	
	if (pages [currentPage].setup) {
		pages [currentPage].setup (data);
	}
	
	render (document.body, html``);
	
	update ();
	
	history.pushState (null, null);
};

window.addEventListener ("popstate", () => {
	navigate ("main");
});

update ();