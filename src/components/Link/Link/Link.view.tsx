import React from 'react';
import { Element } from 'app-studio';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Horizontal } from 'src/components';
import { ExternalLinkSvg } from 'src/components/Svg';

import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';

const LinkView: React.FC<LinkViewProps> = ({
  children,
  href = '/',
  iconSize = 'sm',
  underline = 'default',
  isHovered = false,
  isExternal = false,
  colorScheme = '#0072F5',
  styles = { icon: {}, text: {} },
  setIsHovered = () => {},
  ...props
}) => {
  const handleHover = () => {
    if (underline === 'hover') setIsHovered(true);
  };
  return (
    <ReactRouterLink to={href} target={isExternal ? '_blank' : '_self'}>
      <Element
        color={colorScheme}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        textDecoration={isHovered || underline === 'underline' ? 'underline !important' : 'none'}
        {...styles.text}
        {...props}
      >
        <Horizontal gap={3} alignItems="center" wrap="nowrap">
          {children}
          {isExternal && <ExternalLinkSvg color={colorScheme} size={IconSizes[iconSize]} style={styles.icon} />}
        </Horizontal>
      </Element>
    </ReactRouterLink>
  );
};

export default LinkView;
