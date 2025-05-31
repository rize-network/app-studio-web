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

  test('renders Meteors background without crashing', () => {
    render(<Background.Meteors data-testid="meteors-background" number={5} />);
    const meteorsElement = screen.getByTestId('meteors-background');
    expect(meteorsElement).toBeInTheDocument();
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
    const tree = renderer
      .create(<Background.Meteors number={3} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Wall background to match snapshot', () => {
    const tree = renderer
      .create(<Background.Wall rows={3} cols={3} squareSize={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
