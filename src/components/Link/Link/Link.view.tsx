import React from 'react';
import { useHref, useInRouterContext, useNavigate } from 'react-router-dom';
import { Element } from 'app-studio';
import { ExternalLinkIcon } from '../../Icon/Icon';
import { LinkViewProps } from './Link.props';
import { IconSizes } from './Link.style';

// URLs react-router cannot navigate to client-side (scheme or protocol-relative).
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

type AnchorViewProps = LinkViewProps & { href: string };

// The anchor itself is the styled app-studio element, so every View prop,
// state prop (_hover, _focusVisible, ...), event handler, ref, and DOM
// attribute (id, aria-*) lands on the <a> — not on a nested wrapper.
const Anchor = React.forwardRef<HTMLAnchorElement, AnchorViewProps>(
  (
    {
      children,
      href,
      iconSize = 'sm',
      underline = 'default',
      isExternal = false,
      views = {},
      to,
      isHovered,
      setIsHovered,
      _hover,
      ...props
    },
    ref
  ) => (
    <Element
      as="a"
      ref={ref}
      href={href}
      display="inline-flex"
      gap={3}
      alignItems="center"
      flexWrap="nowrap"
      color="inherit"
      textDecoration={underline === 'underline' ? 'underline' : 'none'}
      _hover={
        underline === 'hover'
          ? { textDecoration: 'underline', ...(_hover as object) }
          : _hover
      }
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...views.text}
      {...props}
    >
      {children}
      {isExternal && <ExternalLinkIcon widthHeight={IconSizes[iconSize]} />}
    </Element>
  )
);
Anchor.displayName = 'LinkAnchor';

// In-router variant: resolves `to` against the router and intercepts plain
// left-clicks for client-side navigation, mirroring react-router's Link.
const RouterAnchor = React.forwardRef<HTMLAnchorElement, LinkViewProps>(
  ({ to = '/', onClick, ...props }, ref) => {
    const href = useHref(to);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent) => {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        (props.target && props.target !== '_self') ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }
      event.preventDefault();
      navigate(to);
    };

    return (
      <Anchor {...props} to={to} href={href} onClick={handleClick} ref={ref} />
    );
  }
);
RouterAnchor.displayName = 'RouterLinkAnchor';

const LinkView = React.forwardRef<HTMLAnchorElement, LinkViewProps>(
  (props, ref) => {
    const inRouter = useInRouterContext();
    const { href, to = '/', isExternal } = props;
    const useRouter =
      inRouter && !isExternal && href == null && !ABSOLUTE_URL_REGEX.test(to);

    return useRouter ? (
      <RouterAnchor {...props} ref={ref} />
    ) : (
      <Anchor {...props} href={href ?? to} ref={ref} />
    );
  }
);
LinkView.displayName = 'LinkView';
export default LinkView;
