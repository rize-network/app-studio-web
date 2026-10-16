import React from 'react';
import { Horizontal, Text, View, Vertical } from 'app-studio';
import { Button, PageLayout } from '../..';

/**
 * A bordered, fixed-height frame stands in for a device screen so the pinned
 * header/footer and scrollable middle are visible in the gallery.
 */
export const DefaultPageLayout = () => (
  <View
    height={420}
    width="100%"
    maxWidth={360}
    borderRadius={16}
    overflow="hidden"
    borderWidth={1}
    borderStyle="solid"
    borderColor="color-gray-200"
  >
    <PageLayout
      safe={false}
      header={
        <Horizontal
          padding={16}
          backgroundColor="color-blue-500"
          justifyContent="center"
        >
          <Text color="color-white" fontWeight="bold">
            Pinned Header
          </Text>
        </Horizontal>
      }
      footer={
        <View padding={12} backgroundColor="color-white">
          <Button width="100%">Submit</Button>
        </View>
      }
    >
      <Vertical padding={16} gap={12}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            padding={16}
            borderRadius={8}
            backgroundColor="color-gray-100"
          >
            <Text>Scrollable row {i + 1}</Text>
          </View>
        ))}
      </Vertical>
    </PageLayout>
  </View>
);
