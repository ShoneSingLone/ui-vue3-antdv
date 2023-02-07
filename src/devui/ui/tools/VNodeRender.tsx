import { VNode } from "vue";

export const VNodeCollection = {
	labelTips: (popContent: VNode) => (configs: any, className: string) => {
		const { prop, label } = configs;
		return (
			<div class="ant-form-item-label">
				<label for={prop} class={className}>
					{label}
					<aPopover trigger="hover" placement="top">
						{{
							content: () => popContent,
							default: () => <xIcon icon="Insidetips" class="pointer" />
						}}
					</aPopover>
				</label>
			</div>
		);
	}
};
