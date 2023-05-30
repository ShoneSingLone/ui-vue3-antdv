declare type t_ReactiveState = {
    _$resetSelf: Function;
    _$null: Function;
};
/**
 * state 状态管理，state尽量使用原始类型
 * methods以 _$ 开头
 * @param stateAndMethods
 * @returns
 */
export declare function newReactiveState<T>(stateAndMethods: T): T & t_ReactiveState;
export {};
