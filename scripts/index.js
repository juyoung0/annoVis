import * as menuView from './views/menuView.js';
import * as tableView from './views/tableView.js';
import { elements, renderLoader, clearLoader, myData, getMousePosition} from './views/base.js';

const readData = function(){
	d3.json("data/annoVisData.json", data => {

		// 1. Once the data is read from file, set it into mydata object
		myData.setData(data);

		//2. Draw the table with current data
		tableView.drawTable(myData.getData());

		//3. Draw the menu
		menuView.drawColumns();

		//4. Adjust the width of the menu with corresponding table column 
		menuView.adjustColumWidth();

		//5. Get unique menu items according to the data in the table
		menuView.getUniqueColumnItems();

		//6. Sort the items
		menuView.sortTableMenuItems();

		//7. Stop the rotating loading icon
		clearLoader();
	})
};


/*
window.sortBy = (sortType) => {
		//sort the array based on article count
	inputData.sort(function(a, b){
		var p1 = a[sortType];
		var p2 = b[sortType];

		var o1 = a["pathNumber"];
		var o2 = b["pathNumber"];

		if (p1 < p2) return -1;
		if (p1 > p2) return 1;

		if (o1 < o2) return -1;
		if (o1 > o2) return 1;
		return 0;
	});
	tableView.drawTable(inputData, false);
}

*/


// Close the menu if user clicks outside by handleling the click events
$(document).click(function (e) {
	if ((e.target.className == "filteringImg") || (e.target.parentNode != undefined && e.target.parentNode.className == "filterMenu") || (e.target.parentNode != undefined && e.target.parentNode.parentNode != undefined && e.target.parentNode.parentNode.className == "filterMenu") || e.target.id === 'imgMenu')
	{
		return;
	}


	d3.selectAll('.filterMenu').style("display", "none");
});



// Draw the column filter menu, if the user clicks menu icon
elements.menuImage.addEventListener('click', menuView.drawColFilterMenu);


//This event listener handles the "filter" button click in column filter menu 
elements.columnFilterMenu.addEventListener('click', (event) => {
	if (event.target.id === "columnFilterButton")
	{
		
		// 1. Close filter menu
		menuView.closeFilterMenu();
		
		// 2. Draw loading icon
		renderLoader();

		setTimeout(function(){
			// 3. Read and update checkbox values
			menuView.processColCheckBoxVal();

			// 4. Filter the data according to column filters
			const filteredData = menuView.filterData(myData.getData());

			// 5. Draw the table with filtered data
			tableView.drawTable(filteredData);

			// 6. Draw the new columns
			menuView.drawColumns();

			// 7. Adjust the column header width
			menuView.adjustColumWidth();

			// 8. Stop the rotating loading icon
			clearLoader();	
    	}, 0);


	}
});


//This event listener handles when the users click the menu icon to open table filter menu
elements.columnsMenu.addEventListener('click', (event) => {

	if (event.target.className === "filteringImg")
	{
		
		// 1. Get the items for menu
		const columnItems = menuView.getTableMenuItems(event.target.id);

		// 2. Get mouse position
		const mousePosition = getMousePosition();

		// 3. draw the table filter menu
		menuView.drawTableFilterMenu(event.target.id, columnItems, mousePosition.x - 17);
	}
});



// Handle the click event for "filter" button in table filter menu
elements.tableFilterMenu.addEventListener('click', (event) => {
	if (event.target.id === "tableFilterButton")
	{	
		
		// 1. Close filter menu
		menuView.closeFilterMenu();

		// 2. Draw loading icon
		renderLoader();

		setTimeout(function(){

			// 3. Read the checkbox values from current filter menu and update main menu data
			menuView.processTableCheckBoxVal();

			// 4. Filter the data
			const filteredData = menuView.filterData(myData.getData());

			// 5. Draw the table with filtered data		
			tableView.drawTable(filteredData);

			// 6. Adjust the width of the menu with corresponding table column 
			menuView.adjustColumWidth();

			// 7. Sort the items
			menuView.sortTableMenuItems();			

			// 8. Stop the rotating loading icon
			clearLoader();	

    	}, 0);		
	}
});


window.addEventListener("resize", resizeThrottler, false);

let resizeTimeout;

function resizeThrottler() {
// ignore resize events as long as an actualResizeHandler execution is in the queue
	if ( !resizeTimeout ) {
		resizeTimeout = setTimeout(function() {
			resizeTimeout = null;
			actualResizeHandler();

			// The actualResizeHandler will execute at a rate of 15fps
		}, 1000);
	}
}

function actualResizeHandler() {
	
	// 1. Adjust the column header width
	menuView.adjustColumWidth();
}


// This is initializer IIFE
const init = (function (){

	// 1. Draw loading icon
	renderLoader();

	// 2. Initialize the menu
	menuView.initColumns();

	// 3. Read the data
	readData();
})();



