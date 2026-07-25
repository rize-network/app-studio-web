import React from 'react';
import { LinkProps } from './Link/Link.props';
import LinkView from './Link/Link.view';
const LinkComponent = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <LinkView ref={ref} {...props} />
);
LinkComponent.displayName = 'Link';
export const Link = LinkComponent;
