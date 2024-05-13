<script setup lang="ts">
import GoatTable, {TableColumnProps, TableProps, TreeData} from "@/components/Table/index.vue";
import {getTableDataApi} from "@/api/table";
import {ref} from "vue";
import {GetTableData} from "@/api/table/types/table";
import {ElMessageBox} from "element-plus";

const tableData = ref<GetTableData[]>([]);
const editRowData = ref<GetTableData>();

getTableDataApi({size: 10, currentPage: 1}).then((res) => res?.data?.list).then((list: any) => {
  // list[0].children = [list[0], list[1], list[2]];
  // console.log("🚀 => ", list)
  tableData.value = list;
})
defineOptions({
  name: 'Goat',
})

const handleDelete = ({row}: { row: GetTableData }) => {
  tableData.value = tableData.value.filter(rowItem => rowItem.id !== row.id);
}
const handleUpdate = (data: { row: GetTableData }) => {
  if (editRowData.value === data.row) {
    return
  }

  ElMessageBox.confirm('这将会直接修改你的表格数据', {
    type: 'warning',
  }).then(() => {
    editRowData.value = data.row;
  })
}

const handleLog = console.log

const column: TableColumnProps[] = [
  {
    title: '展开',
    dataIndex: '',
    type: "expand"
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
    title: '操作',
    dataIndex: '',
    type: "operator"
  },
]


</script>

<template>
  <div>
    <GoatTable :column="column" :edit-row-data="editRowData" :data="tableData" width="800px">
      <template #op="scope">
        <div v-if="scope.column.type === 'operator'">
          <ElButton type="danger" @click="handleDelete(scope)">删除</ElButton>
          <ElButton type="success" @click="handleUpdate(scope)">修改</ElButton>
        </div>

      </template>
      <template #expand="{row}">
        <el-descriptions border size="small" direction="vertical">
          <el-descriptions-item :span="12" label="角色">
            <el-tag>{{ row.roles }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item width="200" label="ID">{{ row.id }}</el-descriptions-item>
          <el-descriptions-item width="200" label="用户名称">{{ row.username }}</el-descriptions-item>
          <el-descriptions-item width="200" label="联系电话">{{ row.phone }}</el-descriptions-item>
          <el-descriptions-item width="200" label="创建时间">{{ row.createTime }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </GoatTable>
  </div>
</template>

<style scoped lang="scss">

</style>
