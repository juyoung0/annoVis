import {mainMenu} from './menuView.js';
import { elements, columnNames, getMousePosition } from './base.js';

export const drawTable = dataArray => {

    d3.select("#tableForPaths").selectAll("tr").remove();

    const pathsTr = d3.select("#tableForPaths").selectAll("tr").data(dataArray).enter().append("tr");

    //draw each column in the table, if the column is selected to draw
    mainMenu.getColumns().forEach(column => {
        if (column.isSelected()){
            switch(column.getNameInTable()){
                case columnNames.annoNumber:
                    showAnnoNumber(pathsTr);
                    break;
                case columnNames.typeKuat:
                    pathTypeKuat(pathsTr);
                    break;
                case columnNames.typeKihwan:
                    pathTypeKihwan(pathsTr);
                    break;
                case columnNames.type:
                    pathType(pathsTr);
                    break;
                case columnNames.user:
                    showUserName(pathsTr);
                    break;
                case columnNames.group:
                    showUserGroup(pathsTr);
                    break;
                case columnNames.cycle:
                    showCycle(pathsTr);
                    break;
                case columnNames.sessions:
                    showSession(pathsTr);
                    break;
                case columnNames.article:
                    showArticleTitle(pathsTr);
                    break;
                case columnNames.articleCount:
                    showUniqueArticleCount(pathsTr);
                    break;
                case columnNames.timeTotal:
                    showTotalTime(pathsTr);
                    break;
                case columnNames.timeAnno:
                    showCreationTime(pathsTr);
                    break;
                case columnNames.keywordAnno:
                    showAnnoKeyword(pathsTr);
                    break;
                case columnNames.keywordSearch:
                    showSearchKeyword(pathsTr);
                    break;
                case columnNames.termFreqAnno:
                    showAnnoTermFreq(pathsTr);
                    break;
                case columnNames.pattern:
                    showInteractions(pathsTr);
                    break;

                default: 
                    console.log('error');
            }
        }
    });    
}


//Show anno number
const showAnnoNumber = (tr) => tr.append('td').attr('class', columnNames.annoNumber).append('text').text(function(d){return d.annoNumber});


//Show path type
const pathTypeKuat = (tr) => {
                    tr.append('td').attr('class', columnNames.typeKuat)                    
                    .append("img")
                    .attr('src', function(d){                           
                        switch(d.type){
                            case "Search":
                                return "img/search_16.png";
                            case "Vis":
                                return "img/timeline_16.png";
                            case "Mix":
                                return "img/mix_16.png";
                            case "Group":
                                return "img/group_16.png";
                            case "Outlier":
                                return "img/outlier_16.png";
                            case "Search-In-Wiki":
                                return "img/searchInWiki_16.png";
                        }                           
                    })  
                    .attr("width", function(d){                         
                        return d.type == "Mix" ? 32 : 16;
                    })
                    .attr("height", 16);
                }



//Show kihwan's path type
const pathTypeKihwan = (tr) => {
                    tr.append('td').attr('class', columnNames.typeKihwan)                    
                    .append("img")
                    .attr('src', function(d){                           
                        switch(d.kihwanPathType){
                            case "Search":
                                return "img/search_16.png";
                            case "Vis":
                                return "img/timeline_16.png";
                            case "Mix":
                                return "img/mix_16.png";
                            case "Group":
                                return "img/group_16.png";
                            case "Outlier":
                                return "img/outlier_16.png";
                            case "Search-In-Wiki":
                                return "img/searchInWiki_16.png";
                        }                           
                    })  
                    .attr("width", function(d){                         
                        return d.kihwanPathType == "Mix" ? 32 : 16;
                    })
                    .attr("height", 16);
                }


