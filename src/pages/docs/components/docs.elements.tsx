import React from 'react';
import { Link } from 'react-router-dom';
import { Vertical, Text } from '../../../components';

export const SideMenu = ({ docs, ...props }: any) => {
  return (
    <Vertical
      gap={20}
      alignItems="center"
      color="black"
      backgroundColor="#f9f9f9"
      paddingVertical={50}
      width={250}
      {...props}
    >
      {docs.map((doc: any) => (
        <Link
          key={doc.componentName}
          to={`/docs/${doc.componentName}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Text fontSize={16}>{doc.componentName}</Text>
        </Link>
      ))}
    </Vertical>
  );
};
