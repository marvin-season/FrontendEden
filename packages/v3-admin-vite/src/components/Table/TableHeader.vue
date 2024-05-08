<script setup lang="ts">

import {inject} from "vue";
import {TableContext} from "@/components/Table/utils";
import {TableContextProps} from "@/components/Table/TableContext.vue";

defineOptions({
  name: 'TableHeader',
})

const context = inject<TableContextProps>(TableContext);

</script>

<template>
  <div class="row header">
    <span class="meta" v-for="(meta, index) in context?.tableColumn" :style="{width: meta.width || '150px'}">
      {{ meta.title }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.row {
  padding: 10px;
}
.header{
  background-color: #efefef;
}
.meta {
  display: inline-block;
  font-size: 14px;
  color: #232323;
  font-weight: bold;
}
</style>