//Show kihwan's new path type
const pathType = (tr) => {
                    tr.append('td').attr('class', columnNames.type)                    
                    .style("background", function(d){
                        return (d.newType.indexOf("'") > -1) ? "#FFF176" : "inherit";})
                    .append("img")
                    .attr('src', function(d){                           
                        switch(d.newType){
                            case "S":
                            case "S'":
                                return "img/search_16.png";
                            case "V":
                            case "V'":
                                return "img/timeline_16.png";
                            case "M":
                            case "M'":
                                return "img/mix_16.png";
                            case "G":
                            case "G'":
                                return "img/group_16.png";
                            case "O":
                            case "O'":
                                return "img/outlier_16.png";
                            case "W":
                            case "W'":
                                return "img/searchInWiki_16.png";
                        }                           
                    })  
                    .attr("width", function(d){                         
                        return (d.newType == "M") || (d.newType == "M'") ? 32 : 16;
                    })
                    .attr("height", 16);
                }

//show name of the users
const showUserName = (tr) => tr.append('td').attr('class', columnNames.user).append('text').text(function(d){return d.userName.substring(0, 8)});

//show group of the users
const showUserGroup = (tr) => tr.append('td').attr('class', columnNames.group).append('text').text(function(d){return d.userGroup});

//show cycle number
const showCycle = (tr) => tr.append('td').attr('class', columnNames.cycle).append('text').text(function(d){return d.cycle});

//show sessions both for annotation is created and edited
const showSession = (tr) => {
                        tr.append('td').attr('class', columnNames.sessions).append('text').text(function(d){
                        var sessionText = "";
                        for (var i = 0; i < d.annoSessions.length; i ++)
                        {
                            sessionText = sessionText + "[" + d.annoSessions[i] + "]";
                        }

                        for (var i = 0; i < d.editSessions.length; i ++)
                        {
                            sessionText = sessionText + "<" + d.editSessions[i] + ">";
                        }
                        return sessionText;
                        });
                    }

//show the title, which is defined by user during annotation creation process
const showArticleTitle = (tr) => {
                        tr.append('td')
                        .attr('class', columnNames.article)
                        .style("background", function(d){
                                if (d.keywordComp.search && d.keywordComp.anno & d.keywordComp.searchEqAnno && d.keywordComp.searchEqTitle)
                                {
                                    return "#e1f143";
                                }                           
                            }) 
                        .append("text").text(function(d){
                        
                        if (d.userDefinedTitle != "no")
                        {
                            if (d.userDefinedTitle.length > 26)
                            {
                                return d.userDefinedTitle.substr(0,22) + "... ";
                            }
                            return d.userDefinedTitle;
                        }                           
                        
                        return "annotation is deleted";
                        
                    })
                    .style("color", function(d){
                        if (d.userDefinedTitle != "no") return "grey";
                        return "#ff5722";
                    })
                    .on("mouseover", function(d){
                        showExtraInfo(d.userDefinedTitle);
                        })
                    .on("mouseout", closeExtraInfo)
                    .style("cursor", "pointer");
                }

//show unique article count
const showUniqueArticleCount = (tr) => tr.append('td').attr('class', columnNames.articleCount).append('text').text(function(d){return "(" + d.uniqueArticleCount + ")";});

//show total Interaction time (edit is included)
const showTotalTime = (tr) => tr.append('td').attr('class', columnNames.timeTotal).append('text').text(function(d){return Math.floor(d.totalInteractionTime/60) + "m " + d.totalInteractionTime%60 + "s ";});

//show total anno creation time (edit is included)
const showCreationTime = (tr) => tr.append('td').attr('class', columnNames.timeAnno).append('text').text(function(d){return Math.floor(d.totalCreationTime/60) + "m " + d.totalCreationTime%60 + "s ";});


