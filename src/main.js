/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

const update = () =>
	render (document.body, html
		`<div id = "header" class = "flex fullWidth mediumFont">
			<a class = "smallPadding" href = "#">Biblical Greek</a>
		</div>
		
		${ pages [currentPage].content () }`
	);

const navigate = fullPath => {
	const path = fullPath.split ("/").map (component => decodeURIComponent (component));
	
	//set currentPage (use main page if given page does not exist)
	currentPage = pages [path [0]] ? path [0] : "main";
	
	//change path
	utilities.setPath (currentPage === "main" ? "" : fullPath);
	
	//reset page data
	pageData = {};
	
	if (pages [currentPage].setup?. (path) === false) {
		return;
	}
	
	render (document.body, html``);
	
	update ();
};

window.addEventListener ("hashchange", () => {
	navigate (location.hash.slice (2));
});

navigate (location.hash.slice (2));