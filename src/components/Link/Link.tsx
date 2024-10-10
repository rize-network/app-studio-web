import React from 'react';
import { LinkProps } from './Link/Link.props';
import { useLinkState } from './Link/Link.state';
import LinkView from './Link/Link.view';
// Defines the 'LinkComponent' as a functional component with props typed to 'LinkProps'
const LinkComponent: React.FC<LinkProps> = (props) => {
// Gets stateful logic and data necessary for the link component via 'useLinkState' hook
  const linkStates = useLinkState();
// Renders 'LinkView' component passing down link state and props
  return <LinkView {...linkStates} {...props} />;
};
// Exports 'LinkComponent' as 'Link' for use in other parts of the application
export const Link = LinkComponent;
