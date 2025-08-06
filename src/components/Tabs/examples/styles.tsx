import React from 'react';
import { Text } from '../../Text/Text'; // Adjust path as needed
import { Tabs } from '../../Tabs/Tabs'; // Adjust path as needed

// Example demonstrating how to style the Tabs component using the 'styles' prop.
export const StylesTabs = () => {
  const tabs = [
    {
      title: 'Product',
      value: 'product', // Unique value added
      content: (
        <Text heading="h5" color="white">
          Product Tab Content
        </Text>
      ),
    },
    {
      title: 'Services',
      value: 'services', // Unique value added
      content: (
        <Text heading="h5" color="white">
          Services Tab Content
        </Text>
      ),
    },
    {
      title: 'Playground',
      value: 'playground', // Unique value added
      content: (
        <Text heading="h5" color="white">
          Playground Tab Content
        </Text>
      ),
    },
    {
      title: 'Content',
      value: 'content', // Unique value added
      content: (
        <Text heading="h5" color="white">
          Content Tab Content
        </Text>
      ),
    },
    {
      title: 'Random',
      value: 'random', // Unique value added
      content: (
        <Text heading="h5" color="white">
          Random Tab Content
        </Text>
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      defaultValue="playground" // Example initial tab
      views={{
        container: {
          backgroundColor: 'black',
          borderRadius: '20px',
          padding: '5px',
        },
        headerTabs: {
          backgroundColor: 'purple',
          width: '100%',
          borderRadius: '15px 15px 0 0', // Adjusted for container padding
          padding: '10px 5px 0', // Adjusted padding
          display: 'flex', // Ensure horizontal layout behaves
          gap: '5px', // Add gap between tab buttons
        },
        // Styles for each individual tab button (inactive state)
        tab: {
          borderRadius: '8px', // Use borderRadius instead of shape
          backgroundColor: 'transparent', // Use backgroundColor instead of variant
          color: 'color.white',
          flexGrow: 1, // Example: Make tabs fill width
        },
        // Styles specifically for the active tab button (merged with 'tab' styles)
        activeTab: {
          backgroundColor: 'lightcoral', // Example active background
        },
        // Styles for the text inside any tab button
        title: {
          color: 'color.white',
          fontWeight: 'normal', // Use fontWeight instead of weight
        },
        // Styles specifically for the text inside the active tab button (merged with 'title' styles)
        activeText: {
          fontWeight: 'bold', // Use fontWeight instead of weight
          fontSize: 'lg', // Use fontSize instead of size
          color: 'color.black', // Example active text color
        },
        // Styles for the content area below the tabs
        content: {
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'darkslateblue', // Example background for content area
          borderRadius: '0 0 15px 15px', // Match container rounding
          padding: '20px',
        },
      }}
    />
  );
};
