import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useSidebar } from '@rocketseat/gatsby-theme-docs-core';

import {
    Container,
    LogoContainer,
    List,
    Heading,
    Item,
    SubItem,
} from './styles';
import { isExternalUrl } from '@rocketseat/gatsby-theme-docs/src/util/url';
import ExternalLink from '@rocketseat/gatsby-theme-docs/src/components/Sidebar/ExternalLink';
import InternalLink from '@rocketseat/gatsby-theme-docs/src/components/Sidebar/InternalLink';
import Logo from '../Logo';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Location } from '@reach/router';

function ListWithSubItems({ children, text, isOpenDefault }) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
        <>
            <Heading onClick={() => setIsOpen(!isOpen)}>
                {text}{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Heading>
            {isOpen && <SubItem>{children}</SubItem>}
        </>
    );
}

export default function Sidebar({ isMenuOpen }) {
    const {
        site: {
            siteMetadata: { footer, basePath },
        },
    } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          footer
          basePath
        }
      }
    }
  `);

    const data = useSidebar();

    function renderLink(link, label) {
        return isExternalUrl(link)
            ? <ExternalLink link={link} label={label} />
            : <InternalLink link={link} label={label} />;
    }

    return (
        <Container isMenuOpen={isMenuOpen}>
            <LogoContainer>
                <Link to={basePath}>
                    <Logo />
                </Link>
            </LogoContainer>
            <nav>
                <List>
                    {data.map(({ node: { label, link, items, id } }) => {
                        if (Array.isArray(items)) {
                            const subitems = items.map(item => {
                                return (
                                    <Item key={item.link}>
                                        {renderLink(item.link, item.label)}
                                    </Item>
                                );
                            });

                            return (
                                <Location>
                                    {({ location }) => {
                                        const isOpen = items.some(item => {
                                            return item.link.replace(/\/$/, '') === location.pathname.replace(/\/$/, '');
                                        });

                                        return (
                                            <>
                                                <ListWithSubItems key={id} text={label} isOpenDefault={isOpen} >
                                                    {subitems}
                                                </ListWithSubItems>
                                            </>
                                        );
                                    }}
                                </Location>
                            );
                        }

                        return <Item key={id}>{renderLink(link, label)}</Item>;
                    })}
                </List>
            </nav>
            <footer>
                <p>{footer}</p>
            </footer>
        </Container>
    );
}

ListWithSubItems.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.node,
    ]).isRequired,
    text: PropTypes.string.isRequired,
    isOpenDefault: PropTypes.bool.isRequired,
};

Sidebar.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
};