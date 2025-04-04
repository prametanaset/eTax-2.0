<template>
  <div>
    <AutoForm :schema="schema" />
  </div>
</template>

<script lang="ts" setup>

/**
 * .object()
 * .optional()
 * .default()
 *
 * .object({
 *  .object()
 * })
 * 
 * .string()
 * .number()
 * .enum(array[])
 * .nativeEnum(enum)
 * .array()
 */

import * as z from 'zod';

const schema  = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
})

</script>

<style>

</style>