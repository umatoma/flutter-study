module.exports = {
  siteMetadata: {
    siteTitle: `Flutterで始めるアプリ開発`,
    defaultTitle: `Flutterで始めるアプリ開発`,
    siteTitleShort: `Flutterで始めるアプリ開発`,
    siteDescription: `Flutterを使ったiOS/Android/Webアプリ開発への入門に必要な情報を分かりやすく紹介`,
    siteUrl: `https://flutter-study.dev`,
    siteAuthor: `@flutter-study.dev`,
    siteImage: `/banner.png`,
    siteLanguage: `ja`,
    themeColor: `#1389FD`,
    basePath: `/`,
    footer: ``,
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
        short_name: `Flutterで始めるアプリ開発`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://flutter-study.dev`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
