import React from 'react';
import { HeaderDocs, Menu } from './components/docs.views';
import { View, Vertical, Horizontal } from 'src/components';
import { useParams } from 'react-router-dom';
import { useDocsRequest } from './components/docs.request';

const DocsPage = () => {
  const { section, id } = useParams();
  const { sections } = useDocsRequest();
  return (
    <Horizontal backgroundColor="color.white">
      <Vertical
        width={200}
        height={'100%'}
        media={{ mobile: { display: 'none' } }}
        borderRight={'1px solid #ededee'}
      >
        <Menu selected={{ section, id }} sections={sections} />
      </Vertical>
      <Vertical flex={1}>
        <Horizontal width={'100%'} height={'100%'}>
          <Vertical flex={1} height={'100%'}>
            <HeaderDocs />
            <View padding={20}>Content</View>
          </Vertical>
          <Vertical
            width={200}
            height={'100%'}
            borderLeft={'1px solid #ededee'}
            media={{ mobile: { display: 'none' }, tablet: { display: 'none' } }}
          >
            Side
          </Vertical>
        </Horizontal>
      </Vertical>
    </Horizontal>
  );
};

export default DocsPage;
