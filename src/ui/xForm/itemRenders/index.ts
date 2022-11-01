import Input from "./Input.jsx";
import DatePicker from "./DatePicker";
import RangePicker from "./RangePicker";
import Checkbox from "./Checkbox";
import Select from "./Select";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import Switch from "./Switch";
import { InputProps, TextAreaProps } from "ant-design-vue";

const itemRenders = {
	Input,
	Checkbox,
	Select,
	Switch,
	DatePicker,
	RangePicker,
	RadioGroup,
	CheckboxGroup
};
export default itemRenders;

export type t_xItem = keyof typeof itemRenders;

export type t_itemConfigs =
	| {
			label?: string | Function | JSX.Element;
			/*该组件是否显示，默认显示 Function 作为 setup computed的参数传入，boolean作为返回值*/
			isShow?: boolean | Function;
			rules?: any[];
			options?: any[];
			itemType?: t_xItem | Function;
			once?: Function;
			placeholder?: string;
			value: any;
			max?: number;
			isTextarea?: boolean;
			prop: string;
	  }
	| InputProps
	| TextAreaProps;
