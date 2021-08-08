export interface State {
  title: string,
  categories: {
      title: string,
      directory: string,
  }[],
  footerLinks: {
    title: string,
    url: string
  }[],
  books: {
    title: string,
    image: string,
    zenn: string
    amazon: string
  }[]
}

export const state: (() => State) = () => ({
  title: 'Flutterで始めるアプリ開発',
  categories: [
    {
      title: 'Flutter概要',
      directory: 'introduction',
    },
    {
      title: 'Flutterを使ってみる',
      directory: 'getting-started',
    },
    {
      title: 'Widgetを使ってみる',
      directory: 'widgets',
    },
    {
      title: 'Todoアプリを作ってみる',
      directory: 'todo-app',
    },
    {
      title: 'Firebaseとは',
      directory: 'firebase',
    },
    {
      title: 'Firebaseを使ったアプリ',
      directory: 'firebase-app',
    },
    {
      title: 'Webアプリ公開',
      directory: 'host-web-app',
    },
    {
      title: 'UIを作ってみる',
      directory: 'create-ui',
    },
    {
      title: 'アプリを作ってみる',
      directory: 'create-app',
    },
    {
      title: 'Flutter詳細',
      directory: 'master-flutter',
    }
  ],
  footerLinks: [
    {
      title: 'このサイトについて',
      url: '/about'
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/_umatoma'
    },
    {
      title: 'Zenn',
      url: 'https://zenn.dev/umatoma/books'
    },
    {
      title: 'web-study.dev',
      url: 'https://web-study.dev/'
    }
  ],
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
