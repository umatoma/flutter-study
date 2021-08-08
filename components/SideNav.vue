<template>
  <aside class="sm:w-64">
    <div class="sm:fixed sm:w-64 sm:h-screen sm:border-r sm:border-gray-200">
      <div class="flex justify-between">
        <a href="/" class="w-full h-10 block px-4 hover:bg-gray-200 flex items-center">
          <img class="h-6 pr-2" src="/images/logo.png">
          <span class="text-sm">flutter-study.dev</span>
        </a>
        <div class="w-10 h-10 flex items-center justify-center sm:hidden" @click="toggleMenuOpen">
          <img class="h-6" src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png">
        </div>
      </div>
      <div class="sm:block" :class="isMenuOpen ? '' : 'hidden'">
        <div v-for="category in categories" :key="category.title">
          <h5 class="p-2 text-blue-900 cursor-pointer hover:bg-gray-200" @click="toggleCategoryOpen(category)">
            {{ category.title }}
          </h5>
          <a
            v-for="(doc, index) in category.docs"
            :key="doc.path"
            :href="doc.path"
            class="block py-2 px-4 hover:bg-gray-200"
            :class="category.isOpen ? '' : 'hidden'"
          >
            <span class="text-sm">
              {{ (index + 1).toString().padStart(2, '0') }}. {{ doc.title }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, ref, useContext, useFetch, useStore } from '@nuxtjs/composition-api'
import { State } from '~/store'

interface ContentCategory {
  title: string,
  docs: IContentDocument[],
  isOpen: boolean
}

export default defineComponent({
  setup () {
    const store = useStore<State>()
    const { $content, params } = useContext()
    const fetchDocs = async (slug: string) => {
      return (await $content(slug).without(['body']).sortBy('slug').fetch()) as IContentDocument[]
    }

    const isMenuOpen = ref<boolean>(false)
    const categories = ref<ContentCategory[]>([])
    useFetch(async () => {
      categories.value = await Promise.all(
        store.state.categories.map(async (category) => {
          return {
            title: category.title,
            docs: await fetchDocs(category.directory),
            isOpen: category.directory === params.value.category
          }
        })
      )
    })
    return {
      isMenuOpen,
      categories
    }
  },
  methods: {
    toggleMenuOpen () {
      this.isMenuOpen = !this.isMenuOpen
    },
    toggleCategoryOpen (category: ContentCategory) {
      this.categories = this.categories.map(_category => ({
        ..._category,
        isOpen: category === _category ? !_category.isOpen : _category.isOpen
      }))
    }
  }
})
</script>
