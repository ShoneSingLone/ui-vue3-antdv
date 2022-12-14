import { compile } from "vue";

/* resolveComponent 需要放在渲染函数中，因为在rendering ，才有instance 才能获取当前实例注册的components，instance =》 app 又是一路查找上去*/
export function compileVNode(template: string, state: any) {
	const render = compile(template);
	/* @ts-ignore */
	return render.call(state, state);
}
