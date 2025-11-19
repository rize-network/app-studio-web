import React from 'react';
import renderer from 'react-test-renderer';
import { Carousel } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Carousel component', () => {
  render(<Carousel />);
});

test('renders Carousel with items', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  render(
    <Carousel>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Carousel>
  );
});

test('Carousel with multiple children', () => {
  render(
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  );
});

test('Carousel matches snapshot', () => {
  const tree = renderer
    .create(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
