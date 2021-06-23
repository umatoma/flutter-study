import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { MediaOnlyFull, MediaOnly1200, MediaOnly780 } from '../@rocketseat/gatsby-theme-docs/components/Layout/styles'

const Flex = styled.div(`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`);

const FlexInner = styled.div(`
    margin: 8px 16px;
`);

export default function Footer({ }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteTitle
                        siteAuthor
                    }
                }
            }
        `
    );
    const {
        siteTitle,
        siteAuthor
    } = site.siteMetadata;
    const twitterUrl = `https://twitter.com/${siteAuthor.replace('@', '')}`;

    return (
        <div id="layout-footer">
            <MediaOnlyFull style={{ paddingBottom: '1rem', textAlign: 'center' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU5+D73XIQ+33T0+1BNJ9D" rel="nofollow">
                    <img border="0" width="468" height="60" alt="" src="https://www21.a8.net/svt/bgt?aid=210623117798&wid=001&eno=01&mid=s00000014490008004000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3HEDU5+D73XIQ+33T0+1BNJ9D" alt="" />
            </MediaOnlyFull>
            <MediaOnly1200 style={{ paddingBottom: '1rem', textAlign: 'center' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU5+D73XIQ+33T0+1BNJ9D" rel="nofollow">
                    <img border="0" width="468" height="60" alt="" src="https://www21.a8.net/svt/bgt?aid=210623117798&wid=001&eno=01&mid=s00000014490008004000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3HEDU5+D73XIQ+33T0+1BNJ9D" alt="" />
            </MediaOnly1200>
            <MediaOnly780 style={{ paddingBottom: '1rem', textAlign: 'center' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU5+D73XIQ+33T0+1BNYOX" rel="nofollow">
                    <img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=210623117798&wid=001&eno=01&mid=s00000014490008006000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=3HEDU5+D73XIQ+33T0+1BNYOX" alt="" />
            </MediaOnly780>
            <p>
                <div>サイト内検索</div>
                <div className="gcse-searchbox-only" />
            </p>
            <p>
                <div>オリジナル書籍</div>
                <Flex>
                    <FlexInner>
                        <a href="https://zenn.dev/umatoma/books/bd010486772aff" target="_blank">
                            <img loading="lazy" src="/banner/book_riverpod_banner.png" width="113" height="160" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://zenn.dev/umatoma/books/1f4cb2404f3fa9" target="_blank">
                            <img loading="lazy" src="/banner/book_banner.png" width="113" height="160" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://zenn.dev/umatoma/books/e4590a04895a67" target="_blank">
                            <img loading="lazy" src="/banner/book_recipe_banner.png" width="113" height="160" />
                        </a>
                    </FlexInner>
                </Flex>
            </p>
            <p>
                <div>Amazon</div>
                <Flex>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B09754L28H/ref=nosim?tag=flt0c-22" target="_blank">
                            <img loading="lazy" src="https://images-na.ssl-images-amazon.com/images/P/B09754L28H.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B096TJLFNV/ref=nosim?tag=flt0c-22" target="_blank">
                            <img loading="lazy" src="https://images-na.ssl-images-amazon.com/images/P/B096TJLFNV.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B082XQ81FH/ref=nosim?tag=flt0c-22" target="_blank">
                            <img loading="lazy" src="https://images-na.ssl-images-amazon.com/images/P/B082XQ81FH.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B07Z9DYYBY/ref=nosim?tag=flt0c-22" target="_blank">
                            <img loading="lazy" src="https://images-na.ssl-images-amazon.com/images/P/B07Z9DYYBY.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                </Flex>
            </p>
            <p>
                <div>Twitter</div>
                <div><a href={twitterUrl} target="_blank">{siteAuthor}</a></div>
            </p>
            <p>
                <div>Zenn</div>
                <div><a href="https://zenn.dev/umatoma/books" target="_blank">umatoma</a></div>
            </p>
            <p className="site-title">
                <div>{siteTitle}</div>
                <div>© {siteAuthor.replace('@', '')}.</div>
            </p>
        </div>
    );
};
