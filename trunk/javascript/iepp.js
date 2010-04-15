// iepp v1.5.0 MIT @jon_neal
/*@cc_on@if(@_jscript_version<9)
(function (window, document) {

var documentElement = document.documentElement,
	documentFragment = document.createDocumentFragment(),
	html5_stylesheet,
	html5_elements = 'abbr|article|aside|audio|canvas|command|datalist|details|figure|figcaption|footer|header|hgroup|keygen|mark|meter|nav|output|progress|section|source|summary|time|video',
	html5_elements_array = html5_elements.split('|'),
	elementsCache = [],
	a = -1,
	firstChild = 'firstChild',
	createElement = 'createElement';

function parse_style_sheet_list (styleSheetList) {
	var cssRuleList,
		selectorText,
		selectorTextMatch = new RegExp('\\b(' + html5_elements + ')\\b(?!.*[;}])', 'gi'),
		selectorTextReplace = function (m) {
			return '.iepp_' + m;
		},
		a = -1;

	while (++a < styleSheetList.length) {
		parse_style_sheet_list(styleSheetList[a].imports);
		html5_stylesheet.styleSheet.cssText += styleSheetList[a].cssText.replace(selectorTextMatch, selectorTextReplace);
	}
}

function on_before_print () {
	var head = documentElement[firstChild],
		element,
		elements = document.getElementsByTagName('*'),
		elementCache,
		elementName,
		elementMatch = new RegExp('^' + html5_elements + '$', 'i'),
		elementReplace,
		elementReplaced,
		a = -1;

	while (++a < elements.length) {
		if ((element = elements[a]) && (elementName = element.nodeName.match(elementMatch))) {
			elementReplace = new RegExp('^\\s*<' + elementName + '(.*)\\/' + elementName + '>\\s*$', 'i');

			documentFragment.innerHTML = element.outerHTML.replace(/\r|\n/g, ' ').replace(elementReplace, (element.currentStyle.display == 'block') ? '<div$1/div>' : '<span$1/span>');

			elementReplaced = documentFragment.childNodes[0];
			elementReplaced.className += ' iepp_' + elementName;

			elementCache = elementsCache[elementsCache.length] = [element, elementReplaced];

			element.parentNode.replaceChild(elementCache[1], elementCache[0]);
		}
	}

	documentFragment.appendChild((html5_stylesheet = document[createElement]('style')));

	parse_style_sheet_list(document.styleSheets);

	head.insertBefore(html5_stylesheet, head[firstChild]);
}

function on_after_print () {
	var a = -1;

	while (++a < elementsCache.length) {
		elementsCache[a][1].parentNode.replaceChild(elementsCache[a][0], elementsCache[a][1]);
	}

	documentElement[firstChild].removeChild(html5_stylesheet);

	elementsCache = [];
}

while (++a < html5_elements_array.length) {
	document[createElement](html5_elements_array[a]);
	documentFragment[createElement](html5_elements_array[a]);
}

documentFragment = documentFragment.appendChild(document[createElement]('div'));

window.attachEvent('onbeforeprint', on_before_print);
window.attachEvent('onafterprint', on_after_print);

}(this, document));
@end@*/