<template>
  <main-container :title="doc.title">
    <template #main>
      <nuxt-content :document="doc" />
      <template v-if="showSurround && (prev || next)">
        <div class="flex flex-col sm:flex-row justify-between gap-8 pt-8">
          <div class="flex-1">
            <a v-if="prev" :href="prev.path" class="block w-full border border-gray-200 hover:bg-gray-200">
              <div class="flex flex-row items-center">
                <div class="flex-none p-2">
                  <img class="w-8 h-8" src="https://img.icons8.com/ios/50/000000/left--v1.png">
                </div>
                <p class="flex-grow p-2 text-center">{{ prev.title }}</p>
              </div>
            </a>
          </div>
          <div class="flex-1">
            <a v-if="next" :href="next.path" class="block w-full border border-gray-200 hover:bg-gray-200">
              <div class="flex flex-row items-center">
                <p class="flex-grow p-2 text-center">{{ next.title }}</p>
                <div class="flex-none p-2">
                  <img class="w-8 h-8" src="https://img.icons8.com/ios/50/000000/right--v1.png">
                </div>
              </div>
            </a>
          </div>
        </div>
      </template>
    </template>
    <template #nav>
      <div>
        <h5 class="font-bold text-center pt-4">
          オリジナル書籍
        </h5>
        <div class="grid grid-cols-2 gap-2 px-4 pt-2">
          <a href="https://zenn.dev/umatoma/books/bd010486772aff" target="_blank" class="text-center text-sm">
            <span>Zenn版</span>
            <img src="/images/banner/book_riverpod_banner.png" class="rounded border hover:border-blue-200">
          </a>
          <a href="https://www.amazon.co.jp/dp/B09D9Q4R2F/ref=nosim?tag=flt0c-22" target="_blank" class="text-center text-sm">
            <span>Amazon版</span>
            <img src="/images/banner/book_riverpod_banner.png" class="rounded border hover:border-blue-200">
          </a>
          <a href="https://zenn.dev/umatoma/books/1f4cb2404f3fa9" target="_blank" class="text-center text-sm">
            <span>Zenn版</span>
            <img src="/images/banner/book_banner.png" class="rounded border hover:border-blue-200">
          </a>
          <a href="https://www.amazon.co.jp/dp/B096T3YMZ3/ref=nosim?tag=flt0c-22" target="_blank" class="text-center text-sm">
            <span>Amazon版</span>
            <img src="/images/banner/book_banner.png" class="rounded border hover:border-blue-200">
          </a>
        </div>
      </div>
      <div>
        <h5 class="font-bold text-center pt-4">
          関連サイト
        </h5>
        <div class="pt-2">
          <a href="https://web-study.dev" class="block pb-4 mx-4">
            <img class="rounded border hover:border-blue-200" src="/images/banner-web.png">
          </a>
        </div>
      </div>
    </template>
  </main-container>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { State } from '~/store'

export default defineComponent({
  props: {
    doc: {
      type: Object,
      required: true
    },
    prev: {
      type: Object,
      default: null
    },
    next: {
      type: Object,
      default: null
    },
    showSurround: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const store = useStore<State>()
    const books = store.state.books
    return { books }
  }
})
</script>

<style lang="css">
  .nuxt-content h2 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;

    font-size: 1.5rem;
    line-height: 2rem;

    font-weight: 700;

    border-left-width: 8px;
    border-color: rgb(59, 130, 246);
  }
  .nuxt-content h3 {
    font-size: 1.25rem;
    line-height: 1.75rem;

    font-weight: 700;

    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  .nuxt-content p {
    padding-bottom: 1rem;
  }
  .nuxt-content ul {
    list-style-type: disc;
    list-style-position: inside;

    padding-bottom: 1rem;
  }
  .nuxt-content ol {
    list-style-type: decimal;
    list-style-position: inside;

    padding-bottom: 1rem;
  }
  .nuxt-content ul > li > ul, .nuxt-content ol > li > ol {
    padding-left: 1rem;
    padding-bottom: 0.5rem;
  }
  .nuxt-content ul li a, .nuxt-content ol li a {
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .nuxt-content a {
    text-decoration: underline;
  }
  .nuxt-content .nuxt-content-highlight {
    padding-bottom: 1rem;
    position: relative;
    font-size: 0.75em;
  }
  .nuxt-content .nuxt-content-highlight pre {
    border-radius: 4px;
  }
  .nuxt-content .nuxt-content-highlight .filename {
    position: absolute;
    right: 0;
    top: 0;
    color: rgb(229, 231, 235);
    z-index: 10;
    margin-right: 1rem;
    margin-top: .75rem;
  }
  .nuxt-content table {
    border-width: 1px;
    border-color: rgb(229, 231, 235);
    margin-bottom: 1rem;
  }
  .nuxt-content table th, table td {
    padding: 0.25rem 0.5rem;
  }

  .nuxt-content .link-button a {
    padding: 0.5rem 2rem;
    text-decoration: none;
    display: inline-block;
    color: rgb(255, 255, 255);
    background-color: rgb(59, 130, 246);
  }
</style>
