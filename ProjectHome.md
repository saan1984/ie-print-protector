# IE Print Protector #

IE Print Protector is a piece of javascript that allows you to print HTML5 pages in Internet Explorer.

IE Print Protector helps IE render HTML5 elements correctly, both on screen and in print.


# Printing HTML5 in Internet Explorer #

Internet Explorer 6, 7, and 8 do not recognize new HTML5 elements. IE treats unknown element start `<section>` and end `</section>` tags as void elements. This means unknown elements no longer wrap their contents, making them impossible to style and spilling their contents into the DOM.

In this example we have an article element wrapping a heading and paragraph with some text.

```
<article>
	<h1>
		Lorem ipsum
	</h1>
	<p>
		Dolor sit amet, consectetur adipisicing elit.
	</p>
</article>
```

Since Internet Explorer voids the article element, the heading and paragraph are pushed out.

```
<article />
<h1>
	Lorem ipsum
</h1>
<p>
	Dolor sit amet, consectetur adipisicing elit.
</p>
```


# How IE Print Protector works #

To display elements on screen, IE Print Protector uses a shim, a piece of javascript which forces support for HTML5 elements in Internet Explorer.

To display elements correctly in print, IE Print Protector temporarily replaces HTML5 elements with supported fallback elements (like div and span) when you print. IE Print Protector also creates a special stylesheet for these elements based on your existing styles; this means you can safely style HTML5 elements by element name in links, styles, and even imports. Immediately after, IE Print Protector restores the original HTML5 element to the page, right where you left it. Any references to those elements and any events on those elements will remain intact.


# IE Print Protector in action #

http://www.iecss.com/print-protector/example_print.html Review an example of a page not running IE Print Protector, but instead running a popular HTML5 IE enabled script. In Internet Explorer, use the File menu to select Print Preview and see how the styling for all HTML5 elements is missing. This is the default behavior for Internet Explorer 6, 7, and 8.

http://www.iecss.com/print-protector/example_print_iepp.html Review an example of a page running IE Print Protector. In Internet Explorer, use the File menu to select Print Preview and see how the styling for all HTML5 elements is working. Afterwards, you'll see that a javascript mouseover event is still working.