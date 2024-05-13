<script setup lang="ts">
import {inject} from "vue";
import {TableContextProvider, TableEventProvider} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";

defineOptions({
  name: "TableRow",
})

const {rowData} = defineProps<{
  rowData: any
}>();

const context = inject<TableProps<any>>(TableContextProvider);
const tableEventProvider = inject<any>(TableEventProvider)
const handleClickRow = () => {

}
</script>

<template>
  <div @click="handleClickRow">
    <div class="goat_meta" v-for="(meta, index) in context?.column" :key="index"
         :style="{width: meta.width || '150px'}">

      <el-input
        style="width: 80%"
        v-if="!meta.type && meta.editable && context?.editRowData?.id === rowData?.id"
        v-model="rowData[meta.dataIndex]">
      </el-input>
      <span class="expand" v-else-if="meta.type === 'expand'" @click="tableEventProvider?.clickRow(rowData)">
        {{ tableEventProvider?.expandScope.rows.has(rowData) ? '-' : '+' }}
      </span>
      <span v-else>{{ rowData[meta.dataIndex] }}</span>
      <slot :row="rowData" :column="meta"></slot>
    </div>
  </div>

</template>

<style scoped lang="scss">

.goat_meta {
  display: inline-block;
  font-size: 14px;
  color: #555;
}

.expand {
  font-size: 20px;
}
</style>
