import Column from '../models/Column.js';
import Menu from '../models/Menu.js';
import { elements, columnNames, myData, getMousePosition} from './base.js';

export const mainMenu = new Menu();

export const initColumns = () => {
    let colNo, colKuatType, colKihwanType, colType, colUser, colGroup, colCycle, colSession, colRelatedArticle, colArticleCount, colTotalTime, colAnnoTime, colAnnoKeyword, colSearchedKeyword, colAnnoTermFreq, colPattern;
    
    colNo = new Column('No', columnNames.annoNumber, true);
    colKuatType = new Column('Ku', columnNames.typeKuat, false, true);
    colKihwanType = new Column('Ki', columnNames.typeKihwan, false, true);
    colType = new Column('Ty', columnNames.type, true, true);
    colUser = new Column('User', columnNames.user, true, true);
    colGroup = new Column('Gr', columnNames.group, false, true);
    colCycle = new Column('Cy', columnNames.cycle, false, true);
    colSession = new Column('Ses', columnNames.sessions);
    colRelatedArticle = new Column('Article Title', columnNames.article, true);
    colArticleCount = new Column('W', columnNames.articleCount);
    colTotalTime = new Column('Total Time', columnNames.timeTotal);
    colAnnoTime = new Column('Anno Time', columnNames.timeAnno);
    colAnnoKeyword = new Column('Anno Keywords', columnNames.keywordAnno, true);
    colSearchedKeyword = new Column('Searched Keywords', columnNames.keywordSearch, true);
    colAnnoTermFreq = new Column('Anno Term Freq', columnNames.termFreqAnno);
    colPattern = new Column('Pattern', columnNames.pattern, true);

    const columns = [colNo, colKuatType, colKihwanType, colType, colUser, colGroup, colCycle, colSession, colRelatedArticle, colArticleCount, colTotalTime, colAnnoTime, colAnnoKeyword, colSearchedKeyword, colAnnoTermFreq, colPattern];
    
    makeMenu(columns);    
}

const makeMenu = (columList) => {
    columList.forEach(column => mainMenu.insertColumn(column));
}

const getFilterIcon = (hasFilter, nameInTable, backgroundColor) => {
    if (hasFilter) {
        return `<img src="img/down_16.png" class="filteringImg" alt="v" id=${nameInTable} style="background: ${backgroundColor}">`;
    }
    return '';
}


export const drawColumns = () => {
    //clean the menu first
    while (elements.columnsMenu.firstChild) {
        elements.columnsMenu.removeChild(elements.columnsMenu.firstChild);
    }
    
    mainMenu.getColumns().forEach(column => {
        if (column.isSelected()){
            const backgroundColor = column.isFilterApplied() ? "#FFC107" : "none";

            const menuHtmlString =`
                  <div class="tableTitles" id=${column.getNameInTable()}>
                    <div class="innerTableTitles">
                        ${getFilterIcon(column.hasFilter(), column.getNameInTable(), backgroundColor)}
                        <button type="button" class="menu_button" onClick="">${column.getNameToShow()}</button>
                    </div>
                  </div>`;

            elements.columnsMenu.insertAdjacentHTML('beforeend', menuHtmlString);
        }
    })
}

export const adjustColumWidth = () => {
    mainMenu.getColumns().forEach(column => {
        if (column.isSelected()){
            const selectorName = column.getNameInTable();
            const table = document.querySelector(`.${selectorName}`);
            
            let widthFromTable = 100;

            if (table)
            {
                widthFromTable = table.offsetWidth;
            }

            setWidth(selectorName,widthFromTable);
        }
    })
}

const setWidth = (menuID, width) => {
    document.getElementById(menuID).style.width = width + 'px';
}


export const processColCheckBoxVal = () => {
    const checkBoxesHTML = document.getElementsByClassName('checkboxMenuClass');
    const checkBoxes = Array.prototype.slice.call(checkBoxesHTML);
    
    checkBoxes.forEach(function(element){
                const elementValue = element['value'];
                const elementChecked = element['checked'];

                const currentColumn = mainMenu.getColumn(elementValue);
                currentColumn.setSelected(elementChecked);

                if (!elementChecked){
                    currentColumn.setAllItemsChecked();
                }
            });    
}


export const processTableCheckBoxVal = () => {
    // 1. Select all check boxes and read the values
    const checkBoxesHTML = document.getElementsByClassName('checkboxClass');
    const checkBoxes = Array.prototype.slice.call(checkBoxesHTML);
    const btnDataID = document.getElementById('tableFilterButton').dataset.id;

    // 2. Get the current column by id
    const currentColumn = mainMenu.getColumn(btnDataID);

    // 3. Clear the item list of current column
    currentColumn.clearColumnItems();

    // 4. Insert the newly selected values of items
    checkBoxes.forEach(function(element){
                const elementValue = element['value'];
                const elementChecked = element['checked'];
                currentColumn.insertColumnItem(elementValue, elementChecked);
            }); 

    // 5. Highlight the button, if it has some filter
    if (currentColumn.isFilterApplied()) {
        d3.select(`#${btnDataID}`).select('img').style('background', '#FFC107');
    } else {
        d3.select(`#${btnDataID}`).select('img').style('background', 'none');
    }

}


