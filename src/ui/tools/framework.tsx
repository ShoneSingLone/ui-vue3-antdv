import { defineComponent, h } from "vue";
import { xU } from "../ventoseUtils";

const DELAY = 60 * 5;
const CACHE_V_NODE: { [prop: string]: any } = {};
const WILL_DELETE_PROPS = {
	idCounts: {},
	add(prop: string) {
		/* @ts-ignore */
		const count = this.idCounts[prop] || 0;
		/* @ts-ignore */
		this.idCounts[prop] = count + 1;
	},
	remove(prop: string) {
		/* @ts-ignore */
		const count = this.idCounts[prop] || 0;
		const val = count - 1;
		/* @ts-ignore */
		this.idCounts[prop] = val < 0 ? 0 : val;
		/* console.log("remove", prop); */
	}
};

const deleteUnmountedInstance = (prop: string) => {
	/* @ts-ignore */
	WILL_DELETE_PROPS.add(prop);
	/* console.log(`will delete [${prop}] after ${DELAY}s`); */
	/* console.log(`WILL_DELETE_INSTANCE_PROPS`, WILL_DELETE_PROPS.cache); */
	delayDeleteUnmountedInstance();
};

const delayDeleteUnmountedInstance = xU.debounce(function () {
	xU.each(WILL_DELETE_PROPS.idCounts, (count, prop) => {
		/* console.log(prop, count); */
		if (count > 0) {
			/* @ts-ignore */
			delete CACHE_V_NODE[prop];
			/* @ts-ignore */
			delete WILL_DELETE_PROPS.idCounts[prop];
			/* console.error(`deleted ${prop}`) */
		}

		/* 如果缓存中已无相关引用，删除索引 */
		if (!Object.keys(CACHE_V_NODE).includes(prop)) {
			/* @ts-ignore */
			delete WILL_DELETE_PROPS.idCounts[prop];
		}
	});
}, 1000 * DELAY);

/* resolveComponent 需要放在渲染函数中，因为在rendering ，才有instance 才能获取当前实例注册的components，instance =》 app 又是一路查找上去*/
export function compileVNode(template: string, setupReturn: object, prop: any) {
	if (xU.isPlainObject(prop) && prop.vNode) {
		return prop.vNode;
	}

	const no_cache = !prop;

	if (xU.isString(no_cache) && CACHE_V_NODE[prop]) {
		/* 已在复用，不可删除 */
		WILL_DELETE_PROPS.remove(prop);
		/* 延迟删除 */
		delayDeleteUnmountedInstance();
		/* console.warn(`reuse ${prop}`); */
		/* console.log(`WILL_DELETE_INSTANCE_PROPS`, WILL_DELETE_PROPS.cache); */
		return CACHE_V_NODE[prop];
	}

	const vNode = h(
		defineComponent({
			template,
			mounted() {
				if (no_cache) {
					return;
				}
				/* 已在复用，不可删除 */
				WILL_DELETE_PROPS.remove(prop);
				/* @ts-ignore */
				CACHE_V_NODE[prop] = this._.vnode;
				/* console.log(`compileVNode ${prop} ${template}`); */
			},
			unmounted() {
				if (no_cache) {
					return;
				}
				deleteUnmountedInstance(prop);
			},
			setup() {
				if (xU.isFunction(setupReturn)) {
					return setupReturn();
				} else {
					return setupReturn;
				}
			}
		})
	);

	if (xU.isPlainObject(prop)) {
		prop.vNode = vNode;
	} else {
		return vNode;
	}
}
