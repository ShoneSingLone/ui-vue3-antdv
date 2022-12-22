//@ts-nocheck

import "./index.less";
import "./ui.scss";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import $ from "jquery";
import xRender from "./xRender/xRender.jsx";
import xItem from "./xForm/xItem.vue";
import xForm from "./xForm/xForm.vue";
import xButton from "./xButton/xButton";
import xButtonCountDown from "./xButton/xButtonCountDown.vue";
import xGap from "./xLayout/xGap.vue";
import xCharts from "./xCharts/xCharts.vue";
import xView from "./xView/xView.vue";
import xIcon from "./xIcon/xIcon.vue";
import xDataGrid from "./xDataGrid/xDataGrid.vue";
import xDataGridToolbar from "./xDataGrid/xDataGridToolbar.vue";
import xCellLabel from "./xDataGrid/xCellLabel.vue";
import { xPagination } from "./xDataGrid/xPagination";
import xColFilter from "./xDataGrid/xColFilter.vue";
import xVirScroll from "./xSingle/xScroll/xVirScroll.vue";
import {
	defXVirTableConfigs as defXVirTableConfigs,
	xVirTable
} from "./xDataGrid/xVirTable/xVirTable";
import { xU } from "./ventoseUtils";
import { State_UI, Cpt_UI_locale } from "./State_UI";
import dayjs from "dayjs";
import { RegexFn, FormRules } from "./xForm/FormRules";
import { installPopoverDirective } from "./xSingle/directive/popover";
import { installUIDialogComponent } from "./xSingle/dialog/dialog";
import { installDirective } from "./directive";

/* @ts-ignore */
window.dayjs = dayjs;
/* @ts-ignore */
window.moment = dayjs;
/* @ts-ignore */
window.jquery = $;

import {
	defPagination,
	setPagination,
	getPaginationPageSize,
	defCol,
	defColActions,
	defColActionsBtnlist,
	defDataGridOption,
	setDataGridInfo
} from "./xDataGrid/common";
import { defItem, vModel, antColKey } from "./xForm/common.jsx";
import { EVENT_TYPE, validateForm, AllWasWell } from "./tools/validate.js";
import { setDocumentTitle, setCSSVariables } from "./tools/dom.js";
import { lStorage, iStorage } from "./tools/storage.js";
import { pickValueFrom, resetValueOf, setValueTo } from "./tools/form.js";
import { UI } from "./UI";
import { VNodeCollection } from "./tools/VNodeRender";
import { compileVNode } from "./tools/framework";

/* my-private-ui-component */
const componentMyUI = {
	xButton,
	xRender,
	xItem,
	xForm,
	xButtonCountDown,
	xGap,
	xCharts,
	xView,
	xIcon,
	xDataGrid,
	xDataGridToolbar,
	xColFilter,
	xPagination,
	xCellLabel,
	xVirScroll,
	xVirTable
};

export const components = {
	...componentMyUI
};

export { VNodeCollection as VNodeCollection };
export { UI as UI };
export { dayjs as moment };
export { dayjs as dayjs };
export { xU as xU };
export { $ as $ };
export { defPagination as defPagination };
export { defCol as defCol };
export { defColActions as defColActions };
export { defColActionsBtnlist as defColActionsBtnlist };
export { defDataGridOption as defDataGridOption };
export { defXVirTableConfigs as defXVirTableConfigs };
export { setDataGridInfo as setDataGridInfo };
/* State_UI作为句柄，与外部通信，$t language 等属性 */
export { State_UI as State_UI };
export { Cpt_UI_locale as Cpt_UI_locale };
export { lStorage as lStorage };
export { iStorage as iStorage };
export { EVENT_TYPE as EVENT_TYPE };

export { setPagination as setPagination };
export { getPaginationPageSize as getPaginationPageSize };

export { validateForm as validateForm };
export { AllWasWell as AllWasWell };
export { setDocumentTitle as setDocumentTitle };
export { setCSSVariables as setCSSVariables };
export { defItem as defItem };
export { vModel as vModel };
export { antColKey as antColKey };
export { pickValueFrom as pickValueFrom };
export { resetValueOf as resetValueOf };
export { setValueTo as setValueTo };
export { RegexFn as RegexFn };
export { FormRules as FormRules };
export { compileVNode as compileVNode };

export const VentoseUIWithInstall = {
	install: (app, options /* {appPlugins,dependState} */) => {
		installDirective(app, options);
		installUIDialogComponent(UI, options, app);
		xU.each(components, (component, name) => {
			if (component.name) {
				name = component.name;
			} else {
				xU.doNothing(name, `miss name`);
			}
			app.component(component.name || name, component);
		});
		app.use(Antd);
	}
};
