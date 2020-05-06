import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

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
            <p>
                <div>Flutter関連書籍</div>
                <Flex>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B082XQ81FH/ref=nosim?tag=tmk555-22" target="_blank">
                            <img src="https://images-na.ssl-images-amazon.com/images/P/B082XQ81FH.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B07Z9DYYBY/ref=nosim?tag=tmk555-22" target="_blank">
                            <img src="https://images-na.ssl-images-amazon.com/images/P/B07Z9DYYBY.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B07Q19LVW2/ref=nosim?tag=tmk555-22" target="_blank">
                            <img src="https://images-na.ssl-images-amazon.com/images/P/B07Q19LVW2.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                    <FlexInner>
                        <a href="https://www.amazon.co.jp/dp/B07LBPRHQD/ref=nosim?tag=tmk555-22" target="_blank">
                            <img src="https://images-na.ssl-images-amazon.com/images/P/B07LBPRHQD.09.MZZZZZZZ.jpg" />
                        </a>
                    </FlexInner>
                </Flex>
            </p>
            <p>
                <div>Twitter</div>
                <div><a href={twitterUrl} target="_blank">{siteAuthor}</a></div>
            </p>
            <p className="site-title">
                <div>{siteTitle}</div>
                <div>© {siteAuthor.replace('@', '')}.</div>
            </p>
        </div>
    );
};