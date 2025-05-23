import React from 'react';
import { Carousel } from '../Carousel';
import { View } from 'app-studio';
import { Text } from '../../Text/Text';
import { Card } from '../../Card/Card';
import { Horizontal } from 'app-studio';

export const CustomDemo = () => {
  // Create an array of card content
  const cards = [
    {
      title: 'Mountain Retreat',
      description: 'Peaceful mountain cabin with stunning views.',
      color: 'color.blue.100',
    },
    {
      title: 'Beach Paradise',
      description: 'Relax on white sandy beaches with crystal clear water.',
      color: 'color.green.100',
    },
    {
      title: 'City Adventure',
      description: 'Explore the vibrant streets and culture of the city.',
      color: 'color.purple.100',
    },
    {
      title: 'Desert Oasis',
      description: 'Experience tranquility in the heart of the desert.',
      color: 'color.orange.100',
    },
  ];

  return (
    <View height="300px" width="100%">
      <Carousel
        views={{
          container: {
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          indicators: {
            bottom: '20px',
          },
          indicator: {
            width: '30px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: 'color.gray.200',
          },
          activeIndicator: {
            backgroundColor: 'color.blue.500',
            width: '40px',
          },
          prevButton: {
            backgroundColor: 'color.blue.500',
            color: 'color.white',
          },
          nextButton: {
            backgroundColor: 'color.blue.500',
            color: 'color.white',
          },
        }}
        indicatorVariant="line"
      >
        {cards.map((card, index) => (
          <View
            key={index}
            width="100%"
            height="100%"
            padding="20px"
            backgroundColor={card.color}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Card
              variant="elevated"
              width="80%"
              maxWidth="500px"
              padding="20px"
            >
              <Card.Header>
                <Text fontSize="24px" fontWeight="bold">
                  {card.title}
                </Text>
              </Card.Header>
              <Card.Content>
                <Text fontSize="16px">{card.description}</Text>
              </Card.Content>
              <Card.Footer>
                <Horizontal justifyContent="flex-end">
                  <Text fontSize="14px" color="color.gray.500">
                    Slide {index + 1} of {cards.length}
                  </Text>
                </Horizontal>
              </Card.Footer>
            </Card>
          </View>
        ))}
      </Carousel>
    </View>
  );
};
