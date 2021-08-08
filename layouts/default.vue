<template>
  <div class="text-gray-700">
    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row">
        <side-nav class="flex-none" />
        <div class="flex-grow">
          <main>
            <Nuxt />
          </main>
          <footer class="p-4 bg-blue-500 text-white sm:mr-64">
            <ul class="flex flex-col items-center p-4">
              <li v-for="link in footerLinks" :key="link.url" class="py-1">
                <a :href="link.url">{{ link.title }}</a>
              </li>
            </ul>
            <div class="flex flex-col items-center">
              <div class="p-4">
                <h5 class="font-bold">オリジナル書籍</h5>
              </div>
              <div class="flex flex-col sm:flex-row">
                <a v-for="book in books" :key="book.title" :href="book.zenn" class="pb-4 sm:px-4">
                  <p class="w-48 text-center text-xs truncate">{{ book.title }}</p>
                  <img class="w-48" :src="book.image">
                </a>
              </div>
            </div>
            <p class="text-center text-xs p-4">
              Copyright {{ title }}
            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { State } from '~/store'

export default defineComponent({
  setup () {
    const store = useStore<State>()

    return {
      title: store.state.title,
      footerLinks: store.state.footerLinks,
      books: store.state.books,
    }
  }
})
</script>
