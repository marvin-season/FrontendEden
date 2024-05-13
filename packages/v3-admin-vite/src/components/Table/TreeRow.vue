<script setup lang="ts">
import TableRow from "@/components/Table/TableRow.vue";
import {ref} from "vue";

defineOptions({
  name: 'TreeRow'
});

const {rowData, depth} = withDefaults(defineProps<{
  rowData: any,
  depth?: number,
}>(), {
  depth: 0
});


const collapse = ref(false);
const handleCollapse = () => {
  collapse.value = !collapse.value;
}
</script>

<template>
  <div class="goat_tree">
    <div class="goat_flex">
      <span v-if="rowData.children" @click="handleCollapse">
        <span v-if="collapse">-</span>
        <span v-else>+</span>
      </span>
      <TableRow :row-data="rowData">
        <template #default="{column, row}">
          <slot :row="row" :column="column"></slot>
        </template>
      </TableRow>
    </div>
    <div v-if="collapse" v-for="item in rowData.children" :key="item.id"
         :style="{ paddingLeft: 20 * (depth + 1) + 'px'}">
      <TreeRow :depth="depth + 1" :row-data="item">
        <template #default="{column, row}">
          <slot :row="row" :column="column"></slot>
        </template>
      </TreeRow>
    </div>
  </div>
</template>

<style scoped lang="scss">
.goat_flex {
  display: flex;
}

.goat_tree {
  padding: 10px 0;
}
</style>
