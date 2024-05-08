<script setup lang="ts">
import {inject} from "vue";
import {TableContext} from "@/components/Table/utils";
import {TableContextProps} from "@/components/Table/TableContext.vue";
import TableRow from "@/components/Table/TableRow.vue";

defineOptions({
  name: 'TableContent',
});

const a = inject<TableContextProps>(TableContext)
console.log("🚀 => ", a?.tableData);
</script>

<template>
  <template v-for="rowData in a?.tableData" :key="rowData.id">
    <TableRow :row-data="rowData">
      <template #default="{column, row}">
        <slot :row="row" :column="column"></slot>
      </template>
    </TableRow>
  </template>
</template>

<style scoped lang="scss">

</style>
