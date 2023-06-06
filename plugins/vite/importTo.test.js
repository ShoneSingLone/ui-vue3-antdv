import { load as CheerioLoad } from "cheerio";

const html = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="__VITE_ASSET__4a748afd__"
			id="svg_assets_img" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite + Vue + TS</title>
		<script>
			/* 开发调试的时候，不使用缓存 */
			localStorage.___VENTOSE_UI_IS_DEV_MODE = true;
			window.process={};
		</script>
		<script type="module" crossorigin src="./assets/index.714dfc1b.js"></script>
	</head>
	<body>
		<div id="app" class="x-loading"></div>
	</body>
</html>
`;


const $ = CheerioLoad(html);
const $body = $("body");
const bodyhtml = $body.html();
$body.empty();
const $mainJs = $(`script[type="module"]`);
console.log(bodyhtml, $mainJs.html());
