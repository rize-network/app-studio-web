import React, { useMemo, useEffect, useRef } from 'react';
import { View } from 'app-studio';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Button } from '../../Button/Button';
import { ChevronIcon } from '../../Icon/Icon';
import { Text } from '../../Text/Text';
import {
  CarouselProps,
  CarouselSlideProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselPreviousProps,
  CarouselNextProps,
} from './Carousel.props';
import { useCarouselState } from './Carousel.state';
import {
  IndicatorStyles,
  ActiveIndicatorStyles,
  NavigationButtonStyles,
  getDefaultCarouselStyles,
} from './Carousel.style';
import { CarouselContext, useCarouselContext } from './Carousel.context';

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

// --- New Compound Components ---

// CarouselPrevious component
export const CarouselPreviousComponent: React.FC<CarouselPreviousProps> = ({
  views,
  children, // Allow custom content/icon
  ...props // Spread remaining ButtonProps
}) => {
  const {
    goToPrevious,
    canGoPrevious,
    styles: globalStyles,
  } = useCarouselContext();
  const defaultStyles = getDefaultCarouselStyles().prevButton;
  const mergedStyles = {
    ...defaultStyles,
    ...globalStyles?.prevButton,
    ...views?.prevButton,
  };

  return (
    <Button
      aria-label="Previous slide"
      onClick={() => goToPrevious()}
      isDisabled={!canGoPrevious}
      {...(mergedStyles as any)} // Apply styles
      {...props} // Spread user props
    >
      {children ?? <ChevronIcon orientation="left" widthHeight={16} />}
    </Button>
  );
};

// CarouselNext component
export const CarouselNextComponent: React.FC<CarouselNextProps> = ({
  views,
  children,
  ...props
}) => {
  const { goToNext, canGoNext, styles: globalStyles } = useCarouselContext();
  const defaultStyles = getDefaultCarouselStyles().nextButton;
  const mergedStyles = {
    ...defaultStyles,
    ...globalStyles?.nextButton,
    ...views?.nextButton,
  };

  return (
    <Button
      aria-label="Next slide"
      onClick={() => goToNext()}
      isDisabled={!canGoNext}
      {...(mergedStyles as any)}
      {...props}
    >
      {children ?? <ChevronIcon orientation="right" widthHeight={16} />}
    </Button>
  );
};

// CarouselItem component
export const CarouselItemComponent: React.FC<CarouselItemProps> = ({
  children,
  views,
  ...props
}) => {
  const {
    registerSlide,
    unregisterSlide,
    styles: globalStyles,
  } = useCarouselContext();
  const slideIdRef = useRef<number | null>(null);

  // Register/unregister slide on mount/unmount
  useEffect(() => {
    const id = registerSlide();
    slideIdRef.current = id;
    return () => {
      if (slideIdRef.current !== null) {
        unregisterSlide(slideIdRef.current);
      }
    };
  }, [registerSlide, unregisterSlide]);

  const defaultStyles = getDefaultCarouselStyles().item;
  const mergedStyles = {
    ...defaultStyles,
    ...globalStyles?.item,
    ...views?.item,
  };

  return (
    <View
      role="group"
      aria-roledescription="slide"
      {...mergedStyles}
      {...props}
    >
      {children}
    </View>
  );
};

// CarouselContent component
export const CarouselContentComponent: React.FC<CarouselContentProps> = ({
  children,
  views,
  style, // User style for outer container
  ...props // User props for outer container
}) => {
  const {
    currentIndex,
    styles: globalStyles,
    contentId,
  } = useCarouselContext();
  const defaultStyles = getDefaultCarouselStyles();

  const mergedContentStyles = {
    ...defaultStyles.content,
    ...globalStyles?.content,
    ...views?.content,
  };
  const mergedInnerStyles = {
    ...defaultStyles.innerContainer,
    ...globalStyles?.innerContainer,
    ...views?.innerContainer,
  };

  // Calculate the translation based on the current index
  const translateX = `-${currentIndex * 100}%`;

  return (
    // Outer container for overflow: hidden
    <View
      {...mergedContentStyles}
      {...props} // Spread user props onto outer container
      style={{ ...mergedContentStyles?.style, ...style }}
      id={contentId}
      aria-live="polite" // Announce slide changes politely
    >
      {/* Inner container that moves */}
      <View
        {...mergedInnerStyles}
        style={{
          ...mergedInnerStyles?.style,
          transform: `translateX(${translateX})`,
        }}
      >
        {children}
      </View>
    </View>
  );
};

// --- Legacy View Component ---

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
  const carouselState = useCarouselState({
    defaultActiveIndex,
    activeIndex: controlledActiveIndex,
    onChange,
    autoPlay,
    autoPlayInterval,
    pauseOnHover,
    infinite,
    totalSlides: slides.length,
  });

  const {
    activeIndex,
    totalSlides,
    goToSlide,
    nextSlide,
    prevSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = carouselState;

  // Prepare base styles for context
  const baseStyles = getDefaultCarouselStyles();

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
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          left={navigationPosition === 'inside' ? '10px' : '-40px'}
          onClick={prevSlide}
          cursor={!infinite && activeIndex === 0 ? 'not-allowed' : 'pointer'}
          opacity={!infinite && activeIndex === 0 ? 0.5 : 1}
        >
          {prevButtonElement}
        </View>
        <View
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          right={navigationPosition === 'inside' ? '10px' : '-40px'}
          onClick={nextSlide}
          cursor={
            !infinite && activeIndex === slides.length - 1
              ? 'not-allowed'
              : 'pointer'
          }
          opacity={!infinite && activeIndex === slides.length - 1 ? 0.5 : 1}
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
        left="0"
        right="0"
        justifyContent="center"
        {...(indicatorPosition === 'top'
          ? { top: '10px' }
          : { bottom: '10px' })}
        {...views?.indicators}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            onClick={() => goToSlide(index)}
            cursor="pointer"
            {...IndicatorStyles[indicatorVariant]}
            {...(index === activeIndex
              ? { ...ActiveIndicatorStyles[indicatorVariant] }
              : {})}
            {...views?.indicator}
            {...(index === activeIndex ? views?.activeIndicator : {})}
          >
            {indicatorVariant === 'number' && index + 1}
          </View>
        ))}
      </Horizontal>
    );
  };

  // Check if children are using the compound component pattern
  const hasCompoundComponents = useMemo(() => {
    return React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === CarouselContentComponent ||
          child.type === CarouselItemComponent ||
          child.type === CarouselPreviousComponent ||
          child.type === CarouselNextComponent)
    );
  }, [children]);

  // If using compound components, render with context provider
  if (hasCompoundComponents) {
    return (
      <CarouselContext.Provider
        value={{
          currentIndex: activeIndex,
          totalSlides,
          goToSlide,
          goToNext: nextSlide,
          goToPrevious: prevSlide,
          canGoNext: carouselState.canGoNext,
          canGoPrevious: carouselState.canGoPrevious,
          registerSlide: carouselState.registerSlide,
          unregisterSlide: carouselState.unregisterSlide,
          styles: {
            ...getDefaultCarouselStyles(),
            ...views,
          },
          contentId: carouselState.contentId,
          infinite,
        }}
      >
        <View
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel"
          position="relative"
          width="100%"
          height="100%"
          overflow="hidden"
          {...views?.container}
          {...props}
        >
          {children}
        </View>
      </CarouselContext.Provider>
    );
  }

  // Legacy rendering
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
