<script setup lang="ts">
import {inject} from "vue";
import {TableContext} from "@/components/Table/utils";
import {TableContextProps} from "@/components/Table/TableContext.vue";

defineOptions({
  name: "TableRow",
})

const {rowData} = defineProps<{
  rowData: any
}>();

const context = inject<TableContextProps>(TableContext);

</script>

<template>
  <div class="row">
    <span class="meta" v-for="(meta, index) in context?.tableColumn" :key="index"
          :style="{width: meta.width || '150px'}">
      {{ rowData[meta.dataIndex] }}
      <slot :row="rowData" :column="meta"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.row {
  padding: 10px;
}

.meta {
  display: inline-block;
  font-size: 14px;
  color: #555;
}
</style>
