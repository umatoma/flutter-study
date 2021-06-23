import Header from '@rocketseat/gatsby-theme-docs/src/components/Header';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Footer from '../../../../components/Footer';
import TableOfContents from '../Docs/TOC/index';
import { Children, Main, Title, Wrapper } from './styles';
import Sidebar from '../Sidebar'

export default function Layout({
    children,
    disableTableOfContents,
    title,
    headings,
}) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const disableTOC =
        disableTableOfContents === true || !headings || headings.length === 0;

    function handleMenuOpen() {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <Sidebar isMenuOpen={isMenuOpen} />
            <Header handleMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
            <Wrapper isMenuOpen={isMenuOpen}>
                {title && <Title>{title}</Title>}
                <Main disableTOC={disableTOC}>
                    <TableOfContents headings={headings} />
                    <Children hasTitle={title}>{children}</Children>
                </Main>
                <Footer />
            </Wrapper>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    disableTableOfContents: PropTypes.bool,
    title: PropTypes.string,
    headings: PropTypes.array,
};

Layout.defaultProps = {
    disableTableOfContents: false,
    title: '',
    headings: null,
};