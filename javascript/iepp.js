// iepp v1.6.1 MIT @jon_neal
(function(win, doc){
	var html5_elements = 'abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
		html5_elements_array = html5_elements.split('|'),
		html5_elements_array_length = html5_elements_array.length,
		html5_elements_replace = new RegExp('<(\/*)('+html5_elements+')', 'gi'),
		html5_selector_match = new RegExp('(^|[^\\n]*?\\s)('+html5_elements+')([^\\n]*)({[\\n\\w\\W]*?})', 'gi'),
		html5_selector_replace = new RegExp('(^|\\s)('+html5_elements+')', 'gi'),
		doc_fragment = doc.createDocumentFragment(),
		html = doc.documentElement,
		head = html.firstChild,
		style = doc.createElement('style'),
		body = doc.createElement('body');
	style.media = 'all';
	function html5_shim(doc) {
		var html5_elements_array_count = -1;
		while (++html5_elements_array_count < html5_elements_array_length)
			doc.createElement(html5_elements_array[html5_elements_array_count]);
	}
	html5_shim(doc);
	html5_shim(doc_fragment);
	function parse_style_sheet_list(style_sheet_list, media) {
		var style_sheet_list_length = style_sheet_list.length,
			style_sheet_list_count = -1,
			style_sheet_list_each,
			css_text_array = [];
		while (++style_sheet_list_count < style_sheet_list_length) {
			style_sheet_list_each = style_sheet_list[style_sheet_list_count];
			media = style_sheet_list_each.media || media;
			css_text_array.push(parse_style_sheet_list(style_sheet_list_each.imports, media));
			css_text_array.push(style_sheet_list_each.cssText);
		}
		return css_text_array.join('');
	}
	win.attachEvent(
		'onbeforeprint',
		function() {
			var html5_elements_array_count = -1,
				html5_selector_matches,
				html5_selector_matches_array = [],
				style_sheet_cssText;
			while (++html5_elements_array_count < html5_elements_array_length) {
				var html5_elements_nodeList = doc.getElementsByTagName(html5_elements_array[html5_elements_array_count]),
					html5_elements_nodeList_length = html5_elements_nodeList.length,
					html5_elements_nodeList_count = -1;
				while (++html5_elements_nodeList_count < html5_elements_nodeList_length)
					if (html5_elements_nodeList[html5_elements_nodeList_count].className.indexOf('iepp_') < 0) html5_elements_nodeList[html5_elements_nodeList_count].className += ' iepp_'+html5_elements_array[html5_elements_array_count];
			}
			style_sheet_cssText = parse_style_sheet_list(doc.styleSheets, 'all');
			while ((html5_selector_matches = html5_selector_match.exec(style_sheet_cssText)) != null)
				html5_selector_matches_array.push(
					(html5_selector_matches[1]+html5_selector_matches[2]+html5_selector_matches[3]).replace(html5_selector_replace, '$1.iepp_$2')
					+html5_selector_matches[4]
				);
			head.insertBefore(style, head.firstChild);
			style.styleSheet.cssText = html5_selector_matches_array.join('\n');
			doc_fragment.appendChild(doc.body);
			html.appendChild(body);
			body.innerHTML = doc_fragment.firstChild.innerHTML.replace(html5_elements_replace, '<$1bdo');
		}
	);
	win.attachEvent(
		'onafterprint',
		function() {
			body.innerHTML = '';
			html.removeChild(body);
			head.removeChild(style);
			html.appendChild(doc_fragment.firstChild);
		}
	);
})(this, document);