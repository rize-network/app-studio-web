import React, { useMemo } from 'react';
import { View } from '../../Layout/View/View';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Text } from '../../Text/Text';
import { CarouselProps, CarouselSlideProps } from './Carousel.props';
import { useCarouselState } from './Carousel.state';
import {
  IndicatorStyles,
  ActiveIndicatorStyles,
  NavigationButtonStyles,
} from './Carousel.style';

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  children,
  isActive,
  views,
  ...props
}) => {
  return (
    <View
      flexShrink={0}
      width="100%"
      height="100%"
      display={isActive ? 'block' : 'none'}
      {...views}
      {...props}
    >
      {children}
    </View>
  );
};

export const CarouselView: React.FC<CarouselProps> = ({
  children,
  defaultActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onChange,
  showNavigation = true,
  navigationPosition = 'inside',
  prevButton,
  nextButton,
  showIndicators = true,
  indicatorPosition = 'bottom',
  indicatorVariant = 'dot',
  autoPlay = false,
  autoPlayInterval = 3000,
  pauseOnHover = true,
  infinite = true,
  direction = 'horizontal',
  transitionDuration = 300,
  views,
  ...props
}) => {
  // Convert children to array if it's not already
  const slides = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  // Use carousel state hook
  const {
    activeIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useCarouselState({
    defaultActiveIndex,
    activeIndex: controlledActiveIndex,
    onChange,
    autoPlay,
    autoPlayInterval,
    pauseOnHover,
    infinite,
    totalSlides: slides.length,
  });

  // Render navigation buttons
  const renderNavigation = () => {
    if (!showNavigation) return null;

    const prevButtonElement = prevButton || (
      <View
        as="button"
        aria-label="Previous slide"
        {...NavigationButtonStyles}
        {...views?.prevButton}
      >
        &#10094;
      </View>
    );

    const nextButtonElement = nextButton || (
      <View
        as="button"
        aria-label="Next slide"
        {...NavigationButtonStyles}
        {...views?.nextButton}
      >
        &#10095;
      </View>
    );

    return (
      <>
        <View
          position={navigationPosition === 'inside' ? 'absolute' : 'relative'}
          left={navigationPosition === 'inside' ? '10px' : undefined}
          top={navigationPosition === 'inside' ? '50%' : undefined}
          transform={
            navigationPosition === 'inside' ? 'translateY(-50%)' : undefined
          }
          onClick={prevSlide}
        >
          {prevButtonElement}
        </View>
        <View
          position={navigationPosition === 'inside' ? 'absolute' : 'relative'}
          right={navigationPosition === 'inside' ? '10px' : undefined}
          top={navigationPosition === 'inside' ? '50%' : undefined}
          transform={
            navigationPosition === 'inside' ? 'translateY(-50%)' : undefined
          }
          onClick={nextSlide}
        >
          {nextButtonElement}
        </View>
      </>
    );
  };

  // Render indicators
  const renderIndicators = () => {
    if (!showIndicators) return null;

    return (
      <Horizontal
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        {...(indicatorPosition === 'top'
          ? { top: '10px' }
          : { bottom: '10px' })}
        justifyContent="center"
        alignItems="center"
        zIndex={1}
        {...views?.indicators}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            onClick={() => goToSlide(index)}
            {...IndicatorStyles[indicatorVariant]}
            {...(activeIndex === index
              ? ActiveIndicatorStyles[indicatorVariant]
              : {})}
            {...views?.indicator}
            {...(activeIndex === index ? views?.activeIndicator : {})}
          >
            {indicatorVariant === 'number' && (
              <Text
                fontSize="12px"
                color={activeIndex === index ? 'white' : 'inherit'}
              >
                {index + 1}
              </Text>
            )}
          </View>
        ))}
      </Horizontal>
    );
  };

  return (
    <View
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      {...views?.container}
      {...props}
    >
      <View
        width="100%"
        height="100%"
        position="relative"
        {...views?.slideWrapper}
      >
        {slides.map((slide, index) => (
          <CarouselSlide
            key={index}
            isActive={index === activeIndex}
            index={index}
            views={views?.slide}
          >
            {slide}
          </CarouselSlide>
        ))}
      </View>

      {renderNavigation()}
      {renderIndicators()}
    </View>
  );
};
