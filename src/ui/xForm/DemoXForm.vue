<template>
    <div>
        <div class="flex middle">
            <span class="mr10">{{ formData.inputValue }}</span>
            <xItem :configs="xForm.search" class="flex1 " v-model="formData.inputValue" />
            <xItem :configs="xForm.withLabelProperty" class="flex1 " v-model="formData.inputValue" />
        </div>
        <div class="flex middle mt10">
            <span class="mr10">{{ xForm.select.value }}</span>
            <xItem :configs="xForm.select" class="flex1 " />
        </div>
    </div>
</template>
  
<script>
import {
    defCol,
    defColActions,
    _,
    UI,
    defColActionsBtnlist,
    defDataGridOption,
    defItem,
    vModel,
    setDataGridInfo,
    State_UI,
    getPaginationPageSize,
    Utils,
} from "@ventose/ui";

const { $t } = State_UI;

async function log() {
    const text = this.text;
    this.text = "loading...";
    await _.sleep(1000);
    this.text = text;
}

export default {
    data() {
        const xForm = {
            ...defItem({
                prop: "search",
                placeholder: "Input",
                allowClear: true,
                onAfterValueChange(val) {
                    console.log('🚀:', 'search configs', this, val);
                },
            }),
            ...defItem({
                label: "withLabelProperty",
                prop: "withLabelProperty",
                placeholder: "Input",
                allowClear: true
            }),
            ...defItem({
                value: [],
                prop: "select",
                label: $t("类型").label,
                itemType: "Select",
                options: [
                    {
                        label: $t("类型A").label,
                        value: "AAA"
                    },
                    {
                        label: $t("类型B").label,
                        value: "BBB"
                    }
                ],
                mode: "multiple",
                maxTagCount: 1,
                maxTagTextLength: 10,
                style: { width: "200px" }
            })
        };
        return {
            formData: {
                inputValue: '可以单独使用v-model绑定数据',
            },
            xForm
        };
    },
};
</script>
  
<style>

</style>
  