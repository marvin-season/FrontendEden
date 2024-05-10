<script setup lang="ts">
import {inject, ref, watchEffect} from "vue";
import {TableContext} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";
import {RecycleScroller} from 'vue-virtual-scroller';
import TreeRow from "@/components/Table/TreeRow.vue";
import TableRow from "@/components/Table/TableRow.vue";

defineOptions({
  name: 'TableContent',
});


const context = inject<TableProps<any>>(TableContext);

const visibleData = ref<TableProps<any>['data']>([])

watchEffect(() => {
  const len = context?.visibleLen;
  console.log("🚀 => ", len)
  if (len) {
    let startIndex = 0;

    visibleData.value = context.data.slice(startIndex, len);
    console.log("🚀 => ", visibleData.value)
  }
})

const handleVisible = (e) => {
  console.log("🚀 => ", e)
}
</script>

<template>
  <RecycleScroller
    v-if="context?.data"
    @visible="handleVisible"
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
  <TreeRow v-if="context?.treeData" v-for="item in context?.treeData" :key="item?.id" class="row" :row-data="item" :id="`row-${item?.id}`">
    <template #default="{column, row}">
      <slot :row="row" :column="column"></slot>
    </template>
  </TreeRow>
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
