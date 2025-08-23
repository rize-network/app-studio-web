import React from 'react';
import renderer from 'react-test-renderer';
import { Background } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Background Component', () => {
  test('renders Aurora background without crashing', () => {
    render(
      <Background.Aurora data-testid="aurora-background">
        <div>Aurora Content</div>
      </Background.Aurora>
    );
    const auroraElement = screen.getByTestId('aurora-background');
    expect(auroraElement).toBeInTheDocument();
    expect(auroraElement).toHaveTextContent('Aurora Content');
  });

  test('renders Meteors background with children', () => {
    render(
      <Background.Meteors data-testid="meteors-background" number={5}>
        <div>Meteor Content</div>
      </Background.Meteors>
    );
    const meteorsElement = screen.getByTestId('meteors-background');
    expect(meteorsElement).toBeInTheDocument();
    expect(meteorsElement).toHaveTextContent('Meteor Content');
  });

  test('renders Wall background without crashing', () => {
    render(
      <Background.Wall
        data-testid="wall-background"
        rows={5}
        cols={5}
        squareSize={20}
      />
    );
    const wallElement = screen.getByTestId('wall-background');
    expect(wallElement).toBeInTheDocument();
  });

  test('Aurora background with showRadialGradient prop', () => {
    render(
      <Background.Aurora
        data-testid="aurora-gradient"
        showRadialGradient={true}
      >
        Content
      </Background.Aurora>
    );
    const auroraElement = screen.getByTestId('aurora-gradient');
    expect(auroraElement).toBeInTheDocument();
  });

  test('Meteors background with custom number of meteors', () => {
    render(<Background.Meteors data-testid="meteors-custom" number={10} />);
    const meteorsElement = screen.getByTestId('meteors-custom');
    expect(meteorsElement).toBeInTheDocument();
  });

  test('Wall background with custom dimensions', () => {
    render(
      <Background.Wall
        data-testid="wall-custom"
        rows={8}
        cols={6}
        squareSize={30}
      />
    );
    const wallElement = screen.getByTestId('wall-custom');
    expect(wallElement).toBeInTheDocument();
  });

  test('Particles background without crashing', () => {
    render(
      <Background.Particles
        data-testid="particles-background"
        count={20}
        speed="fast"
        shapes={['circle', 'square']}
      />
    );
    const particlesElement = screen.getByTestId('particles-background');
    expect(particlesElement).toBeInTheDocument();
  });

  test('Grid background without crashing', () => {
    render(
      <Background.Grid
        data-testid="grid-background"
        gridSize={25}
        animationSpeed="fast"
      />
    );
    const gridElement = screen.getByTestId('grid-background');
    expect(gridElement).toBeInTheDocument();
  });

  test('Ripples background without crashing', () => {
    render(
      <Background.Ripples
        data-testid="ripples-background"
        rippleCount={3}
        maxSize={150}
        frequency={2}
      />
    );
    const ripplesElement = screen.getByTestId('ripples-background');
    expect(ripplesElement).toBeInTheDocument();
  });
});

describe('Background Snapshots', () => {
  test('Aurora background to match snapshot', () => {
    const tree = renderer
      .create(
        <Background.Aurora showRadialGradient={true}>
          Aurora Content
        </Background.Aurora>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Meteors background to match snapshot', () => {
    const tree = renderer.create(<Background.Meteors number={3} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Wall background to match snapshot', () => {
    const tree = renderer
      .create(<Background.Wall rows={3} cols={3} squareSize={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Particles background to match snapshot', () => {
    const tree = renderer
      .create(
        <Background.Particles count={10} speed="medium" shapes={['circle']} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Grid background to match snapshot', () => {
    const tree = renderer
      .create(<Background.Grid gridSize={20} animationSpeed="medium" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Ripples background to match snapshot', () => {
    const tree = renderer
      .create(
        <Background.Ripples rippleCount={3} maxSize={100} frequency={2} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
