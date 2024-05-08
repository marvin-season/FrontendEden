<script setup lang="ts">
import {provide} from "vue";
import {TableContext} from "@/components/Table/utils";

export interface TableContextProps {
  tableData: any[];
  tableColumn: any[];
}

defineOptions({
  name: 'TableContext'
});

const props = defineProps<TableContextProps>();

// defineSlots();
provide<TableContextProps>(TableContext, props)

</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss">

</style>
