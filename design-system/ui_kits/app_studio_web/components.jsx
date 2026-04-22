// App Studio Web — component recreations
// Tokens come from ../../colors_and_type.css. All visuals follow
// rize-network/app-studio-web component styles.

const { useState, useEffect, useRef } = React;

// --- Icon: thin wrapper around Lucide web UMD (window.lucide.createIcons reads data-lucide) ---
function Icon({ name, size = 20, strokeWidth = 1.5, style = {}, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide?.createIcons && ref.current) {
      window.lucide.createIcons({ nameAttr: 'data-lucide', attrs: {} });
    }
  });
  return (
    <i
      ref={ref}
      data-lucide={name}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        strokeWidth,
        ...style,
      }}
      {...props}
    />
  );
}

// --- Button ---
// Variants: filled | outline | ghost | subtle | link
// Sizes: xs | sm | md | lg | xl
// Shapes: square | rounded | pill
const BUTTON_SIZE = {
  xs: { fs: 10, lh: 12, px: 12, py: 6 },
  sm: { fs: 12, lh: 16, px: 16, py: 8 },
  md: { fs: 14, lh: 20, px: 20, py: 10 },
  lg: { fs: 16, lh: 24, px: 24, py: 12 },
  xl: { fs: 20, lh: 28, px: 28, py: 14 },
};
const BUTTON_SHAPE = { square: 0, rounded: 8, pill: 999 };

function Button({
  variant = 'filled',
  size = 'md',
  shape = 'rounded',
  color, // hex — main color, defaults to theme-primary (#1D4ED8)
  textColor,
  icon,
  iconPosition = 'left',
  loading,
  disabled,
  onClick,
  style = {},
  children,
  ...props
}) {
  const main = color || 'var(--theme-primary)';
  const text = textColor || '#fff';
  const s = BUTTON_SIZE[size];
  const r = BUTTON_SHAPE[shape];

  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    fontSize: s.fs,
    lineHeight: `${s.lh}px`,
    padding: `${s.py}px ${s.px}px`,
    borderRadius: r,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: disabled || loading ? 'default' : 'pointer',
    transition:
      'background-color .2s ease, opacity .2s ease, box-shadow .2s ease, color .2s ease',
    outline: 'none',
    userSelect: 'none',
    border: '1px solid transparent',
    opacity: disabled ? 0.5 : 1,
  };

  const variants = {
    filled: { background: main, color: text, borderColor: 'transparent' },
    outline: { background: 'transparent', color: main, borderColor: main },
    ghost: {
      background: 'transparent',
      color: main,
      borderColor: 'transparent',
    },
    subtle: {
      background: `color-mix(in srgb, ${main} 8%, transparent)`,
      color: main,
      borderColor: main,
    },
    link: {
      background: 'transparent',
      color: main,
      border: 0,
      padding: `${s.py}px 4px`,
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      textDecorationThickness: '1px',
    },
  };

  return (
    <button
      onClick={disabled || loading ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) =>
        !disabled &&
        (e.currentTarget.style.opacity = variant === 'link' ? 0.8 : 0.9)
      }
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.opacity = 1)}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px #fff, 0 0 0 4px ${main}`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Icon
          name="loader-2"
          size={s.fs + 2}
          style={{ animation: 'spin 0.8s linear infinite' }}
        />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <Icon name={icon} size={s.fs + 2} />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <Icon name={icon} size={s.fs + 2} />
      )}
    </button>
  );
}

