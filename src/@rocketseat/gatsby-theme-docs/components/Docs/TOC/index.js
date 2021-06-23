import slug from '@rocketseat/gatsby-theme-docs/src/util/slug';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, MediaOnlyFull, MediaOnly1200, MediaOnly780 } from '../../Layout/styles'

export default function TableOfContents({ headings }) {
    return (
        <Container>
            {(headings && headings.length !== 0) && (
                <div>
                    <h2>Table of Contents</h2>
                    <nav>
                        <ul>
                            {headings
                                .filter(heading => heading.depth === 2)
                                .map(heading => (
                                    <li key={heading.value}>
                                        <a href={`#${slug(heading.value)}`}>{heading.value}</a>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                </div>
            )}
            <MediaOnlyFull style={{ paddingTop: '3rem' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU6+1U34XE+3L4M+6RWV5" rel="nofollow">
                    <img border="0" width="160" height="600" alt="" src="https://www27.a8.net/svt/bgt?aid=210623118111&wid=001&eno=01&mid=s00000016735001138000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3HEDU6+1U34XE+3L4M+6RWV5" alt="" />
            </MediaOnlyFull>
            <MediaOnly1200 style={{ paddingTop: '3rem', textAlign: 'center' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU6+1U34XE+3L4M+75EZ5" rel="nofollow">
                    <img border="0" width="728" height="90" alt="" src="https://www29.a8.net/svt/bgt?aid=210623118111&wid=001&eno=01&mid=s00000016735001201000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HEDU6+1U34XE+3L4M+75EZ5" alt="" />
            </MediaOnly1200>
            <MediaOnly780 style={{ paddingTop: '3rem', textAlign: 'center' }}>
                <a href="https://px.a8.net/svt/ejp?a8mat=3HEDU6+1U34XE+3L4M+6EER5" rel="nofollow">
                    <img border="0" width="320" height="50" alt="" src="https://www24.a8.net/svt/bgt?aid=210623118111&wid=001&eno=01&mid=s00000016735001075000&mc=1" />
                </a>
                <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3HEDU6+1U34XE+3L4M+6EER5" alt="" />
            </MediaOnly780>
        </Container>
    );
}

TableOfContents.propTypes = {
    headings: PropTypes.array,
};

TableOfContents.defaultProps = {
    headings: null,
};