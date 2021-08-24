<template>
  <footer class="p-8 bg-blue-500 text-white">
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
        オリジナル書籍
      </h5>
      <div class="sm:flex sm:justify-center sm:gap-4">
        <div class="flex justify-center gap-4 pt-2">
          <a href="https://zenn.dev/umatoma/books/bd010486772aff" target="_blank" class="w-32 text-center text-sm">
            <span>Zenn版</span>
            <img src="/images/banner/book_riverpod_banner.png" class="rounded border hover:border-blue-200">
          </a>
          <a href="https://www.amazon.co.jp/dp/B09D9Q4R2F/ref=nosim?tag=flt0c-22" target="_blank" class="w-32 text-center text-sm">
            <span>Amazon版</span>
            <img src="/images/banner/book_riverpod_banner.png" class="rounded border hover:border-blue-200">
          </a>
        </div>
        <div class="flex justify-center gap-4 pt-2">
          <a href="https://zenn.dev/umatoma/books/1f4cb2404f3fa9" target="_blank" class="w-32 text-center text-sm">
            <span>Zenn版</span>
            <img src="/images/banner/book_banner.png" class="rounded border hover:border-blue-200">
          </a>
          <a href="https://www.amazon.co.jp/dp/B096T3YMZ3/ref=nosim?tag=flt0c-22" target="_blank" class="w-32 text-center text-sm">
            <span>Amazon版</span>
            <img src="/images/banner/book_banner.png" class="rounded border hover:border-blue-200">
          </a>
        </div>
      </div>
    </div>
    <div class="text-center pt-8">
      <h5 class="font-bold">
        関連サイト
      </h5>
      <div class="pt-2 text-center">
        <a href="https://web-study.dev" class="text-center text-sm">
          <span>作って学ぶWebサイト制作</span>
          <img src="/images/banner-web.png" class="rounded mx-auto max-h-32">
        </a>
      </div>
    </div>
    <div class="text-center text-xs pt-8">
      <p>Copyright Flutterで始めるアプリ開発</p>
      <p>
        <a href="https://icons8.com">Icons by Icons8</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { State } from '~/store'

export default defineComponent({
  setup () {
    const store = useStore<State>()
    return {
      books: store.state.books
    }
  }
})
</script>
