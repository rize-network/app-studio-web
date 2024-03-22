import React from 'react';
import {
  CaptionDemo,
  DefaultDemo,
  FooterDemo,
  StylesDemo,
  DataDemo,
} from '../components/Table/examples';
import { Table } from '../components/Table/Table';

const TablePage = () => {
  const columns = [
    { title: 'Property', field: 'property' },
    { title: 'App-Studio', field: 'appStudio' },
  ];

  const data = [
    {
      property: 'Caption',
      appStudio: <CaptionDemo />,
    },
    {
      property: 'Data',
      appStudio: <DataDemo />,
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

  return <Table.Template columns={columns} data={data} />;
};

export default TablePage;
