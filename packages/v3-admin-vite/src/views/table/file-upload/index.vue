<script setup lang="ts">
import MultiUpload from "@/views/table/file-upload/multi-upload.vue";
import {useFetchSelect} from "@/hooks/useFetchSelect";
import {upload} from "@/api/table/file";

const uploadRes = useFetchSelect({api: upload});
console.log(uploadRes)
defineOptions({
  name: 'FileUpload'
})
</script>

<template>
  <MultiUpload/>
</template>

<style scoped lang="scss">

</style>
