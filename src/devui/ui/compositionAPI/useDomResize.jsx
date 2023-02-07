export const usefnObserveDomResize = () => {
	function fnObserveDomResize($el, callback) {
		//初始化这个观察类 如果有变化了 那么就调用二chart的resize方法改变大小
		this.resizeObserver = new ResizeObserver(callback);
		// this.resizeObserver = new ResizeObserver(xU.debounce(callback, 300));
		this.resizeObserver.observe($el); //观察这个dom
	}
	function fnUnobserveDomResize($el) {
		this.resizeObserver.unobserve($el);
	}

	return {
		fnObserveDomResize,
		fnUnobserveDomResize
	};
};
