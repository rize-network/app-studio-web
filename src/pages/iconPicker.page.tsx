import React, { useState } from 'react';
import { View, Text, Horizontal, Vertical } from 'app-studio';
import { Separator } from 'src/components/Separator/Separator';
import { IconPicker } from 'src/components/IconPicker/IconPicker';
import { Icon } from 'src/components/Icon/Icon';

const IconPickerPage = () => {
  const [icon, setIcon] = useState('user');

  return (
    <View
      width="100%"
      height="100%"
      padding={80}
      paddingTop={80}
      paddingBottom={80}
      gap={32}
      boxSizing="border-box"
    >
      <Vertical gap={10} width="100%">
        <Text variant="h1">IconPicker</Text>
        <Text variant="body" color="theme-text-secondary">
          A dropdown component for selecting icons from a predefined list.
        </Text>
      </Vertical>

      <Separator />

      <Vertical gap={30} width="100%">
        <Vertical gap={10}>
          <Text variant="h3">Basic Usage</Text>
          <View width="300px">
            <IconPicker
              label="Select Icon"
              value={icon}
              onChange={setIcon}
              placeholder="Choose an icon"
            />
          </View>
          <Horizontal gap={10} alignItems="center">
            <Text>Selected:</Text>
            {icon && <Icon name={icon} />}
            <Text>{icon}</Text>
          </Horizontal>
        </Vertical>

        <Separator />

        <Vertical gap={10}>
          <Text variant="h3">Sizes</Text>
          <View display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={20}>
            <IconPicker size="sm" placeholder="Small (sm)" />
            <IconPicker size="md" placeholder="Medium (md)" />
            <IconPicker size="lg" placeholder="Large (lg)" />
          </View>
        </Vertical>

        <Separator />

        <Vertical gap={10}>
          <Text variant="h3">Variants</Text>
          <View display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={20}>
            <IconPicker variant="default" placeholder="Default" />
            <IconPicker variant="outline" placeholder="Outline" />
            <IconPicker variant="filled" placeholder="Filled" />
          </View>
        </Vertical>

        <Separator />

        <Vertical gap={10}>
          <Text variant="h3">Shapes</Text>
          <View display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={20}>
            <IconPicker shape="default" placeholder="Default" />
            <IconPicker shape="rounded" placeholder="Rounded" />
            <IconPicker shape="square" placeholder="Square" />
            <IconPicker shape="pill" placeholder="Pill" />
          </View>
        </Vertical>

        <Separator />

        <Vertical gap={10}>
          <Text variant="h3">States</Text>
          <View display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={20}>
            <IconPicker label="Disabled" isDisabled placeholder="Disabled" />
            <IconPicker label="Read Only" isReadOnly value="lock" />
            <IconPicker
              label="Error"
              error
              helperText="This field has an error"
            />
            <IconPicker
              label="With Helper Text"
              helperText="Select your favorite icon"
            />
          </View>
        </Vertical>
      </Vertical>
    </View>
  );
};

export default IconPickerPage;
