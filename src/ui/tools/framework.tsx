import { h, defineComponent, onMounted, onUnmounted } from "vue";
import { xU } from "../ventoseUtils";

const DELAY = 60 * 5;
const CACHE: { [prop: string]: any } = {};
const WILL_DELETE_PROPS = {
	cache: {},
	add(prop: string) {
		/* @ts-ignore */
		const count = this.cache[prop] || 0;
		/* @ts-ignore */
		this.cache[prop] = count + 1;
	},
	remove(prop: string) {
		/* @ts-ignore */
		const count = this.cache[prop] || 0;
		const val = count - 1;
		/* @ts-ignore */
		this.cache[prop] = val < 0 ? 0 : val;
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
	xU.each(WILL_DELETE_PROPS.cache, (count, prop) => {
		/* console.log(prop, count); */
		if (count > 0) {
			/* @ts-ignore */
			delete CACHE[prop];
			/* @ts-ignore */
			delete this.cache[prop];
			/* console.error(`deleted ${prop}`) */
		}

		/* 如果缓存中已无相关引用，删除索引 */
		if (!Object.keys(CACHE).includes(prop)) {
			/* @ts-ignore */
			console.log(prop, this.cache[prop]);
			/* @ts-ignore */
			delete this.cache[prop];
		}
	});
}, 1000 * DELAY);

/* resolveComponent 需要放在渲染函数中，因为在rendering ，才有instance 才能获取当前实例注册的components，instance =》 app 又是一路查找上去*/
export function compileVNode(
	template: string,
	setupReturn: object,
	prop: string
) {
	if (!prop) {
		alert("miss uniq id" + template);
	}

	if (CACHE[prop]) {
		/* 已在复用，不可删除 */
		WILL_DELETE_PROPS.remove(prop);
		/* 延迟删除 */
		delayDeleteUnmountedInstance();
		/* console.warn(`reuse ${prop}`); */
		/* console.log(`WILL_DELETE_INSTANCE_PROPS`, WILL_DELETE_PROPS.cache); */
		return CACHE[prop];
	} else {
		return h(
			defineComponent({
				template,
				mounted() {
					/* 已在复用，不可删除 */
					WILL_DELETE_PROPS.remove(prop);
					/* @ts-ignore */
					CACHE[prop] = this._.vnode;
					/* console.log(`compileVNode ${prop} ${template}`); */
				},
				unmounted() {
					deleteUnmountedInstance(prop);
				},
				setup() {
					return setupReturn;
				}
			})
		);
	}
}
