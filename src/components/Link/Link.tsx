import React from 'react';
import { LinkProps } from './Link/Link.props';
import { useLinkState } from './Link/Link.state';
import LinkView from './Link/Link.view';
const LinkComponent = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const linkStates = useLinkState();
    return <LinkView ref={ref} {...linkStates} {...props} />;
  }
);
LinkComponent.displayName = 'Link';
export const Link = LinkComponent;
