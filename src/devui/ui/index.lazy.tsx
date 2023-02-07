//@ts-nocheck

import "./index.less";
import {
	Alert,
	Avatar,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Descriptions,
	Dropdown,
	Input,
	Layout,
	List,
	Menu,
	Modal,
	PageHeader,
	Popconfirm,
	Popover,
	Progress,
	Result,
	Spin,
	Switch,
	Table,
	Tabs,
	Tooltip,
	Upload
} from "ant-design-vue";
import { DescriptionsItem } from "ant-design-vue/es/descriptions";
import { MenuItem, SubMenu } from "ant-design-vue/es/menu";
import { BreadcrumbItem } from "ant-design-vue/es/breadcrumb";
import { DropdownButton } from "ant-design-vue/es/dropdown";
import { TabPane } from "ant-design-vue/es/tabs";
import { InputPassword } from "ant-design-vue/es/input";
import {
	LayoutContent,
	LayoutFooter,
	LayoutHeader,
	LayoutSider
} from "ant-design-vue/es/layout";
/* 表单提示信息 */
import "ant-design-vue/es/form/style/index.css";
import $ from "jquery";
import { installPopoverDirective } from "./xSingle/directive/popover";
import xRender from "./xRender/xRender.jsx";
import xItem from "./xForm/xItem.vue";
import xForm from "./xForm/xForm.vue";
import xButton from "./xButton/xButton";
import xButtonCountDown from "./xButton/xButtonCountDown.vue";
import { xGap } from "./xLayout/xGap";
import xCharts from "./xCharts/xCharts.vue";
import xView from "./xView/xView.vue";
import xDataGrid from "./xDataGrid/xDataGrid.vue";
import xDataGridToolbar from "./xDataGrid/xDataGridToolbar.vue";
import xCellLabel from "./xDataGrid/xCellLabel.vue";
import { xPagination } from "./xDataGrid/xPagination";
import xColFilter from "./xDataGrid/xColFilter.vue";
import { installUIDialogComponent } from "./xSingle/dialog/dialog";
import { xU as mylodash } from "./ventoseUtils.js";
import { Cpt_UI_locale, State_UI } from "./State_UI";
import dayjs from "dayjs";
import {
	defCol,
	defColActions,
	defColActionsBtnlist,
	defDataGridOption,
	defPagination,
	getPaginationPageSize,
	setDataGridInfo,
	setPagination
} from "./xDataGrid/common";
import { antColKey, defItem, vModel } from "./xForm/common.jsx";
import { AllWasWell, EVENT_TYPE, validateForm } from "./tools/validate.js";
import { setCSSVariables, setDocumentTitle } from "./tools/dom.js";
import { lStorage } from "./tools/storage.js";
import { pickValueFrom, resetValueOf } from "./tools/form.js";
import { UI } from "./UI";
/* @ts-ignore */
window.dayjs = dayjs;
/* @ts-ignore */
window.moment = dayjs;
/* @ts-ignore */
window.jquery = $;

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
	xDataGrid,
	xDataGridToolbar,
	xColFilter,
	xPagination,
	xCellLabel
};

/* ant-d-v */
const componentAntdV = {
	Avatar,
	Alert,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Descriptions,
	DescriptionsItem,
	Progress,
	Popover,
	Menu,
	MenuItem,
	Modal,
	SubMenu,
	Dropdown,
	DropdownButton,
	Button,
	List,
	Checkbox,
	Popconfirm,
	PageHeader,
	Input,
	InputPassword,
	Result,
	Table,
	Tabs,
	TabPane,
	Tooltip,
	Spin,
	Layout,
	LayoutHeader,
	LayoutSider,
	LayoutFooter,
	LayoutContent,
	Upload,
	Switch
};

const components = {
	...componentAntdV,
	...componentMyUI
};

export { UI as UI };
export { dayjs as moment };
export { dayjs as dayjs };
export { mylodash as _ };
export { $ as $ };
export { defPagination as defPagination };
export { defCol as defCol };
export { defColActions as defColActions };
export { defColActionsBtnlist as defColActionsBtnlist };
export { defDataGridOption as defDataGridOption };
export { setDataGridInfo as setDataGridInfo };
/* State_UI作为句柄，与外部通信，$t language 等属性 */
export { State_UI as State_UI };
export { Cpt_UI_locale as Cpt_UI_locale };
export { lStorage as lStorage };
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

export const VentoseUIWithInstall = {
	install: (app, options /* {appPlugins,dependState} */) => {
		installPopoverDirective(app, options);
		installUIDialogComponent(UI, options, app);
		mylodash.each(components, (component, name) => {
			if (component.name) {
				name = component.name;
			} else {
				mylodash.doNothing(name, `miss name`);
				debugger;
			}
			app.component(component.name || name, component);
		});
	}
};
