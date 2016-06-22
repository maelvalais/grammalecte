// JavaScript

let nPanelWidth = 0;  // must be set at launch


/*
	Events
*/

document.getElementById('close').addEventListener("click", function (event) {
	self.port.emit('closePanel');
});

document.getElementById('closemsg').addEventListener("click", function (event) {
	closeMessageBox();
});

self.port.on("setPanelWidth", function (n) {
	nPanelWidth = n;
});

self.port.on("addElem", function (sHtml) {
	let xElem = document.createElement("div");
	xElem.innerHTML = sHtml;
	document.getElementById("errorlist").appendChild(xElem);
});

self.port.on("refreshParagraph", function (sIdParagr, sHtml) {
	document.getElementById("paragr"+sIdParagr).innerHTML = sHtml;
	let sClassName = (sHtml.includes('<u id="err')) ? "paragraph softred" : "paragraph softgreen";
	document.getElementById("paragr"+sIdParagr).className = sClassName;
});

self.port.on("showMessage", function (sText) {
	document.getElementById("message").textContent = sText;
	document.getElementById("messagebox").style.display = "block";
	window.setTimeout(closeMessageBox, 20000);
});

self.port.on("clearErrors", function (sHtml) {
	document.getElementById("errorlist").textContent = "";
});

self.port.on("startWaitIcon", function() {
	startWaitIcon();
});

self.port.on("stopWaitIcon", function() {
	stopWaitIcon();
});

self.port.on("suggestionsFor", function (sWord, sSuggestions, sTooltipId) {
	// spell checking suggestions
	//console.log(sWord + ": " + sSuggestions);
	if (sSuggestions === "") {
		document.getElementById(sTooltipId).innerHTML += "Aucune.";
	} else if (sSuggestions.startsWith("#")) {
		document.getElementById(sTooltipId).innerHTML += sSuggestions;
	} else {
		let lSugg = sSuggestions.split("|");
		let iSugg = 0;
		let sElemId = sTooltipId.slice(7);
		for (let sSugg of lSugg) {
			document.getElementById(sTooltipId).innerHTML += '<a id="sugg' + sElemId + "-" + iSugg + '" class="sugg" href="#" onclick="return false;">' + sSugg + '</a> ';
			iSugg += 1;
		}
	}
});


window.addEventListener(
	"click",
	function (xEvent) {
		let xElem = xEvent.target;
		if (xElem.id) {
			if (xElem.id.startsWith("sugg")) {
				applySuggestion(xElem.id);
			} else if (xElem.id.startsWith("ignore")) {
				ignoreError(xElem.id);
			} else if (xElem.id.startsWith("check")) {
				sendBackAndCheck(xElem.id);
			} else if (xElem.id.startsWith("edit")) {
				switchEdition(xElem.id);
			} else if (xElem.id.startsWith("end")) {
				document.getElementById(xElem.id).parentNode.parentNode.style.display = "none";
			} else if (xElem.tagName === "U" && xElem.id.startsWith("err")) {
				showTooltip(xElem.id);
			} else if (xElem.id.startsWith("resize")) {
				self.port.emit("resize", xElem.id, 10);
			} else {
				hideAllTooltips();
			}
		} else if (xElem.tagName === "A") {
			self.port.emit("openURL", xElem.getAttribute("href"));
		} else {
			hideAllTooltips();
		}
	},
	false
);


/*
	Actions
*/

function closeMessageBox () {
	document.getElementById("messagebox").style.display = "none";
	document.getElementById("message").textContent = "";
}

function applySuggestion (sElemId) { // sugg
	startWaitIcon();
	let sIdErr = "err" + sElemId.slice(4, sElemId.indexOf("-"));
	let sIdParagr = sElemId.slice(4, sElemId.indexOf("_"));
	document.getElementById(sIdErr).textContent = document.getElementById(sElemId).textContent;
	document.getElementById(sIdErr).className = "corrected";
	document.getElementById(sIdErr).removeAttribute("style");
	self.port.emit("correction", sIdParagr, getPurgedTextOfElem("paragr"+sIdParagr));
	stopWaitIcon();
}

