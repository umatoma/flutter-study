module.exports = {
  siteMetadata: {
    siteTitle: `Flutterで始めるアプリ開発`,
    defaultTitle: `Flutterで始めるアプリ開発`,
    siteTitleShort: `Flutterで始めるアプリ開発`,
    siteDescription: `Flutterを使ったiOS/Android/Webアプリ開発への入門に必要な情報を分かりやすく紹介`,
    siteUrl: `https://www.flutter-study.dev`,
    siteAuthor: `@_umatoma`,
    siteImage: `/banner.png`,
    siteLanguage: `ja`,
    themeColor: `#1389FD`,
    basePath: `/`,
    footer: `www.flutter-study.dev`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        // githubUrl: `https://github.com/rocketseat/gatsby-themes`,
        // baseDir: `examples/gatsby-theme-docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Flutterで始めるアプリ開発`,
        short_name: `www.flutter-study.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: '#0091EA',
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-48349484-4`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.flutter-study.dev`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
  ],
};
