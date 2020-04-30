import React from 'react';
import { Link } from 'gatsby';

import Layout from '@rocketseat/gatsby-theme-docs/src/components/Layout';
import SEO from '@rocketseat/gatsby-theme-docs/src/components/SEO';

export default function NotFound() {
  return (
    <Layout title="Page not found!">
      <SEO title="404: Not found" />
      <p>ページがありません...</p>
      <p>まだまだ、作成中のページもありますので、もう少しお待ち下さい 🙇‍♂️🙇‍♂️🙇‍♂️</p>
      <p>トップ画面は<Link to="/">こちら</Link></p>
    </Layout>
  );
}
