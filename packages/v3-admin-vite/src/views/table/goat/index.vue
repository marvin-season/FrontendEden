<script setup lang="ts">
import GoatTable, {TableColumnProps} from "@/components/Table/index.vue";
import {getTableDataApi} from "@/api/table";
import {ref} from "vue";
import {GetTableData} from "@/api/table/types/table";

const tableData = ref<GetTableData[]>([]);
const editRowData = ref<GetTableData>();

getTableDataApi({size: 10, currentPage: 1}).then((res) => res?.data?.list).then(list => {
  list[0].children = [list[0], list[1], list[2]];
  console.log("🚀 => ", list)
  tableData.value = list;
})
defineOptions({
  name: 'Goat',
})

const handleDelete = ({row}: { row: GetTableData }) => {
  tableData.value = tableData.value.filter(rowItem => rowItem.id !== row.id);
}
const handleUpdate = ({row}: { row: GetTableData }) => {
  editRowData.value = row;
}


const column: TableColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'username',
    editable: true
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '250px',
    editable: true

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: '',
    type: "operator"
  },
]
</script>

<template>
  <GoatTable :column="column" :data="tableData" :edit-row-data="editRowData" :visible-len="8">
    <template #op="scope">
      <div v-if="scope.column.type === 'operator'">
        <ElButton type="danger" @click="handleDelete(scope)">删除</ElButton>
        <ElButton type="success" @click="handleUpdate(scope)">修改</ElButton>
      </div>
    </template>
  </GoatTable>
</template>

<style scoped lang="scss">

</style>
