import React from 'react';
import { Vertical, Text } from 'app-studio';
import { Selector } from '../Selector/Selector';
import { ComboBox } from '../ComboBox/ComboBox';
import { ColorInput } from '../ColorInput/ColorInput';
import { TagInput } from '../TagInput/TagInput';

export const FormAdvanced = () => {
  const [tags, setTags] = React.useState<string[]>(['react-native']);
  return (
    <Vertical gap={16} width="100%">
      <Text fontWeight="600" color="color-gray-800">
        Segmented selector
      </Text>
      <Selector
        label="Priority"
        options={[
          { label: 'Low', value: 'low', color: 'color-green-500' },
          { label: 'Medium', value: 'medium', color: 'color-orange-500' },
          { label: 'High', value: 'high', color: 'color-red-500' },
        ]}
      />

      <Text fontWeight="600" color="color-gray-800">
        ComboBox
      </Text>
      <ComboBox
        id="framework"
        name="framework"
        items={[
          { value: 'next', label: 'Next.js' },
          { value: 'expo', label: 'Expo' },
          { value: 'remix', label: 'Remix' },
        ]}
      />

      <Text fontWeight="600" color="color-gray-800">
        Color input
      </Text>
      <ColorInput label="Accent color" defaultValue="color-blue-500" />

      <Text fontWeight="600" color="color-gray-800">
        Tag input
      </Text>
      <TagInput
        label="Tags"
        placeholder="Type and press Enter…"
        tags={tags}
        onTagsChange={setTags}
      />
    </Vertical>
  );
};
