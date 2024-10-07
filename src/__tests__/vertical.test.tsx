import React from 'react';
import renderer from 'react-test-renderer';
import { Vertical } from 'src/components';
import { View } from 'src/components/Layout/View/View';

import { cleanup, render, screen } from '@testing-library/react';
afterEach(() => {
  cleanup();
});

test('should render Vertical component without crashing', () => {
  render(
    <Vertical role="Vertical">
      <View width={50} height={50} backgroundColor="theme.primary" />
      <View width={50} height={50} backgroundColor="theme.warning" />
    </Vertical>
  );
});

test('should render Vertical component', () => {
  render(
    <Vertical role="Vertical">
      <View width={50} height={50} backgroundColor="theme.primary" />
      <View width={50} height={50} backgroundColor="theme.warning" />
    </Vertical>
  );
  const VerticalElement = screen.getByRole('Vertical');
  expect(VerticalElement).toBeInTheDocument();
});

test('should render Vertical component with correct class name', () => {
  render(
    <Vertical role="Vertical" className="layout">
      <View width={50} height={50} backgroundColor="theme.primary" />
      <View width={50} height={50} backgroundColor="theme.warning" />
    </Vertical>
  );
  const VerticalElement = screen.getByRole('Vertical');
  expect(VerticalElement).toHaveClass('layout');
});

// test('should render a Vertical layout with display equals to flex', () => {
//   render(
//     <Vertical role="Vertical">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ display: 'flex' });
// });

// test('should render a wrap Vertical layout with flex-wrap equals to wrap', () => {
//   render(
//     <Vertical role="Vertical" flexWrap="wrap">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ flexWrap: 'wrap' });
// });

// test('should render a nowrap Vertical layout with flex-wrap equals to nowrap', () => {
//   render(
//     <Vertical role="Vertical" flexWrap="nowrap">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ flexWrap: 'nowrap' });
// });

// test('should render a wrap reverse Vertical layout with flex-wrap equals to wrap-reverse', () => {
//   render(
//     <Vertical role="Vertical" flexWrap="wrap-reverse">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ flexWrap: 'wrap-reverse' });
// });

// test('should render a justify Vertical layout with justify-content equals to space-between', () => {
//   render(
//     <Vertical role="Vertical" justifyContent="space-between">
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ justifyContent: 'space-between' });
// });

// test('should render a reverse Vertical layout with flex-direction equals to row-reverse', () => {
//   render(
//     <Vertical role="Vertical" isReversed>
//       <View width={50} height={50} backgroundColor="theme.primary" />
//       <View width={50} height={50} backgroundColor="theme.warning" />
//     </Vertical>
//   );
//   const VerticalElement = screen.getByRole('Vertical');
//   expect(VerticalElement).toHaveStyle({ flexDirection: 'column-reverse' });
// });

test('Vertical layout to match snapshot', () => {
  const tree = renderer
    .create(
      <Vertical justifyContent="space-between">
        <View width={50} height={50} backgroundColor="theme.primary" />
        <View width={50} height={50} backgroundColor="theme.secondary" />
        <View width={50} height={50} backgroundColor="theme.warning" />
      </Vertical>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
