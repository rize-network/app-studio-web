import React from 'react';
import { Element } from 'app-studio';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { ExternalLinkIcon } from '../../Icon/Icon';
import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';
// Component definition for 'LinkView', a functional component with props defined by 'LinkViewProps'.
const LinkView: React.FC<LinkViewProps> = ({
  children,
  // Default href prop set to root '/', used for navigation target.
  to = '/',
  // Default icon size for links, with 'sm' specifying a small-sized icon.
  iconSize = 'sm',
  // Determines the default underline behavior of the link, set to 'default'.
  underline = 'default',
  // State flag indicating whether the link is being hovered over.
  isHovered = false,
  // Boolean indicating if the link leads to an external resource.
  isExternal = false,
  // Custom styles for the icon and text, provided via a styles object.
  views = { icon: {}, text: {} },
  // Setter function for the hover state, noop function provided by default.
  setIsHovered = () => {},
  ...props
}) => {
  // Function to handle mouse enter/leave events to toggle hover state.
  const handleHover = () => {
    if (underline === 'hover') setIsHovered(true);
  };
  return (
    <ReactRouterLink to={to} target={isExternal ? '_blank' : '_self'}>
      <Element
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        textDecoration={
          isHovered || underline === 'underline'
            ? 'underline !important'
            : 'none'
        }
        {...views.text}
        {...props}
      >
        <Horizontal gap={3} alignItems="center" flexWrap="nowrap">
          {children}
          {isExternal && <ExternalLinkIcon widthHeight={IconSizes[iconSize]} />}
        </Horizontal>
      </Element>
    </ReactRouterLink>
  );
};
export default LinkView;
