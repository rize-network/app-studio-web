import React from 'react';
import { View, Vertical } from 'app-studio';
import { ComboBox } from 'src/components/Form/ComboBox/ComboBox';
import { Select } from 'src/components/Form/Select/Select';
import { Text } from 'src/components/Text/Text';

const PositioningTestPage = () => {
  const comboBoxItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
  ];

  const selectOptions = [
    { label: 'Select Option 1', value: 'select1' },
    { label: 'Select Option 2', value: 'select2' },
    { label: 'Select Option 3', value: 'select3' },
    { label: 'Select Option 4', value: 'select4' },
    { label: 'Select Option 5', value: 'select5' },
    { label: 'Select Option 6', value: 'select6' },
    { label: 'Select Option 7', value: 'select7' },
    { label: 'Select Option 8', value: 'select8' },
  ];

  return (
    <View>
      <Vertical gap={20} padding={20}>
        <Text size="xl" weight="bold">
          Positioning Test Page
        </Text>
        <Text>
          This page tests the positioning of ComboBox and Select components.
          Scroll down to test components near the bottom of the viewport.
        </Text>

        {/* Add some spacing to push components down */}
        <View height="50vh" />

        <Text size="lg" weight="medium">
          Components near bottom of viewport (should open upward):
        </Text>

        <Vertical gap={20}>
          <View>
            <Text weight="medium" marginBottom={8}>
              ComboBox Test:
            </Text>
            <ComboBox
              id="test-combobox"
              name="test-combobox"
              items={comboBoxItems}
              placeholder="Select an option..."
              searchPlaceholder="Search options..."
              onSelect={(item) => console.log('ComboBox selected:', item)}
            />
          </View>

          <View>
            <Text weight="medium" marginBottom={8}>
              Select Test:
            </Text>
            <Select
              id="test-select"
              name="test-select"
              options={selectOptions}
              placeholder="Choose an option..."
              onChange={(value) => console.log('Select changed:', value)}
            />
          </View>

          <View>
            <Text weight="medium" marginBottom={8}>
              Multi-Select Test:
            </Text>
            <Select
              id="test-multi-select"
              name="test-multi-select"
              options={selectOptions}
              placeholder="Choose multiple options..."
              isMulti={true}
              onChange={(value) => console.log('Multi-select changed:', value)}
            />
          </View>
        </Vertical>

        {/* Add more spacing to ensure we can scroll and test positioning */}
        <View height="30vh" />

        <Text size="lg" weight="medium">
          Components in middle of viewport (should open downward):
        </Text>

        <Vertical gap={20}>
          <View>
            <Text weight="medium" marginBottom={8}>
              ComboBox Test (Middle):
            </Text>
            <ComboBox
              id="test-combobox-middle"
              name="test-combobox-middle"
              items={comboBoxItems}
              placeholder="Select an option..."
              searchPlaceholder="Search options..."
              onSelect={(item) => console.log('ComboBox middle selected:', item)}
            />
          </View>

          <View>
            <Text weight="medium" marginBottom={8}>
              Select Test (Middle):
            </Text>
            <Select
              id="test-select-middle"
              name="test-select-middle"
              options={selectOptions}
              placeholder="Choose an option..."
              onChange={(value) => console.log('Select middle changed:', value)}
            />
          </View>
        </Vertical>

        {/* Add final spacing */}
        <View height="50vh" />
      </Vertical>
    </View>
  );
};

export default PositioningTestPage;
