<script setup lang="ts">
import TableContext from "@/components/Table/TableContext.vue";
import TableHeader from "@/components/Table/TableHeader.vue";
import TableBody from "@/components/Table/TableBody.vue";

export interface TableColumnProps {
  title: string;
  dataIndex: string;
  tooltip?: string;
  width?: string;
  type?: "operator";
  readonly?: boolean;
  editable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  column: TableColumnProps[];
  editRowData?: T; // 可编辑的行
  visibleLen?: number
}

defineOptions({
  name: 'GoatTable'
});


const props = defineProps<TableProps<any>>();

</script>

<template>
  <div class="table">
    <TableContext :data="props.data" :column="props.column" :edit-row-data="props.editRowData" :visible-len="props.visibleLen">
      <TableHeader></TableHeader>
      <TableBody>
        <template #default="{row, column}">
          <slot name="op" :row="row" :column="column"></slot>
        </template>
      </TableBody>
    </TableContext>
  </div>
</template>

<style scoped lang="scss">
.table {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 2px;
  border: 1px solid #eee;
}
</style>
