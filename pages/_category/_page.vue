<template>
  <content-container :category="category" :page="page" />
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const route = useRoute()
    const { category, page } = route.value.params

    return { category, page }
  }
})
</script>
