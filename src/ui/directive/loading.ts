//@ts-nocheck

import $ from "jquery";

export default function (app, options = {}) {
	app.directive("xloading", {
		updated(el, binding) {
			if (binding.value) {
				$(el).addClass("x-loading");
			} else {
				$(el).removeClass("x-loading");
			}
		}
	});
}
