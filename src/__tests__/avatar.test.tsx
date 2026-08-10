import React from 'react';
import renderer from './actRenderer.test-utils';
import { Avatar } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Avatar component', () => {
  render(
    <Avatar src="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/07/insert-image-html.jpg" />
  );
  const AvatarElement = document.querySelector(
    '[data-role="avatar"]'
  ) as HTMLElement;
  expect(AvatarElement).toBeInTheDocument();
});

test('applies the correct CSS properties', () => {
  render(
    <Avatar src="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/07/insert-image-html.jpg" />
  );
  const AvatarElement = document.querySelector(
    '[data-role="avatar"]'
  ) as HTMLElement;

  expect(AvatarElement).toHaveStyle({
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
  });
});

test('Avatar to match snapshot', () => {
  const tree = renderer
    .create(
      <Avatar src="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/07/insert-image-html.jpg" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
