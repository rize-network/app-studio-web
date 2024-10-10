import React from 'react';
import { Link } from 'react-router-dom';
import { Vertical, Text } from '../../../components';

export const SideMenu = ({ docs }: { docs: any }) => {
  return (
    <Vertical
      gap={20}
      alignItems="center"
      color="black"
      height="100vh"
      backgroundColor="#f9f9f9"
      padding="30px 0px 100px"
      overflowY="auto"
      width={250}
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
