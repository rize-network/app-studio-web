import React from 'react';
import renderer from 'react-test-renderer';
import { Button, View, showMessage, MessageLayout } from '../components';

import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('AspectRatio to match snapshot', () => {
  const tree = renderer
    .create(
      <View>
        <Button
          onClick={() =>
            showMessage(
              'success',
              'Scheduled: Catch up',
              'Friday, February 10, 2023 at 5:57 PM'
            )
          }
        >
          Show Toast
        </Button>
        <MessageLayout />
      </View>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
