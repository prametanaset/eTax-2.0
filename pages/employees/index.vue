<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title:'รายชื่อพนักงาน'
})

const emp = reactive({
  id:0,
  name:'',
  lastname:'',
  email:'',
  desc:'',
})
const empList = ref([])
</script>

<style>

</style>