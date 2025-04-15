import React from 'react';
import renderer from 'react-test-renderer';
import { Horizontal } from 'src/components';
import { View } from 'app-studio';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render Horizontal component without crashing', () => {
  render(<Horizontal>Hello</Horizontal>);
});

test('should render Horizontal component with correct text', () => {
  render(
    <Horizontal role="Horizontal">
      <View width={50} height={50} backgroundColor="theme.primary" />
      <View width={50} height={50} backgroundColor="theme.warning" />
    </Horizontal>
  );
  const HorizontalElement = screen.getByRole('Horizontal');
  expect(HorizontalElement).toBeInTheDocument();
});

test('should render Horizontal component with correct class name', () => {
  render(
    <Horizontal role="Horizontal" className="layout">
      <View width={50} height={50} backgroundColor="theme.primary" />
      <View width={50} height={50} backgroundColor="theme.warning" />
    </Horizontal>
  );
  const HorizontalElement = screen.getByRole('Horizontal');
  expect(HorizontalElement).toHaveClass('layout');
});

// test('should render a Horizontal with displat equals to flex', () => {
//   render(
//     <Horizontal role="Horizontal">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ display: 'flex' });
// });

// test('should render a wrap horizontal layout with flex-wrap equals to wrap', () => {
//   render(
//     <Horizontal role="Horizontal" flexWrap="wrap">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ flexWrap: 'wrap' });
// });

// test('should render a nowrap horizontal layout with flex-wrap equals to nowrap', () => {
//   render(
//     <Horizontal role="Horizontal" flexWrap="nowrap">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ flexWrap: 'nowrap' });
// });

// test('should render a wrap reverse horizontal layout with flex-wrap equals to wrap-reverse', () => {
//   render(
//     <Horizontal role="Horizontal" flexWrap="wrap-reverse">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ flexWrap: 'wrap-reverse' });
// });

// test('should render a justify horizontal layout with justify-content equals to space-between', () => {
//   render(
//     <Horizontal role="Horizontal" justifyContent="space-between">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ justifyContent: 'space-between' });
// });

// test('should render a reverse horizontal layout with flex-direction equals to row-reverse', () => {
//   render(
//     <Horizontal role="Horizontal" isReversed>
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Horizontal>
//   );
//   const HorizontalElement = screen.getByRole('Horizontal');
//   expect(HorizontalElement).toHaveStyle({ flexDirection: 'row-reverse' });
// });

test('Horizontal layout to match snapshot', () => {
  const tree = renderer
    .create(
      <Horizontal justifyContent="space-between">
        <View width={50} height={50} backgroundColor="theme.primary" />
        <View width={50} height={50} backgroundColor="theme.secondary" />
        <View width={50} height={50} backgroundColor="theme.warning" />
      </Horizontal>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
