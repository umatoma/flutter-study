export interface State {
  books: {
    title: string,
    image: string,
    zenn: string
    amazon: string
  }[]
}

export const state: (() => State) = () => ({
  books: [
    {
      title: '入門 Riverpod',
      image: '/images/banner/book_riverpod_banner.png',
      zenn: 'https://zenn.dev/umatoma/books/bd010486772aff',
      amazon: 'https://www.amazon.co.jp/dp/B09754L28H/ref=nosim?tag=flt0c-22'
    },
    {
      title: '作って学ぶ、FlutterとFirebaseを使ったアプリ開発',
      image: '/images/banner/book_banner.png',
      zenn: 'https://zenn.dev/umatoma/books/1f4cb2404f3fa9',
      amazon: 'https://www.amazon.co.jp/dp/B096T3YMZ3/ref=nosim?tag=flt0c-22'
    }
  ]
})

export interface Mutations {}
