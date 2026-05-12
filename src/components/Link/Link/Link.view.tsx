import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Horizontal } from 'app-studio';
import { ExternalLinkIcon } from '../../Icon/Icon';
import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';
const LinkView = React.forwardRef<HTMLAnchorElement, LinkViewProps>(({
  children,
  to = '/',
  iconSize = 'sm',
  underline = 'default',
  isHovered = false,
  isExternal = false,
  views = { icon: {}, text: {} },
  setIsHovered = () => {},
  ...props
}, ref) => {
  // Function to handle mouse enter/leave events to toggle hover state.
  const handleMouseEnter = () => {
    if (underline === 'hover') setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (underline === 'hover') setIsHovered(false);
  };

  // Determine text decoration based on underline prop and hover state
  const getTextDecoration = () => {
    if (underline === 'underline') return 'underline';
    if (underline === 'hover' && isHovered) return 'underline';
    return 'none';
  };

  return (
    <ReactRouterLink
      ref={ref}
      to={to}
      target={isExternal ? '_blank' : '_self'}
      style={{ textDecoration: 'inherit', color: 'inherit' }}
    >
      <Horizontal
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        gap={3}
        alignItems="center"
        flexWrap="nowrap"
        textDecoration={getTextDecoration()}
        {...views.text}
        {...props}
      >
        {children}
        {isExternal && <ExternalLinkIcon widthHeight={IconSizes[iconSize]} />}
      </Horizontal>
    </ReactRouterLink>
  );
});
LinkView.displayName = 'LinkView';
export default LinkView;
