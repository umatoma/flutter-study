<template>
  <div>
    <div class="flex flex-col sm:flex-row">
      <div class="hidden sm:block sm:flex-none sm:w-64 sm:order-last sm:border-l sm:border-gray-200">
        <div class="sm:fixed sm:w-64 sm:h-screen">
          <slot name="nav" />
        </div>
      </div>
      <article class="flex-grow">
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
