<script lang="ts" setup>
const { data: session, status } = useAuth();

export interface LinkProp {
  title: string;
  label: string;
  icon: string;
  url: string;
}
</script>
<template>
  <div>
    <!-- Main content -->
    <div
      class="w-full h-full overflow-hidden"
      v-if="status !== 'loading' && !session?.googleAccessToken"
    >
      <BaseGoogleAuthLogin />
    </div>

    <div v-else>
      <div class="overflow-x-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>
