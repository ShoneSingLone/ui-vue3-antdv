import $ from "jquery";
import { xU } from "../ventoseUtils";

const get$head = () => {
	let $head = $("html head");
	if (!xU.is$Selected($head)) {
		$head = $("<head/>");
		$head.prependTo($("html"));
	}
	return $head;
};

const get$title = () => {
	let $head = get$head();
	let $title = $head.find("title");
	if (!xU.is$Selected($title)) {
		$title = $("<title/>");
		$title.prependTo($head);
	}
	return $title;
};

const get$cssVariables = () => {
	let $head = get$head();
	let $cssVariables = $head.find("#cssVariables");
	if (!xU.is$Selected($cssVariables)) {
		$cssVariables = $("<style/>", { id: "cssVariables" });
		$cssVariables.appendTo($head);
	}
	return $cssVariables;
};

/**
 * setTitle
 * @param {*} title
 */
export const setDocumentTitle = title => {
	/* document.title = title; */
	/* 没啥特别意思，就是想用一下jQuery */
	get$title().text(title);
};

/**
 *
 * @param {*} colors
 */
export const setCSSVariables = colors => {
	let $cssVariables = get$cssVariables();
	const cssContent = xU
		.map(colors, (value, prop) => `--${prop}:${value}`)
		.join(";");
	$cssVariables.text(`:root{${cssContent}}`);
};
