<template>
	<div class="flex vertical" style="text-align: left">
		<div class="flex middle">
			<xIcon icon="unknown" class="auto-size" />
			未加载出来默认图标
		</div>
		<div class="">
			<h2>
				ventoseUI 内置svg,在预置按钮里面用。以Inside作为前缀,一般不需要用到
			</h2>
			<div class="flex">
				<xIcon icon="InsideDeleteOutlined" style="color: gray" />
				<xIcon icon="InsideExclamationCircleOutlined" style="color: red" />
				<xIcon icon="InsideLoadingOutlined" />
				<xIcon icon="InsideSaveOutlined" />
				<xIcon icon="InsideSearchOutlined" />
				<xIcon icon="InsideSyncOutlined" />
				<xIcon icon="InsideUploadOutlined" />
			</div>
		</div>

		<div class="">
			<h2>从/public/assets/svg加载</h2>
			<div class="flex vertical">
				<span>
					<xIcon
						icon="vite"
						style="color: red; width: 64px; height: 64px"
						class="auto-size" />
					vite
				</span>
				<span>
					<xIcon
						icon="UserOutlined"
						style="color: gray; width: 64px; height: 64px" />
					UserOutlined
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DemoXIcon"
};
</script>

<style></style>
