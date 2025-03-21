<template>
  <div>
    <div class="flex items-center space-x-4">
        <Avatar>
          <AvatarImage :src="props.img || null" />
          <AvatarFallback>{{ props.text || 'TS' }}</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">{{ props.title || null }}</p>
          <p class="text-sm text-muted-foreground">{{ props.description || null }}</p>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String,
  title: String,
  description: String,
  img: String
});
</script>

<style>

</style>