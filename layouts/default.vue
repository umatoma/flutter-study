<template>
  <div class="text-gray-700">
    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row">
        <side-nav class="flex-none" />
        <div class="flex-grow">
          <main>
            <Nuxt />
          </main>
          <footer class="p-8 bg-blue-500 text-white sm:mr-64">
            <div class="flex flex-row gap-4 justify-center">
              <a href="/about">
                About
              </a>
              <a href="https://twitter.com/_umatoma">
                Twitter
              </a>
              <a href="https://zenn.dev/umatoma/books">
                Zenn
              </a>
            </div>
            <div class="text-center pt-8">
              <h5 class="font-bold">
                関連サイト
              </h5>
              <div class="pt-2 text-center">
                <a href="https://web-study.dev">
                  <img src="/images/banner-web.png" class="inline rounded-md">
                </a>
              </div>
            </div>
            <div class="text-center pt-8">
              <h5 class="font-bold">
                オリジナル書籍
              </h5>
              <div class="pt-2 flex flex-col sm:flex-row sm:justify-center">
                <a v-for="book in books" :key="book.title" :href="book.zenn" class="pb-4 sm:px-4">
                  <p class="w-48 text-center text-xs truncate">{{ book.title }}</p>
                  <img class="w-48 rounded-md" :src="book.image">
                </a>
              </div>
            </div>
            <p class="text-center text-xs pt-8">
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
      books: store.state.books
    }
  }
})
</script>
