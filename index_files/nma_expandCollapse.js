// JavaScript Document

function poptoggle (postid) { 
	var whichpost = document.getElementById(postid); 
	if (whichpost.className=="expandblock") { 
		whichpost.className="collapseblock"; 
	} else { 
		whichpost.className="expandblock";
	}
}


// new 
function expandcollapse (postid) { 
	var blockid = (postid + '_block');
	var whichpost = document.getElementById(blockid);
	var arrowid = (postid + '_arrow');
	var whichpostarrow = document.getElementById(arrowid); 
	var readmoreid = (postid + '_readmore');
	var whichpostreadmore = document.getElementById(readmoreid); 
	if (whichpost.className=="expandblock") { 
		whichpost.className="collapseblock"; 
		whichpostarrow.className="collapsearrow";
		whichpostreadmore.className="showreadmore";
	} else { 
		whichpost.className="expandblock";
		whichpostarrow.className="expandarrow";
		whichpostreadmore.className="hidereadmore";
	}
	//alert("Hello!");
}

function expandAll () {
	for (var x = 1; x <= 17; x++)
	document.getElementById('week' + x).className="expandblock";
	}

function collapseAll () {
	for (var x = 1; x <= 17; x++)
	document.getElementById('week' + x).className="collapseblock";
	}
	
function expandAllSections (numberOfSections) {
	for (var x = 1; x <= numberOfSections; x++)
	document.getElementById('section' + x).className="expandblock";
	}

function collapseAllSections (numberOfSections) {
	for (var x = 1; x <= numberOfSections; x++)
	document.getElementById('section' + x).className="collapseblock";
	}
	
function expandAllWeeks (numberOfWeeks) {
	var weekNums = numberOfWeeks;
	for (var x = 1; x <= weekNums; x++) {
		var temp = 'week' + x;
		var whichweek = document.getElementById(temp); 
		whichweek.className="expandblock";
	}
}
	
function collapseAllWeeks (numberOfWeeks) {
	var weekNums = numberOfWeeks;
	for (var x = 1; x <= weekNums; x++) {
		var temp = 'week' + x;
		var whichweek = document.getElementById(temp); 
		whichweek.className="collapseblock";
	}
}

	