import React from 'react';
import { Element } from 'app-studio';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { ExternalLinkSvg } from '../../Svg';

import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';

const LinkView: React.FC<LinkViewProps> = ({
  children,
  href = '/',
  iconSize = 'sm',
  underline = 'default',
  isHovered = false,
  isExternal = false,
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
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        textDecoration={
          isHovered || underline === 'underline'
            ? 'underline !important'
            : 'none'
        }
        {...styles.text}
        {...props}
      >
        <Horizontal gap={3} alignItems="center" flexWrap="nowrap">
          {children}
          {isExternal && (
            <ExternalLinkSvg size={IconSizes[iconSize]} style={styles.icon} />
          )}
        </Horizontal>
      </Element>
    </ReactRouterLink>
  );
};

export default LinkView;
