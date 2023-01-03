<script setup lang="jsx">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import domUtils from "./utils/dom.js";

let $index = 0,
	$locknum = 0,
	$timer = {},
	$closeTimer = null;

const elRef = ref(null);

const data = reactive({
	opened: false,
	closeCls: "",
	toastIcon: {
		// ...
	},
	messageIcon: {
		// ...
	},
	vlayerOpts: {},
	tipArrow: null
});

onMounted(() => {
	if (props.modelValue) {
		open();
	}
	window.addEventListener("resize", autopos, false);
});

onUnmounted(() => {
	window.removeEventListener("resize", autopos, false);
	clearTimeout($closeTimer);
});

// 监听弹层v-model
watch(
	() => props.modelValue,
	val => {
		// console.log('V3Layer is now [%s]', val ? 'show' : 'hide')
		if (val) {
			open();
		} else {
			close();
		}
	}
);

// 打开弹窗
const open = () => {
	if (data.opened) return;
	data.opened = true;
	typeof props.onSuccess === "function" && props.onSuccess();

	const dom = elRef.value;
	// 弹层挂载位置
	if (props.teleport) {
		nextTick(() => {
			let teleportNode = document.querySelector(props.teleport);
			teleportNode.appendChild(dom);

			auto();
		});
	}

	callback();
};

// 关闭弹窗
const close = () => {
	if (!data.opened) return;

	let dom = elRef.value;
	let vlayero = dom.querySelector(".vlayer__wrap");
	let ocnt = dom.querySelector(".vlayer__wrap-cntbox");
	let omax = dom.querySelector(".vlayer__maximize");

	data.closeCls = true;
	clearTimeout($closeTimer);
	$closeTimer = setTimeout(() => {
		data.opened = false;
		data.closeCls = false;
		if (data.vlayerOpts.lockScroll) {
			$locknum--;
			if (!$locknum) {
				document.body.style.paddingRight = "";
				document.body.classList.remove("vui__body-hidden");
			}
		}
		if (props.time) {
			$index--;
		}
		// 清除弹窗样式
		vlayero.style.width =
			vlayero.style.height =
			vlayero.style.top =
			vlayero.style.left =
				"";
		ocnt.style.height = "";
		omax &&
			omax.classList.contains("maximized") &&
			omax.classList.remove("maximized");

		data.vlayerOpts.isBodyOverflow && (document.body.style.overflow = "");

		context.emit("update:modelValue", false);
		typeof props.onEnd === "function" && props.onEnd();
	}, 200);
};

// 弹窗位置
const auto = () => {
	// ...

	autopos();

	// 全屏弹窗
	if (props.fullscreen) {
		full();
	}

	// 弹窗拖动|缩放
	move();
};

const autopos = () => {
	if (!data.opened) return;
	let oL, oT;
	let pos = props.position;
	let isFixed = JSON.parse(props.fixed);
	let dom = elRef.value;
	let vlayero = dom.querySelector(".vlayer__wrap");

	if (!isFixed || props.follow) {
		vlayero.style.position = "absolute";
	}

	let area = [
		domUtils.client("width"),
		domUtils.client("height"),
		vlayero.offsetWidth,
		vlayero.offsetHeight
	];

	oL = (area[0] - area[2]) / 2;
	oT = (area[1] - area[3]) / 2;

	if (props.follow) {
		offset();
	} else {
		typeof pos === "object"
			? ((oL = parseFloat(pos[0]) || 0), (oT = parseFloat(pos[1]) || 0))
			: pos == "t"
			? (oT = 0)
			: pos == "r"
			? (oL = area[0] - area[2])
			: pos == "b"
			? (oT = area[1] - area[3])
			: pos == "l"
			? (oL = 0)
			: pos == "lt"
			? ((oL = 0), (oT = 0))
			: pos == "rt"
			? ((oL = area[0] - area[2]), (oT = 0))
			: pos == "lb"
			? ((oL = 0), (oT = area[1] - area[3]))
			: pos == "rb"
			? ((oL = area[0] - area[2]), (oT = area[1] - area[3]))
			: null;

		vlayero.style.left =
			parseFloat(isFixed ? oL : domUtils.scroll("left") + oL) + "px";
		vlayero.style.top =
			parseFloat(isFixed ? oT : domUtils.scroll("top") + oT) + "px";
	}
};

// 元素跟随定位
const offset = () => {
	let oW, oH, pS;
	let dom = elRef.value;
	let vlayero = dom.querySelector(".vlayer__wrap");

	oW = vlayero.offsetWidth;
	oH = vlayero.offsetHeight;
	pS = domUtils.getFollowRect(props.follow, oW, oH);
	data.tipArrow = pS[2];

	vlayero.style.left = pS[0] + "px";
	vlayero.style.top = pS[1] + "px";
};