//show anno keyword
const showAnnoKeyword = (tr) => {
                            tr.append('td').attr('class', columnNames.keywordAnno)                            
                            .style("background", function(d){
                                if (d.keywordComp.search && d.keywordComp.anno)
                                {
                                    return (d.keywordComp.searchEqAnno) ? "#e1f143" : "#8bc34a";
                                }
                             })
                            .selectAll('text')
                            .data( d => d.annoKeywordArr)
                            .enter()
                            .append('text')
                            .text(function(d, i){                                       
                                    return (i === 0) ? `${d.word}` : `, ${d.word} `;
                                })
                            .style('color', function(d){
                                return (d.inAnno === true) ? '#2196f3' : '#ff5722';
                            });
                        }


//show searched keywords
const showSearchKeyword = (tr) => {
                            tr.append('td').attr('class', columnNames.keywordSearch)
                            .style("background", function(d){
                                if (d.keywordComp.search && d.keywordComp.anno)
                                {
	                                return (d.keywordComp.searchEqAnno) ? "#e1f143" : "#8bc34a";
	                            }							
							})                         
                            .selectAll('text')
                            .data(d => d.searchedWords)
                            .enter()
                            .append('text')
                            .text(function(d, i){                                       
                                    return (i === 0) ? `${d.word}` : `, ${d.word} `;
                                })
                            .style('color', function(d){
                                return (d.inAnno === true) ? '#2196f3' : '#ff5722';
                            });
                        }

//show term frequency 
const showAnnoTermFreq = (tr) => {
                            tr.append('td').attr('class', columnNames.termFreqAnno)
                            .selectAll('text')
                            .data(d=>d.wordCount)
                            .enter()
                            .append('text')
                            .text(function(d){                                      
                                    return `${d.word}(${d.count}) `;
                                });
                        }


//draw the interaction pattern
const showInteractions = (tr) => {
                        tr.append('td').attr('class', columnNames.pattern)
                        .selectAll("span")
                        .data(function(d){return d.documents;})
                        .enter()
                        .append("span")
                        .attr('class', 'interactionPattern')
                        .attr("opacity", function(d,i){

                            if (d.action == "elapsed time"){
                                drawWikiRead(this);
                            }else if (d.action == "opened wiki article" || d.view_action == "map0 view - title table->selected" || d.view_action == "map1 view - title table->selected"){
                                drawWikiSelect(this);
                            } else{
                                drawIcons(this);
                            }
                        });
                    }

const getPatternWidth = d => {
	
	if (d.timeSpent < 16000){
		return 16 + "px";
	} 
	else if (d.timeSpent > 300000) {
		return 300 + "px";
	}
	
	return Math.round(d.timeSpent/1000) + "px";
}

const drawWikiRead = (gElement) => {
    d3.select(gElement).append("div")
    					.attr('class', 'articleReading')
                        .style("width", d => getPatternWidth(d))
                        .style("background", function(d){

                            var uniqueArticleNumber = d3.select(this.parentNode.parentNode).data()[0].uniqueArticleCount;
                            if (uniqueArticleNumber <= 10){
                                return d3.schemeCategory10[d.pattern];
                            } 
                            else if (uniqueArticleNumber <= 20){
                                return d3.schemeCategory20[d.pattern];
                            }                       
                            return "#9e9e9e";
                        })
                        .style("border", d => {
                            if (d.timeSpent > 300000){
                                return "1px solid blue";
                            }
                        })
                        .on("mouseover", function(d){showExtraInfo("READ: " + d.detail + ", Time Spent: " + Math.round(d.timeSpent/1000) + "s");})
                        .on("mouseout", closeExtraInfo)
                        .append("img")
                        .attr('src', 'img/read_16.png')    
                        ;
}

