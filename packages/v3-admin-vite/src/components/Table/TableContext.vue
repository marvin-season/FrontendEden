<script setup lang="ts">
import {provide} from "vue";
import {TableContext} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";


defineOptions({
  name: 'TableContext'
});

const props = defineProps<TableProps<any>>();

// defineSlots();
provide<TableProps<any>>(TableContext, props)

</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss">

</style>