// 最大化弹窗
const full = () => {
	// ...
};

// 恢复弹窗
const restore = () => {
	let dom = elRef.value;
	let vlayero = dom.querySelector(".vlayer__wrap");
	let otit = dom.querySelector(".vlayer__wrap-tit");
	let ocnt = dom.querySelector(".vlayer__wrap-cntbox");
	let obtn = dom.querySelector(".vlayer__wrap-btns");
	let omax = dom.querySelector(".vlayer__maximize");

	let t = otit ? otit.offsetHeight : 0;
	let b = obtn ? obtn.offsetHeight : 0;

	if (!data.vlayerOpts.lockScroll) {
		data.vlayerOpts.isBodyOverflow = false;
		document.body.style.overflow = "";
	}

	props.maximize && omax.classList.remove("maximized");

	vlayero.style.left = parseFloat(data.vlayerOpts.rect[0]) + "px";
	vlayero.style.top = parseFloat(data.vlayerOpts.rect[1]) + "px";
	vlayero.style.width = parseFloat(data.vlayerOpts.rect[2]) + "px";
	vlayero.style.height = parseFloat(data.vlayerOpts.rect[3]) + "px";
};

// 拖动|缩放弹窗
const move = () => {
	// ...
};

// 事件处理
const callback = () => {
	// 倒计时关闭
	if (props.time) {
		$index++;
		// 防止重复点击
		if ($timer[$index] !== null) clearTimeout($timer[$index]);
		$timer[$index] = setTimeout(() => {
			close();
		}, parseInt(props.time) * 1000);
	}
};

// 点击最大化按钮
const maximizeClicked = e => {
	let o = e.target;
	if (o.classList.contains("maximized")) {
		// 恢复
		restore();
	} else {
		// 最大化
		full();
	}
};
// 点击遮罩层
const shadeClicked = () => {
	if (JSON.parse(props.shadeClose)) {
		close();
	}
};
// 按钮事件
const btnClicked = (e, index) => {
	let btn = props.btns[index];
	if (!btn.disabled) {
		typeof btn.click === "function" && btn.click(e);
	}
};
</script>

<template>
	<div
		ref="elRef"
		v-show="opened"
		class="vui__layer"
		:class="{ 'vui__layer-closed': closeCls }"
		:id="id">
		<!-- //蒙版 -->
		<div
			v-if="JSON.parse(shade)"
			class="vlayer__overlay"
			@click="shadeClicked"
			:style="{ opacity }"></div>
		<div
			class="vlayer__wrap"
			:class="['anim-' + anim, type && 'popui__' + type, tipArrow]"
			:style="[layerStyle]">
			<div v-if="title" class="vlayer__wrap-tit" v-html="title"></div>
			<div
				v-if="type == 'toast' && icon"
				class="vlayer__toast-icon"
				:class="['vlayer__toast-' + icon]"
				v-html="toastIcon[icon]"></div>
			<div class="vlayer__wrap-cntbox">
				<!-- 判断插槽是否存在 -->
				<template v-if="$slots.content">
					<div class="vlayer__wrap-cnt"><slot name="content" /></div>
				</template>
				<template v-else>
					<template v-if="content">
						<iframe
							v-if="type == 'iframe'"
							scrolling="auto"
							allowtransparency="true"
							frameborder="0"
							:src="content"></iframe>
						<!-- message|notify|popover -->
						<div
							v-else-if="
								type == 'message' || type == 'notify' || type == 'popover'
							"
							class="vlayer__wrap-cnt">
							<i
								v-if="icon"
								class="vlayer-msg__icon"
								:class="icon"
								v-html="messageIcon[icon]"></i>
							<div class="vlayer-msg__group">
								<div
									v-if="title"
									class="vlayer-msg__title"
									v-html="title"></div>
								<div v-html="content"></div>
							</div>
						</div>
						<div v-else class="vlayer__wrap-cnt" v-html="content"></div>
					</template>
				</template>
				<slot />
			</div>
			<div v-if="btns" class="vlayer__wrap-btns">
				<span
					v-for="(btn, index) in btns"
					:key="index"
					class="btn"
					:style="btn.style"
					@click="btnClicked($event, index)"
					v-html="btn.text"></span>
			</div>
			<span
				v-if="xclose"
				class="vlayer__xclose"
				:class="!maximize && xposition"
				:style="{ color: xcolor }"
				@click="close"></span>
			<span
				v-if="maximize"
				class="vlayer__maximize"
				@click="maximizeClicked($event)"></span>
			<span v-if="resize" class="vlayer__resize"></span>
		</div>
		<!-- 优化拖拽卡顿 -->
		<div class="vlayer__dragfix"></div>
	</div>
</template>
