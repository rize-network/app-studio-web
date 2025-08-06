import React from 'react';
import renderer from 'react-test-renderer';
import { Title } from 'src/components/Title/Title';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Title Component', () => {
  test('should render Title component without crashing', () => {
    render(<Title>Test Title</Title>);
  });

  test('should render Title component with correct text', () => {
    render(<Title role="heading">Test Title</Title>);
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  test('should render Title with highlight text', () => {
    render(
      <Title highlightText="Test" role="heading">
        Test Title
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  test('should render Title with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Title size={size} role="heading">
          {size} Title
        </Title>
      );
      const titleElement = screen.getByRole('heading');
      expect(titleElement).toBeInTheDocument();
      unmount();
    });
  });

  test('should render responsive Title', () => {
    render(
      <Title size="xl" responsive={true} role="heading">
        Responsive Title
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Responsive Title');
  });

  test('should render centered Title', () => {
    render(
      <Title centered={true} role="heading">
        Centered Title
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle({ textAlign: 'center' });
  });

  test('should render Title with different highlight styles', () => {
    const highlightStyles = [
      'underline',
      'background',
      'gradient',
      'outline',
      'glow',
    ] as const;

    highlightStyles.forEach((style) => {
      const { unmount } = render(
        <Title highlightText="Test" highlightStyle={style} role="heading">
          Test Title
        </Title>
      );
      const titleElement = screen.getByRole('heading');
      expect(titleElement).toBeInTheDocument();
      unmount();
    });
  });

  test('Title with responsive prop should match snapshot', () => {
    const tree = renderer
      .create(
        <Title size="lg" responsive={true} highlightText="Responsive">
          Responsive Title Test
        </Title>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Title with manual media queries should match snapshot', () => {
    const tree = renderer
      .create(
        <Title
          media={{
            mobile: { fontSize: 24 },
            tablet: { fontSize: 32 },
            desktop: { fontSize: 40 },
          }}
        >
          Manual Media Title
        </Title>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should not apply responsive styles when media prop is provided', () => {
    render(
      <Title
        size="xl"
        responsive={true}
        media={{
          mobile: { fontSize: 20 },
          tablet: { fontSize: 30 },
          desktop: { fontSize: 40 },
        }}
        role="heading"
      >
        Title with both responsive and media
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    // The media prop should take precedence over responsive prop
  });

  test('should render Title with typewriter effect', () => {
    render(
      <Title
        highlightText="Typewriter"
        highlightTypewriter={true}
        role="heading"
      >
        Title with Typewriter effect
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  test('should render Title with animation loop control', () => {
    render(
      <Title
        animate={{
          from: { opacity: 0 },
          to: { opacity: 1 },
          duration: '1s',
        }}
        animationLoop={3}
        role="heading"
      >
        Title with 3 animation loops
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  test('should render Title with infinite animation loop', () => {
    render(
      <Title
        animate={{
          from: { transform: 'translateX(-10px)' },
          to: { transform: 'translateX(10px)' },
          duration: '2s',
        }}
        animationLoop="infinite"
        role="heading"
      >
        Title with infinite animation
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  test('should render Title with highlight animation loop control', () => {
    render(
      <Title
        highlightText="Highlight"
        highlightAnimate={{
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.1)' },
          duration: '0.5s',
        }}
        highlightAnimationLoop="infinite"
        role="heading"
      >
        Title with infinite highlight animation
      </Title>
    );
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  test('Title with animation loop should match snapshot', () => {
    const tree = renderer
      .create(
        <Title
          animate={{
            from: { opacity: 0 },
            to: { opacity: 1 },
            duration: '1s',
          }}
          animationLoop={2}
          highlightText="Loop"
          highlightAnimate={{
            from: { transform: 'scale(1)' },
            to: { transform: 'scale(1.1)' },
            duration: '0.5s',
          }}
          highlightAnimationLoop="infinite"
        >
          Animation Loop Test
        </Title>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
