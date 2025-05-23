import React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';

export const TooltipPositions = () => {
  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Text fontWeight="bold" marginBottom={10}>
        Different Positions
      </Text>

      <Horizontal gap={20} flexWrap="wrap">
        <Vertical gap={10} alignItems="center">
          <Text>Top Position</Text>
          <Tooltip content="Tooltip on top" position="top">
            <Button>Top</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Right Position</Text>
          <Tooltip content="Tooltip on right" position="right">
            <Button>Right</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Bottom Position</Text>
          <Tooltip content="Tooltip on bottom" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Left Position</Text>
          <Tooltip content="Tooltip on left" position="left">
            <Button>Left</Button>
          </Tooltip>
        </Vertical>
      </Horizontal>

      <Text fontWeight="bold" marginTop={20} marginBottom={10}>
        Different Alignments
      </Text>

      <Horizontal gap={20} flexWrap="wrap">
        <Vertical gap={10} alignItems="center">
          <Text>Start Alignment</Text>
          <Tooltip content="Start aligned tooltip" align="start">
            <Button>Start</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Center Alignment</Text>
          <Tooltip content="Center aligned tooltip" align="center">
            <Button>Center</Button>
          </Tooltip>
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>End Alignment</Text>
          <Tooltip content="End aligned tooltip" align="end">
            <Button>End</Button>
          </Tooltip>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
