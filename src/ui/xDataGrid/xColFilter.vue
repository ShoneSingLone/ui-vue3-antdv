<script lang="jsx">
import { defineComponent } from "vue";
import { _ } from "../loadCommonUtil";
import { filterColIsShow } from "./common";

export default defineComponent({
  name: "xColFilter",
  props: {
    configs: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleChecked(col) {
      const target = _.find(this.configs.columns, { key: col.key });
      target.isShow = _.isBoolean(target.isShow) ? !target.isShow : false;
    },
  },
  computed: {
    /*列顺序*/
    Cpt_ColumnsOrder() {
      const order = (() => {
        if (this.configs.columns_order) {
          return this.configs.columns_order;
        } else {
          return _.map(this.configs.columns, (i) => i.prop);
        }
      })();
      return _.filter(order, (i) => !!i);
    },

    /*列*/
    Cpt_Columns() {
      return _.map(this.Cpt_ColumnsOrder, (prop) =>
        _.find(this.configs.columns, { prop })
      );
    },

    checkedList() {
      return _.filter(this.Cpt_ColumnsOrder, (prop) => {
        const { isShow } = this.configs.columns[prop];
        return filterColIsShow(isShow, prop);
      });
    },
  },
});
</script>

<template>
  <aPopover placement="leftTop" trigger="click">
    <template #content>
      <p v-for="col in Cpt_Columns" :key="col.key">
        <aCheckbox
          :checked="checkedList.includes(col.key)"
          @change="handleChecked(col)"
          >{{ col.title }}</aCheckbox
        >
      </p>
    </template>
    <aButton>
      <template #icon>
        <link rel="icon" type="image/svg+xml" href="/SettingOutlined.svg" />
      </template>
    </aButton>
  </aPopover>
</template>
