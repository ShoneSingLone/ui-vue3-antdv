import { compile } from "vue";

export function compileVNode(template: string, state: any) {
    const render = compile(template);
    /* @ts-ignore */
    return render.call(state, state);
}