const drawWikiSelect = (gElement) => {
    d3.select(gElement).append("div")
    					.attr('class', 'articleSelecting')
                        .style("width", d => getPatternWidth(d))
                        .style("background", function(d){

                            var uniqueArticleNumber = d3.select(this.parentNode.parentNode).data()[0].uniqueArticleCount;
                            if (uniqueArticleNumber <= 10){
                                return d3.schemeCategory10[d.pattern];
                            } 
                            else if (uniqueArticleNumber <= 20){
                                return d3.schemeCategory20[d.pattern];
                            }                       
                            return "#9e9e9e";
                        })
                        .style("border", d => {
                            if (d.timeSpent > 300000){
                                return "1px solid blue";
                            }
                        })
                        .on("mouseover", function(d){showExtraInfo("SELECT: " + d.detail + ", Time Spent: " + Math.round(d.timeSpent/1000) + "s");})
                        .on("mouseout", closeExtraInfo);
}

const drawIcons = (gElement) => {
    d3.select(gElement).append("img")
    					.attr('class', 'patternImages')
                        .attr('src', function(d){                            
                            if (d.action == "edit the annotation"){
                                return "img/edit_16.png"
                            }                           
                            else if (d.action == "cancel creating an annotation"){
                                return "img/cancelCreate_16.png"
                            } 
                            else if (d.action == "created the annotation")
                            {
                                return "img/create_16.png"
                            }
                            else if (d.view == "search box")
                            {
                                return "img/search_16.png"
                            }
                            else if (d.action == "selected a time range")
                            {
                                return "img/timeline_16.png"
                            }
                            else if (d.action == "logged in")
                            {
                                return "img/login_16.png";
                            }
                            else if (d.action == "refresh group annotation view")
                            {
                                return "img/groupRefresh_16.png";
                            }
                            else if (d.semanticName == "group annotation")
                            {
                                return "img/group_16.png";
                            }
                        })
                        .on("mouseover", function(d){
                            var stringToShow;
                            if (d.action == "edit the annotation"){
                                stringToShow = "Edit the anno, ID: " + d.detail;
                            }                           
                            else if (d.action == "cancel creating an annotation"){
                                stringToShow = "cancel creating an annotation";
                            } 
                            else if (d.action == "created the annotation")
                            {
                                const annoContent = d3.select(this.parentNode.parentNode).data()[0].annoContent;
                                stringToShow = d.detail + ": " + annoContent;
                                showExtraInfo(stringToShow);

                                const searchKeywords = d3.select(this.parentNode.parentNode).data()[0].searchedWords;
                                const annoKeywords = d3.select(this.parentNode.parentNode).data()[0].annoKeywordArr;
                                highlightKeywords(searchKeywords, annoKeywords);
                                return;
                            }
                            else if (d.view == "search box")
                            {
                                stringToShow = "Searched" + d.detail;
                            }
                            else if (d.action == "selected a time range")
                            {
                                stringToShow = "Selected a time range:" + d.detail;
                            }
                            else if (d.action == "logged in")
                            {
                                stringToShow = "Logged in cycle " + d.cycle + ", session " + d.session;
                            }
                            else if (d.semanticName == "group annotation")
                            {
                                stringToShow = "In Group Anno: " + d.action;
                            }
                            else{
                                console.log('something is missing');
                            }

                            showExtraInfo(stringToShow);
                        })
                        .on("mouseout", closeExtraInfo);

}


const showExtraInfo = (textToDisplay) => {
    
    const mousePosition = getMousePosition();
    const mouseX = $(window).width() - mousePosition.x;
    const mouseY = mousePosition.y + 20;

    var textDiv = d3.select("#showFullText");
    textDiv.select('text').text(textToDisplay);
    textDiv.style("right", mouseX + "px");
    textDiv.style("top",  mouseY + "px");
    textDiv
    .style("display","block")
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1);
}

const highlightKeywords = (searchHighlight, annoHighlight) => {
    annoHighlight.forEach(w => {
        $("#showFullText").adcHighlight({text: w.word, cssClass: "highlightAnno",caseSensitive: false});
    });

    searchHighlight.forEach(w => {
        $("#showFullText").adcHighlight({text: w.word, cssClass: "highlightSearch",caseSensitive: false});
    });
}

const closeExtraInfo = () => d3.select("#showFullText").style("display","none");