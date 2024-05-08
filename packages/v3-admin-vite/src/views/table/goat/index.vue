<script setup lang="ts">
import GoatTable, {TableColumnProps} from "@/components/Table/index.vue";
import {getTableDataApi} from "@/api/table";
import {ref} from "vue";
import {GetTableData} from "@/api/table/types/table";

const tableData = ref<GetTableData[]>([])
getTableDataApi({size: 10, currentPage: 1}).then((res) => res?.data?.list).then(list => {
  tableData.value = list
})
defineOptions({
  name: 'Goat',
})

const handleDelete = console.log
const handleUpdate = console.log


const column: TableColumnProps[] = [
  {
    title: '名称',
    dataIndex: 'username',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '操作',
    dataIndex: 'op',
  },
]
</script>

<template>
  <GoatTable :column="column" :data="tableData">
    <template #op="scope">
      <div v-if="scope.column.dataIndex === 'op'">
        <ElButton type="danger" @click="handleDelete(scope)">删除</ElButton>
        <ElButton type="success" @click="handleUpdate(scope)">修改</ElButton>
      </div>
    </template>
  </GoatTable>
</template>

<style scoped lang="scss">

</style>
