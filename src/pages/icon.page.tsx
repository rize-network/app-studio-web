import { Text } from 'app-studio';
import React from 'react';
import { Horizontal } from 'src/components/Layout/Horizontal/Horizontal';
import * as Icon from 'src/components/Icon/Icon';
import { View } from 'src/components/Layout/View/View';
export const IconPage = () => {
  const iconList = Object.keys(Icon);
  return (
    <View>
      {iconList.map((name: string) => {
        const IcComponent = Icon[name as keyof typeof Icon];
        return (
          <Horizontal key={name} gap={20}>
            <Text lineHeight={16}>{name} :</Text>
            <IcComponent key={name} widthHeight={16} color="black" />
          </Horizontal>
        );
      })}
    </View>
  );
};

export default IconPage;
