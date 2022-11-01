//@ts-nocheck

import installLoading from "./loading";
export const installDirective = (app, options) => {
	[installLoading].forEach(install => install(app));
};
