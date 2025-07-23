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
  <div
    :class="[
      !session?.googleAccessToken
        ? 'lg:h-[calc(100dvh)]'
        : 'lg:h-[calc(100dvh-3.5rem)]',
    ]"
  >
    <!-- Main content -->
    <BaseGoogleAuthLogin
      v-if="status !== 'loading' && !session?.googleAccessToken"
    />

    <div v-else>
      <div class="overflow-x-hidden">
        <slot />
      </div>
    </div>
  </div>
</template>