// --- Card ---
function Card({
  variant = 'outlined',
  shape = 'rounded',
  children,
  style = {},
  ...props
}) {
  const r = BUTTON_SHAPE[shape] || 8;
  const variants = {
    default: { background: 'var(--theme-surface)', border: 'none' },
    outlined: {
      background: 'var(--theme-surface)',
      border: '1px solid var(--theme-border)',
    },
    elevated: {
      background: 'var(--theme-surface)',
      border: 'none',
      boxShadow: 'var(--shadow-md)',
    },
  };
  return (
    <div
      style={{
        borderRadius: r,
        overflow: 'hidden',
        transition: 'box-shadow .2s ease, border-color .2s ease',
        ...variants[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
Card.Header = function CardHeader({ children, style = {} }) {
  return (
    <div
      style={{
        padding: 16,
        borderBottom: '1px solid var(--gray-100)',
        color: 'var(--theme-primary)',
        fontWeight: 600,
        fontSize: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
Card.Content = function CardContent({ children, style = {} }) {
  return (
    <div
      style={{
        padding: 16,
        color: 'var(--theme-text-muted)',
        fontSize: 14,
        lineHeight: 15,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
Card.Footer = function CardFooter({ children, style = {} }) {
  return (
    <div
      style={{
        padding: 16,
        borderTop: '1px solid var(--gray-100)',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 8,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// --- Input ---
function Input({
  label,
  icon,
  rightIcon,
  style = {},
  inputStyle = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 11,
            color: 'var(--gray-500)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 12px',
          border: `1px solid ${
            focused ? 'var(--theme-primary)' : 'var(--theme-border)'
          }`,
          borderRadius: 8,
          background: '#fff',
          boxShadow: focused ? '0 0 0 3px rgba(29,78,216,0.12)' : 'none',
          transition: 'all .15s ease',
        }}
      >
        {icon && (
          <Icon name={icon} size={16} style={{ color: 'var(--gray-500)' }} />
        )}
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 0,
            outline: 'none',
            padding: '10px 0',
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            background: 'transparent',
            color: 'var(--theme-text)',
            ...inputStyle,
          }}
          {...props}
        />
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={16}
            style={{ color: 'var(--gray-500)' }}
          />
        )}
      </div>
    </label>
  );
}

// --- TextArea ---
function TextArea({ label, style = {}, ...props }) {
  return (
    <label
      style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}
    >
      {label && (
        <span
          style={{
            fontSize: 11,
            color: 'var(--gray-500)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {label}
        </span>
      )}
      <textarea
        style={{
          padding: '10px 12px',
          border: '1px solid var(--theme-border)',
          borderRadius: 8,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: '20px',
          resize: 'vertical',
          minHeight: 96,
          outline: 'none',
        }}
        {...props}
      />
    </label>
  );
}

// --- Badge ---
const BADGE_COLORS = {
  default: { bg: 'var(--gray-200)', fg: 'var(--gray-700)' },
  primary: { bg: 'var(--theme-primary)', fg: '#fff' },
  success: { bg: '#22C55E', fg: '#fff' },
  warning: { bg: '#F59E0B', fg: '#fff' },
  danger: { bg: '#EF4444', fg: '#fff' },
  info: { bg: '#3B82F6', fg: '#fff' },
  brand: { bg: 'var(--brand-orange)', fg: '#fff' },
  'brand-soft': {
    bg: 'var(--brand-orange-soft)',
    fg: 'var(--brand-orange-press)',
  },
};
function Badge({ variant = 'default', shape = 'pill', children, style = {} }) {
  const c = BADGE_COLORS[variant] || BADGE_COLORS.default;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 8px',
        borderRadius: shape === 'pill' ? 999 : 6,
        background: c.bg,
        color: c.fg,
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// --- Alert ---
const ALERT_COLORS = {
  info: {
    bg: '#EFF6FF',
    border: '#DBEAFE',
    title: '#1E3A8A',
    body: '#1E40AF',
    icon: 'info',
    iconColor: '#1D4ED8',
  },
  success: {
    bg: '#F0FDF4',
    border: '#BBF7D0',
    title: '#14532D',
    body: '#166534',
    icon: 'check-circle',
    iconColor: '#16A34A',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    title: '#713F12',
    body: '#854D0E',
    icon: 'triangle-alert',
    iconColor: '#D97706',
  },
  danger: {
    bg: '#FEF2F2',
    border: '#FECACA',
    title: '#7F1D1D',
    body: '#991B1B',
    icon: 'alert-circle',
    iconColor: '#DC2626',
  },
};
function Alert({ variant = 'info', title, children, onDismiss }) {
  const c = ALERT_COLORS[variant];
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 8,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <Icon
        name={c.icon}
        size={18}
        style={{ color: c.iconColor, marginTop: 2, flex: 'none' }}
      />
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, fontSize: 13, color: c.title }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: 12, color: c.body, lineHeight: 15 }}>
          {children}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            color: c.iconColor,
            padding: 4,
          }}
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

// --- Avatar ---
function Avatar({ name = '?', src, size = 36, style = {} }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: src ? '#eee' : 'var(--theme-primary)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: size * 0.4,
        overflow: 'hidden',
        flex: 'none',
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  );
}

// --- Checkbox / Switch ---
function Checkbox({ checked, onChange, label }) {
  return (
    <label
      style={{
        display: 'inline-flex',
        gap: 8,
        alignItems: 'center',
        fontSize: 14,
        cursor: 'pointer',
      }}
    >
      <span
        onClick={() => onChange?.(!checked)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: checked ? '0' : '1.5px solid var(--gray-400)',
          background: checked ? 'var(--theme-primary)' : '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background .15s ease',
        }}
      >
        {checked && <Icon name="check" size={14} style={{ color: '#fff' }} />}
      </span>
      {label}
    </label>
  );
}
function Switch({ checked, onChange, label }) {
  return (
    <label
      style={{
        display: 'inline-flex',
        gap: 10,
        alignItems: 'center',
        fontSize: 14,
        cursor: 'pointer',
      }}
    >
      <span
        onClick={() => onChange?.(!checked)}
        style={{
          width: 34,
          height: 20,
          borderRadius: 999,
          background: checked ? 'var(--theme-primary)' : 'var(--gray-300)',
          position: 'relative',
          transition: 'background .2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 16 : 2,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: '#fff',
            transition: 'left .2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,.15)',
          }}
        />
      </span>
      {label}
    </label>
  );
}

// --- ChatMessage / ChatInput (from chat.page.tsx) ---
function ChatMessage({ from, children }) {
  const isUser = from === 'user';
  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        background: isUser ? 'var(--theme-primary)' : '#fff',
        color: isUser ? '#fff' : 'var(--gray-900)',
        padding: '10px 14px',
        borderRadius: 12,
        maxWidth: '78%',
        fontSize: 14,
        lineHeight: 15,
        boxShadow: '0 1px 2px rgba(0,0,0,.05)',
      }}
    >
      {children}
    </div>
  );
}
function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Type your message… use @ to mention',
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        border: '1px solid var(--theme-border)',
        borderRadius: 12,
        background: '#fff',
      }}
    >
      <button style={iconBtn} title="Attach">
        <Icon name="paperclip" size={18} />
      </button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && value.trim() && onSend()}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 0,
          outline: 'none',
          padding: '8px 4px',
          fontSize: 14,
          fontFamily: 'var(--font-sans)',
        }}
      />
      <button style={iconBtn} title="Voice">
        <Icon name="mic" size={18} />
      </button>
      <Button
        size="sm"
        icon="send"
        iconPosition="right"
        onClick={() => value.trim() && onSend()}
      >
        Send
      </Button>
    </div>
  );
}
const iconBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 8,
  border: 0,
  background: 'transparent',
  color: 'var(--gray-500)',
  cursor: 'pointer',
};