export const closeFilterMenu = () => {
    d3.selectAll('.filterMenu').style("display", "none");
}



export const drawColFilterMenu = () => {
    
    closeFilterMenu();

    const columnFilterMenu = d3.select("#columnFilterMenu");    
    columnFilterMenu.selectAll('div').remove();

    //fitlering button
    columnFilterMenu.append('div')
                .append('input')
                .attr('type', 'button')
                .attr("class","button filterButton")
                .attr("id","columnFilterButton")
                .attr("value", "filter");

                
    //select, deselect all button
    columnFilterMenu.append('div')
                .append('input')
                .attr('type', 'button')
                .attr("class","button selectAllButton")
                .attr("value", "(de)select All")
                .on('click', function(){
                        if($('.checkboxMenuClass').is(":checked")) {
                            d3.selectAll('.checkboxMenuClass').property("checked", false);
                        } else{
                            d3.selectAll('.checkboxMenuClass').property("checked", true);
                        }
                    });

    const eachItem = columnFilterMenu.selectAll('.menuOption')
                                .data(mainMenu.getColumns())
                                .enter()
                                .append('div')
                                .attr("class", "menuOption");

    eachItem.append("input")
            .attr("class", "checkboxMenuClass")
            .attr("type", "checkbox")
            .attr("value", function(d){return d.getNameInTable();})
            .property("checked", function(d){               
                return d.isSelected();
            });
    eachItem.append("text")
            .text(function(d){return d.getNameInTable();});


    //opening of filtering menu
    const mouseX = getMousePosition().x - 225;
    columnFilterMenu.style("display", "block").style("left", mouseX + 'px');
}


export const drawTableFilterMenu = (id, menuItems, xPosition) => {
    
    closeFilterMenu();

    const tableFilterMenu = d3.select("#tableFilterMenu");
    tableFilterMenu.selectAll('div').remove();

    //fitlering button
    tableFilterMenu.append('div')
                .append('input')
                .attr('type', 'button')
                .attr("class","button filterButton")
                .attr("id","tableFilterButton")
                .attr("value", "filter")
                .attr("data-id", id);

                
    //select, deselect all button
    tableFilterMenu.append('div')
                .append('input')
                .attr('type', 'button')
                .attr("class","button selectAllButton")
                .attr("value", "(de)select All")
                .on('click', function(){
                        if($('.checkboxClass').is(":checked")) {
                            d3.selectAll('.checkboxClass').property("checked", false);
                        } else{
                            d3.selectAll('.checkboxClass').property("checked", true);
                        }
                    });

    var eachItem = tableFilterMenu.selectAll('.menuOption')
                                .data(menuItems)
                                .enter()
                                .append('div')
                                .attr("class", "menuOption");

    eachItem.append("input")
            .attr("class", "checkboxClass")
            .attr("type", "checkbox")
            .attr("value", d => d.itemName)
            .property("checked", d => d.checked);

    eachItem.append("text").text(d => d.itemName);


    //opening of filtering menu
    tableFilterMenu.style("left", xPosition + 'px');    
    tableFilterMenu.style("top", '-20px')
    .style("display", "block")
    .transition()
    .duration(200)
    .style("top", '114px');
}


export const getUniqueColumnItems = () => {

    myData.getData().forEach(element => {
        mainMenu.getColumn(columnNames.typeKuat).insertColumnItem(element.type);
        mainMenu.getColumn(columnNames.typeKihwan).insertColumnItem(element.kihwanPathType);
        mainMenu.getColumn(columnNames.type).insertColumnItem(element.newType);
        mainMenu.getColumn(columnNames.user).insertColumnItem(element.userName);
        mainMenu.getColumn(columnNames.group).insertColumnItem(element.userGroup);
        mainMenu.getColumn(columnNames.cycle).insertColumnItem(element.cycle.toString());
    })
}


export const sortTableMenuItems = columnName => {
    return mainMenu.sortAllColumnItems();
}

export const getTableMenuItems = columnName => {
    return mainMenu.getColumn(columnName).getColumnItems();
}

export const filterData = originalData => {

    const columns = mainMenu.getColumns();

    const filteredData = originalData.filter(element => {

        let acceptable = true;

        for (const column of columns) {
            if (column.selected && column.filter)
            {
                let eleForCurCol;
                
                switch (column.nameInTable) {
                    
                    case columnNames.typeKuat:
                        eleForCurCol = element.type;
                        break;

                    case columnNames.typeKihwan:
                        eleForCurCol = element.kihwanPathType;
                        break;

                    case columnNames.type:
                        eleForCurCol = element.newType;
                        break;

                    case columnNames.user:
                        eleForCurCol = element.userName;
                        break;

                    case columnNames.group:
                        eleForCurCol = element.userGroup;
                        break;

                    case columnNames.cycle:
                        eleForCurCol = element.cycle.toString();
                        break;
                    default:
                        console.log('Not Found');
                }

                acceptable = column.isItemChecked(eleForCurCol);

                if (!acceptable) return false;
            }
        }

        return acceptable;
    })

    return filteredData;
}