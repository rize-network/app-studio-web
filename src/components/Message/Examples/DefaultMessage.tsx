import React from 'react';
import { Button } from '../../Button/Button';

import { showMessage } from '../Message/Message.store';
import { FileSVG } from 'src/components/File/File';
import { MessageLayout } from '../Message';

export const DefaultMessage = () => {
  return (
    <>
      <Button onClick={() => showMessage('success', 'Test')} isAuto>
        Blur Overlay
      </Button>
      <MessageLayout
        icons={{
          success: 'CheckCicleSvg',
          info: 'InformationSvg',
          error: 'ErreurSvg',
          warning: 'WarningSvg',
        }}
        icon={FileSVG}
        theme={{
          info: {
            container: {
              backgroundColor: 'color.blue.200',
              border: 'color.blue.400',
            },
            icon: {
              color: 'color.blue.500',
              name: 'InformationSvg',
            },
            content: {
              color: 'color.blue.500',
            },
            close: {
              color: 'color.blue.500',
              name: 'CloseSvg',
            },
          },
          success: {
            container: {
              backgroundColor: 'color.green.200',
              border: 'color.green.400',
            },
            icon: {
              color: 'color.green.500',
              name: 'CheckCircleSvg',
            },
            content: {
              color: 'color.green.500',
            },
            close: {
              color: 'color.green.500',
              name: 'CloseSvg',
            },
          },
          error: {
            container: {
              backgroundColor: 'color.red.200',
              border: 'color.red.400',
            },
            icon: {
              color: 'color.red.500',
              name: 'ErrrorSvg',
            },
            content: {
              color: 'color.red.500',
            },
            close: {
              color: 'color.red.500',
              name: 'CloseSvg',
            },
          },
          warning: {
            container: {
              backgroundColor: 'color.orange.200',
              border: 'color.orange.400',
            },
            icon: {
              color: 'color.orange.500',
              name: 'ErrrorSvg',
            },
            content: {
              color: 'color.orange.500',
            },
            close: {
              color: 'color.orange.500',
              name: 'CloseSvg',
            },
          },
        }}
      />
    </>
  );
};
