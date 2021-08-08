<template>
  <a :href="href">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  }
})
</script>
