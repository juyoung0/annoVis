import Data from '../models/Data.js';

export const myData = new Data();

export const elements = {
    columnsMenu: document.getElementById('menu'),
    menuImage: document.getElementById('imgMenu'),    
    columnFilterMenu: document.getElementById('columnFilterMenu'),
    tableFilterMenu: document.getElementById('tableFilterMenu')
};

export const columnNames = {
	annoNumber: 'annoNumber',
	typeKuat: 'typeKuat',
	typeKihwan: 'typeKihwan',
	type: 'type',
	user: 'user',
	group: 'group',
	cycle: 'cycle',
	sessions: 'sessions',
	article: 'article',
	articleCount: 'articleCount',
	timeTotal: 'timeTotal',
	timeAnno: 'timeAnno',
	keywordAnno: 'keywordAnno',
	keywordSearch: 'keywordSearch',
	termFreqAnno: 'termFreqAnno',
	pattern: 'pattern'
};

export const renderLoader = parent => {
	document.getElementById('imgLoading').style.display = "block";
};

export const clearLoader = () => {
	document.getElementById('imgLoading').style.display = "none";
}

export const getMousePosition = (e) => {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;
    var scrollLeft = window.scrollX;
    var scrollTop = window.scrollY;    

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }    

    return {'x' : pageX - scrollLeft, 'y': pageY - scrollTop};
}