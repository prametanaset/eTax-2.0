<template>
  <div>
    <div class="flex items-center space-x-4">
        <Avatar>
          <AvatarImage :src="props.img" />
          <AvatarFallback>{{ props.text }}</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">{{ props.title }}</p>
          <p class="text-sm text-muted-foreground">{{ props.description }}</p>
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