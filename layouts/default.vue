<template>
  <div class="text-gray-700">
    <div class="flex flex-col sm:flex-row sm:container sm:mx-auto">
      <aside class="sm:flex-none sm:w-64">
        <div class="sm:h-screen overflow-y-scroll sticky top-0 left-0 sm:border-r sm:border-gray-200">
          <side-nav />
        </div>
      </aside>
      <div class="flex-1">
        <main class="min-h-screen">
          <Nuxt />
        </main>
      </div>
    </div>
    <site-footer />
  </div>
</template>
