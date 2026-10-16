import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render } from '@testing-library/react';
import { Background } from 'src/components/Background';

afterEach(() => {
  cleanup();
});

test('renders Background component', () => {
  const { container } = render(<div>Background</div>);
  expect(container).toBeInTheDocument();
});

test('Background matches snapshot', () => {
  const tree = renderer.create(<div>Background</div>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Background.Overlay never stacks a second alpha suffix on a token', () => {
  const { container } = render(
    <Background.Overlay
      backgroundColor="color-gray-900-50"
      contentPosition="center"
    />
  );
  // `color-gray-900-50` must be reduced to `color-gray-900` before the
  // overlay appends its own per-stop alphas; `color-gray-900-50-100` resolves
  // against a CSS variable that doesn't exist and drops the whole gradient.
  expect(container.innerHTML).not.toContain('900-50-100');
  expect(container.innerHTML).not.toContain('900-50-900');
});

test('Background.Overlay accepts a raw CSS color via color-mix', () => {
  const { container } = render(
    <Background.Overlay backgroundColor="#0f172a" contentPosition="center" />
  );
  expect(container.innerHTML).not.toContain('#0f172a-');
});

test('Background.Image applies blendMode as mix-blend-mode on the image layer', () => {
  const { container } = render(
    <Background.Image src="/hero.png" blendMode="multiply" />
  );
  const blended = Array.from(container.querySelectorAll('div')).find((node) =>
    (node.getAttribute('style') || '').includes('mix-blend-mode: multiply')
  );
  expect(blended).toBeTruthy();
});

test('Background.Video applies blendMode as mix-blend-mode on the video element', () => {
  const { container } = render(
    <Background.Video src="/clip.mp4" blendMode="screen" />
  );
  const video = container.querySelector('video');
  expect(video).toBeTruthy();
  expect((video as HTMLVideoElement).getAttribute('style') || '').toContain(
    'mix-blend-mode: screen'
  );
});
