import React from 'react';
import {
  CaptionDemo,
  DefaultDemo,
  FooterDemo,
  StylesDemo,
} from 'src/components/Table/examples';
import { Table } from 'src/components/Table/Table';

const TablePage = () => {
  const columns = [
    { title: 'Property', field: 'property' },
    { title: 'App-Studio', field: 'appStudio' },
  ];

  const data = [
    {
      property: 'Data',
      appStudio: <CaptionDemo />,
    },
    {
      property: 'Default',
      appStudio: <DefaultDemo />,
    },
    {
      property: 'Footer',
      appStudio: <FooterDemo />,
    },
    {
      property: 'Styles',
      appStudio: <StylesDemo />,
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default TablePage;
