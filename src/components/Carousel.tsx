'use client';
import React, { useEffect, useRef, useState, createContext } from 'react';
import { Horizontal, Vertical } from './Layout';
import { IconButtons } from './Button/examples';
import { Button } from './Button/Button';
import { RightArrowSvg } from 'src/components/Svg/index';

// import { IconLeft, IconRight } from '@app-studio/web/icons';

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const CarouselContext = createContext({
  onCardClose: (index: number) => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () =>
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  const scrollRight = () =>
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <CarouselContext.Provider
      value={{ onCardClose: () => {}, currentIndex: 0 }}
    >
      <Horizontal
        gap={2}
        alignItems="center"
        width="100%"
        paddingVertical={20}
        position="relative"
      >
        <Button
          onClick={scrollLeft}
          icon={<RightArrowSvg />}
          disabled={!canScrollLeft}
          shape="rounded"
        />
        <Horizontal
          ref={carouselRef}
          onScroll={checkScrollability}
          gap={4}
          overflowX="auto"
          paddingX={10}
        >
          {items.map((item, index) => (
            <Vertical key={index} minWidth="300px">
              {item}
            </Vertical>
          ))}
        </Horizontal>
        <Button
          onClick={scrollRight}
          icon={<RightArrowSvg />}
          disabled={!canScrollRight}
          shape="rounded"
        />
      </Horizontal>
    </CarouselContext.Provider>
  );
};
