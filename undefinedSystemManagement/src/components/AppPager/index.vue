<template>
  <div class="app-pager">

    <el-pagination background size="default"
      layout="prev, pager, next" 
      :total="props.total" 
      :page-size="props.pageSize"
      :current-page="props.pageNum"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
     />
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    pageNum?: number
    pageSize?: number
    total?: number
  }>(), {
    pageNum: 1,
    pageSize: 18,
    total: 0
  })

  
  const emit = defineEmits<{
    (e: 'update:pageNum', value: number): void
  }>()
  const handleCurrentChange = (value: number) => {
    emit('update:pageNum', value)
  }
</script>

<style scoped lang="scss">
.app-pager {
  position: absolute;
  bottom: 40px;
  right: 40px;
}
</style>
