
<script lang="tsx">
import { xU } from "@ventose/ui";
import { defineComponent } from "vue";


const getIcon = icon => {
	return <xIcon icon={icon} style="width:16px;height:100%;" class="auto-size" />;
};


export default defineComponent({
	name: "xMenuTree",
	props: ["tree", "authFn"],
	setup() {
		return {};
	},
	data(vm) {
		vm.setActiveMenuHighlight = xU.debounce(function () {
			/* @ts-ignore */
			const openKey = vm.pathAndIdCollection[vm.currentPath];
			if (!openKey) {
				return;
			}
			vm.onOpenChange([openKey]);
			/* @ts-ignore */
			vm.arr_selectedMenuId = [openKey];
		}, 300);

		return {
			openKeys: [],
			pathAndIdCollection: {},
			arr_selectedMenuId: []
		};
	},
	watch: {
		currentPath: {
			immediate: true,
			handler() {
				if (this.setActiveMenuHighlight) {
					this.setActiveMenuHighlight()
				}
			}
		}
	},
	methods: {
		onOpenChange(openKeys) {
			if (!xU.isArrayFill(openKeys)) {
				return;
			}
			const latestOpenKey: string = xU.last(openKeys) || "";
			const openKeyArray = xU.safeSplit(latestOpenKey, "###").filter(i => i);
			const _openKeys: string[] = [];
			for (let index = 0; index < openKeyArray.length; index++) {
				const element = openKeyArray[index];
				if (index === 0) {
					_openKeys[0] = `###${element}`;
				} else {
					_openKeys[index] = `${_openKeys[index - 1]}###${element}`;
				}
			}
			this.openKeys = _openKeys;
		}
	},
	computed: {
		currentPath() {
			return this.$route.path;
		},
		subTree() {
			const vm = this;
			const treeArray = this.tree || [];
			const MenuItemRender = (currentMenuInfo, parentId) => {
				const currentId = `${parentId}###${currentMenuInfo.id}`;
				/* 权限控制，要求某属性能够匹配权限token */
				if (this.authFn) {
					/* 如果没有通过 */
					if (!this.authFn(currentMenuInfo)) {
						return null;
					}
				}
				if (xU.isArrayFill(currentMenuInfo.children)) {
					return (
						<aSubMenu
							key={currentId}
							v-slots={{
								icon: () => getIcon(currentMenuInfo.icon),
								title: () => currentMenuInfo.label,
								default: () => xU.map(currentMenuInfo.children, i => MenuItemRender(i, currentId))
							}}
						/>
					);
				} else {
					vm.pathAndIdCollection[currentMenuInfo.path] = currentId;
					return (
						<elMenuItem key={currentId} class="flex middle">
							{{
								icon: () => getIcon(currentMenuInfo.icon),
								title: () => currentMenuInfo.label,
								default: () => {
									/*其他配置信息*/
									if (currentMenuInfo.payload) {
										/*使用浏览器newTab展示新页面*/
										if (currentMenuInfo.payload.openType && currentMenuInfo.payload.openType === 'NEW_TAB') {
											const isDisabled = {};
											if (!currentMenuInfo.path) {
												/* @ts-ignore */
												isDisabled.disabled = true;
											}
											return (
												<a
													title={currentMenuInfo.label}
													{...isDisabled}
													href={currentMenuInfo.path}
													target="_blank"
													onClick={e => {
														e.stopPropagation();
														e.preventDefault();
														if (!currentMenuInfo.path) {
															return;
														}
														currentMenuInfo.path && window.open(currentMenuInfo.path, "_blank");
													}}>
													{currentMenuInfo.label}
												</a>
											);
										}
									}
									return (
										<>
											{			/* @ts-ignore */}
											<RouterLink to={currentMenuInfo.path || "/404"}>
												{currentMenuInfo.label}
												{			/* @ts-ignore */}
											</RouterLink>
										</>
									);
								}
							}}
						</elMenuItem>
					);
				}
			};

			if (xU.isArrayFill(treeArray)) {
				// return <pre><code>{JSON.stringify(treeArray,null,2)}</code></pre>;
				return xU.map(treeArray, i => {
					return MenuItemRender(i, "");
				});
			} else {
				return null;
			}
		}
	},
	render() {
		return <elMenu openKeys={this.openKeys} onOpenChange={this.onOpenChange} v-model:selectedKeys={this.arr_selectedMenuId} mode="inline">
			{this.subTree}
		</elMenu>
	}
});

</script>

<style></style>