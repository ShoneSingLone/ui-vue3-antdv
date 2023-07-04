import Input from "./Input.jsx";
import DatePicker from "./DatePicker";
import RangePicker from "./RangePicker";
import { Checkbox } from "./Checkbox";
import Select from "./Select";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import { xSwitch } from "./xSwitch";
import { InputProps, TextAreaProps } from "element-plus";

const itemRenders = {
	Input,
	Checkbox,
	Select,
	Switch: xSwitch,
	DatePicker,
	RangePicker,
	RadioGroup,
	CheckboxGroup
};
export default itemRenders;

export type t_xItem = keyof typeof itemRenders;

export type t_itemConfigs =
	| {
			style?: any;
			label?: string | Function | JSX.Element;
			/*该组件是否显示，默认显示 Function 作为 setup computed的参数传入，boolean作为返回值*/
			isShow?: boolean | Function;
			rules?: any[];
			options?: any[];
			itemType?: t_xItem | Function;
			once?: Function;
			placeholder?: string;
			/* modelValue 优先级更高 */
			value: any;
			/* 默认值 */
			defaultValue?: any;
			max?: number;
			isReadonly?: boolean;
			isPassword?: boolean;
			isNumber?: boolean;
			isTextarea?: boolean;
			isSearch?: boolean;
			prop: string;
			onAfterValueEmit?: Function;
	  }
	| InputProps
	| TextAreaProps;