// --- Layout: TopBar / Sidebar ---
function TopBar({ mode, onToggleMode, page, onNav }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 20px',
        borderBottom: '1px solid var(--theme-border)',
        background: 'var(--theme-surface)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../../assets/orange.webp" style={{ width: 28, height: 28 }} />
        <div
          style={{ fontWeight: 700, letterSpacing: '-0.01em', fontSize: 18 }}
        >
          App‑Studio
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <Badge variant="brand-soft">v0.9.97</Badge>
      <a
        href="https://github.com/rize-network/app-studio-web"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'var(--gray-600)', display: 'flex' }}
      >
        <Icon name="github" size={18} />
      </a>
      <button style={iconBtn} onClick={onToggleMode} title="Toggle theme">
        <Icon name={mode === 'light' ? 'moon' : 'sun'} size={18} />
      </button>
    </div>
  );
}

function Sidebar({ page, onNav, sections }) {
  return (
    <aside
      style={{
        width: 220,
        borderRight: '1px solid var(--theme-border)',
        background: 'var(--theme-surface)',
        padding: '16px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontSize: 13,
      }}
    >
      {sections.map((s) => (
        <React.Fragment key={s.title}>
          <div
            style={{
              padding: '10px 10px 4px',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--gray-500)',
              fontWeight: 600,
            }}
          >
            {s.title}
          </div>
          {s.items.map((it) => (
            <button
              key={it.key}
              onClick={() => onNav(it.key)}
              style={{
                textAlign: 'left',
                background:
                  page === it.key
                    ? 'color-mix(in srgb, var(--theme-primary) 10%, transparent)'
                    : 'transparent',
                color:
                  page === it.key ? 'var(--theme-primary)' : 'var(--gray-700)',
                border: 0,
                padding: '8px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                fontWeight: page === it.key ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Icon name={it.icon} size={14} />
              {it.label}
            </button>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

// Export to window for cross-script use
Object.assign(window, {
  Button,
  Card,
  Input,
  TextArea,
  Badge,
  Alert,
  Avatar,
  Checkbox,
  Switch,
  Icon,
  ChatMessage,
  ChatInput,
  TopBar,
  Sidebar,
});
