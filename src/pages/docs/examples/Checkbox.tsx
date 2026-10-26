import React, { useState } from 'react';
import { Checkbox } from 'src/components/Form/Checkbox/Checkbox';
import { Text, Vertical } from 'app-studio';

export function CheckboxExample() {
  const [selected, setSelected] = useState(false);
  return (
    <Vertical gap={12}>
      <Checkbox
        label="Include release notes"
        isChecked={selected}
        onChange={setSelected}
      />
      <Text role="status">
        Release notes {selected ? 'included' : 'excluded'}.
      </Text>
    </Vertical>
  );
}
