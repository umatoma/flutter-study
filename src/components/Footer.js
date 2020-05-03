import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
        <footer id="layout-footer">
            <p>
                <div><a href={twitterUrl} target="_blank">{siteAuthor}</a></div>
            </p>
            <p>
                <div>{siteTitle}</div>
                <div>© {siteAuthor.replace('@', '')}.</div>
            </p>
        </footer>
    );
};
