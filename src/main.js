let currentPage = "main";

let pageData = {};

const update = () =>
	render (document.body, html`${ Header () } ${ pages [currentPage].content () }`);

const navigate = (page, data) => {
	currentPage = page;
	
	//reset page data
	pageData = {};
	
	if (pages [currentPage].setup) {
		pages [currentPage].setup (data);
	}
	
	update ();
	
	history.pushState (null, null);
};

window.addEventListener ("popstate", () => {
	navigate ("main");
});

update ();