<script setup lang="ts">
import {provide} from "vue";
import {TableContextProvider} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";


defineOptions({
  name: 'TableContextProvider'
});

const props = defineProps<TableProps<any>>();

// defineSlots();
provide<TableProps<any>>(TableContextProvider, props)

</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss">

</style>