function ignoreError (sElemId) {  // ignore
	let sIdErr = "err" + sElemId.slice(6);
	let xTooltipElem = document.getElementById("tooltip"+sElemId.slice(6));
	document.getElementById(sIdErr).removeChild(xTooltipElem);
	document.getElementById(sIdErr).className = "ignored";
	document.getElementById(sIdErr).removeAttribute("style");
}

function showTooltip (sElemId) {  // err
	hideAllTooltips();
	let sTooltipId = "tooltip" + sElemId.slice(3);
	let xTooltipElem = document.getElementById(sTooltipId);
	let nLimit = nPanelWidth - 300; // paragraph width - tooltip width
	if (document.getElementById(sElemId).offsetLeft > nLimit) {
		xTooltipElem.style.left = "-" + (document.getElementById(sElemId).offsetLeft - nLimit) + "px";
	}
	xTooltipElem.setAttribute("contenteditable", false);
	xTooltipElem.className = 'tooltip_on';
	if (document.getElementById(sElemId).className === "error red"  &&  xTooltipElem.textContent.endsWith(":")) {
		// spelling mistake
		self.port.emit("getSuggestionsForTo", document.getElementById(sElemId).innerHTML.replace(/<span .*$/, "").trim(), sTooltipId);
	}
}

function switchEdition (sElemId) {  // edit
	let sId = "paragr" + sElemId.slice(4);
	if (document.getElementById(sId).hasAttribute("contenteditable") === false
		|| document.getElementById(sId).getAttribute("contenteditable") === "false") {
		document.getElementById(sId).setAttribute("contenteditable", true);
		document.getElementById(sElemId).className = "button orange";
		document.getElementById(sId).focus();
	} else {
		document.getElementById(sId).setAttribute("contenteditable", false);
		document.getElementById(sElemId).className = "button";
	}
}

function sendBackAndCheck (sElemId) {  // check
	startWaitIcon();
	let sIdParagr = sElemId.slice(5);
	self.port.emit("modifyAndCheck", sIdParagr, getPurgedTextOfElem("paragr"+sIdParagr));
	stopWaitIcon();
}

function getPurgedTextOfElem (sId) {
	// Note : getPurgedTextOfElem2 should work better if not buggy.
	// if user writes in error, Fx adds tags <u></u>, we also remove style attribute
	let xParagraphElem = document.getElementById(sId);
	for (xNode of xParagraphElem.getElementsByTagName("u")) {
		if (xNode.id.startsWith('err')) {
			xNode.innerHTML = xNode.innerHTML.replace(/<\/?u>/g, "");
			xNode.removeAttribute("style");
		}
	}
	// we remove style attribute on tooltip
	for (xNode of xParagraphElem.getElementsByTagName("span")) {
		if (xNode.id.startsWith('tooltip')) {
			xNode.removeAttribute("style");
		}
	}
	// now, we remove tooltips, then errors, and we change some html entities
	let sText = xParagraphElem.innerHTML;
	sText = sText.replace(/<br\/? *> *$/ig, "");
	sText = sText.replace(/<span id="tooltip.+?<\/span>/g, "");
	sText = sText.replace(/<u id="err\w+" class="[\w ]+" href="#" onclick="return false;">(.+?)<\/u><!-- err_end -->/g, "$1");
	sText = sText.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
	return sText;
}

function getPurgedTextOfElem2 (sId) {
	// It is better to remove tooltips via DOM and retrieve textContent,
	// but for some reason getElementsByClassName “hazardously” forgets elements.
	// Unused. Needs investigation.
	let xParagraphElem = document.getElementById(sId).cloneNode(true);
	for (let xNode of xParagraphElem.getElementsByClassName("tooltip")) {
		xNode.parentNode.removeChild(xNode);
	}
	return xParagraphElem.textContent;
}

function hideAllTooltips () {
	for (let xElem of document.getElementsByClassName("tooltip_on")) {
		xElem.className = "tooltip";
		xElem.removeAttribute("style");
	}
}

function startWaitIcon () {
	document.getElementById("waiticon").hidden = false;
}

function stopWaitIcon () {
	document.getElementById("waiticon").hidden = true;
}
