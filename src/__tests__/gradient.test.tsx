import React from 'react';
import renderer from 'react-test-renderer';
import { Gradient } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Gradient Component', () => {
  test('renders linear gradient correctly', () => {
    render(
      <Gradient
        type="linear"
        from="blue"
        to="purple"
        height="100px"
        width="100%"
        data-testid="gradient"
      />
    );
    const gradientElement = screen.getByTestId('gradient');
    expect(gradientElement).toBeInTheDocument();
    expect(gradientElement).toHaveStyle({
      background: 'linear-gradient(to right, blue 0%, purple 100%)',
    });
  });

  test('renders radial gradient correctly', () => {
    render(
      <Gradient
        type="radial"
        from="blue"
        to="purple"
        height="100px"
        width="100%"
        data-testid="gradient"
      />
    );
    const gradientElement = screen.getByTestId('gradient');
    expect(gradientElement).toBeInTheDocument();
    expect(gradientElement).toHaveStyle({
      background: 'radial-gradient(circle at center, blue 0%, purple 100%)',
    });
  });

  test('renders conic gradient correctly', () => {
    render(
      <Gradient
        type="conic"
        colors={[
          { color: 'red', position: '0deg' },
          { color: 'blue', position: '180deg' },
          { color: 'red', position: '360deg' },
        ]}
        height="100px"
        width="100%"
        data-testid="gradient"
      />
    );
    const gradientElement = screen.getByTestId('gradient');
    expect(gradientElement).toBeInTheDocument();
    expect(gradientElement).toHaveStyle({
      background:
        'conic-gradient(from 0deg at center, red 0deg, blue 180deg, red 360deg)',
    });
  });

  test('renders children correctly', () => {
    render(
      <Gradient
        type="linear"
        from="blue"
        to="purple"
        height="100px"
        width="100%"
      >
        <div data-testid="child">Child content</div>
      </Gradient>
    );
    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child content');
  });

  test('applies custom styles correctly', () => {
    render(
      <Gradient
        type="linear"
        from="blue"
        to="purple"
        height="100px"
        width="100%"
        borderRadius="16px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        data-testid="gradient"
      />
    );
    const gradientElement = screen.getByTestId('gradient');
    expect(gradientElement).toHaveStyle({
      borderRadius: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    });
  });

  test('Gradient to match snapshot', () => {
    const tree = renderer
      .create(
        <Gradient
          type="linear"
          from="blue"
          to="purple"
          height="100px"
          width="100%"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
