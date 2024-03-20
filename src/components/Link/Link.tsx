import React from 'react';

import { LinkProps } from './Link/Link.props';
import { useLinkState } from './Link/Link.state';
import LinkView from './Link/Link.view';

const LinkComponent: React.FC<LinkProps> = (props) => {
  const linkStates = useLinkState();
  return <LinkView {...linkStates} {...props} />;
};

/**
 * Link allows users to navigate from page to page. It have a similar appearance as the hyperlink.
 */
export const Link = LinkComponent;
