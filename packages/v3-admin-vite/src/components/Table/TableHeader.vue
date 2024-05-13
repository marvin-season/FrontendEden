<script setup lang="ts">

import {inject} from "vue";
import {TableContextProvider} from "@/components/Table/utils";
import {TableProps} from "@/components/Table/index.vue";

defineOptions({
  name: 'TableHeader',
})

const context = inject<TableProps<any>>(TableContextProvider);

</script>

<template>
  <div class="goat_row goat_header">
    <span class="goat_meta" v-for="(meta, index) in context?.column" :style="{width: meta.width || '150px'}">
      {{ meta.title }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.goat_row {
  white-space: nowrap;
}

.goat_header {
}

.goat_meta {
  display: inline-block;
  font-size: 14px;
  color: #232323;
  font-weight: bold;
  padding: 10px;
  background-color: #efefef;
}
</style>
