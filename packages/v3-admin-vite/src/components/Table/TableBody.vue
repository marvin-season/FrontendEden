<script setup lang="ts">
import {inject} from "vue";
import {TableContext} from "@/components/Table/utils";
import TableRow from "@/components/Table/TableRow.vue";
import {TableProps} from "@/components/Table/index.vue";

defineOptions({
  name: 'TableContent',
});

const a = inject<TableProps<any>>(TableContext)
console.log("🚀 => ", a?.tableData);
</script>

<template>
  <template v-for="rowData in a?.data" :key="rowData.id">
    <TableRow :row-data="rowData">
      <template #default="{column, row}">
        <slot :row="row" :column="column"></slot>
      </template>
    </TableRow>
  </template>
</template>

<style scoped lang="scss">

</style>
