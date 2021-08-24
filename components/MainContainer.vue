<template>
  <div class="flex flex-row">
    <div class="hidden flex-none w-64 order-last border-l sm:block">
      <div class="sticky top-0 right-0">
        <slot name="nav" />
      </div>
    </div>
    <article class="w-screen sm:w-full">
      <div class="px-8 py-16 bg-blue-500">
        <h1 class="text-3xl text-white font-bold">
          {{ title }}
        </h1>
      </div>
      <div class="px-4 pt-4 pb-8">
        <slot name="main" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
