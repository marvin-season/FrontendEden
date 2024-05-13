<script setup lang="ts">
import TableContextProvider from "@/components/Table/TableContextProvider.vue";
import TableHeader from "@/components/Table/TableHeader.vue";
import TableBody from "@/components/Table/TableBody.vue";

export interface TableColumnProps {
  title: string;
  dataIndex: string;
  tooltip?: string;
  width?: string;
  type?: "operator" | "expand";
  readonly?: boolean;
  editable?: boolean;
}

export type TreeData<T extends Record<string, any>> = {
  [P in keyof T]: T[P];
} & { children?: TreeData<T>[] }

export interface TableProps<T extends Record<string, any>> {
  data?: T[];
  column: TableColumnProps[];
  editRowData?: T; // 可编辑的行
  treeData?: TreeData<T>[];
  enableVirtual?: boolean;
  width?: string;
}

defineOptions({
  name: 'GoatTable'
});


const props = defineProps<TableProps<any>>();

</script>

<template>
  <div class="goat_table" :style="{width: props.width}">
    <TableContextProvider v-bind="props">
      <TableHeader></TableHeader>
      <TableBody>
        <template #default="scope">
          <slot name="op" v-bind="scope"></slot>
        </template>
        <template #expand="scope">
          <slot name="expand" v-bind="scope"></slot>
        </template>
      </TableBody>
    </TableContextProvider>
  </div>
</template>

<style scoped lang="scss">
.goat_table {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 2px;
  border: 1px solid #eee;
  overflow: auto !important;
}
</style>
