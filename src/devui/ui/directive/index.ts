//@ts-nocheck

import { installPopoverDirective } from "./popover";
import installLoading from "./loading";
import { installMoveDirective } from "./move";

export const installDirective = (app, options) => {
	installPopoverDirective(app, options);
	[installLoading, installMoveDirective].forEach(install => install(app));
};
