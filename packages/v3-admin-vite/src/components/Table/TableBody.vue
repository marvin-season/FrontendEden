<script setup lang="ts">
import {inject, provide, reactive} from "vue";
import {TableContext, TableEventProvider} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";
// @ts-ignore
import {RecycleScroller} from 'vue-virtual-scroller';
import TreeRow from "@/components/Table/TreeRow.vue";
import TableRow from "@/components/Table/TableRow.vue";

defineOptions({
  name: 'TableContent',
});

const expandScope = reactive<{ rows: Set<any>, row: any }>({row: {}, rows: new Set()});
const context = inject<TableProps<any>>(TableContext);

// 注入点击所在行的数据和事件
provide(TableEventProvider, {
  expandScope,
  clickRow: (rowData: any) => {
    console.log("🚀 => ", rowData)
    expandScope.row = rowData;

    if (expandScope.rows.has(rowData)) {
      expandScope.rows.delete(rowData);
    } else {
      expandScope.rows.add(rowData);
    }
  }
})

</script>

<template>
  <template v-if="context?.data">

    <RecycleScroller
      v-if="context?.enableVirtual"
      class="scroller"
      :items="context?.data"
      :min-item-size="40"
      :buffer="400"
      key-field="id"
      v-slot="{ item }"
    >
      <TableRow class="row" :row-data="item" :id="`row-${item.id}`">
        <template #default="{column, row}">
          <slot :row="row" :column="column"></slot>
        </template>
      </TableRow>
    </RecycleScroller>
    <div v-else>
      <template v-for="item in context?.data" :key="item?.id">
        <TableRow class="row" :row-data="item" :id="`row-${item.id}`">
          <template #default="{column, row}">
            <slot :row="row" :column="column"></slot>
          </template>
        </TableRow>
        <slot v-if="expandScope.rows.has(item)" name="expand" v-bind="expandScope"></slot>
      </template>
    </div>
  </template>


  <div>
    <template v-for="item in context?.treeData" :key="item?.id">
      <TreeRow v-if="context?.treeData" class="row" :row-data="item" :id="`row-${item?.id}`">
        <template #default="scope">
          <slot v-bind="scope"></slot>
        </template>
      </TreeRow>
    </template>
  </div>

</template>

<style scoped lang="scss">
.scroller {
  height: 400px;
}

.row {
  padding: 10px;
  height: 20%;
  display: block;
}

</style>
