import React, { useMemo, useEffect, useRef } from 'react';
import { View, Horizontal, Text } from 'app-studio';
import { Button } from '../../Button/Button';
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
  index,
  views,
  ...props
}) => {
  if (!isActive) return null;
  return (
    <View width="100%" height="100%" {...views} {...props}>
      {children}
    </View>
  );
};

export const CarouselPreviousComponent: React.FC<CarouselPreviousProps> = ({
  views,
  children,
  ...props
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
      onClick={() => goToPrevious()}
      isDisabled={!canGoPrevious}
      {...(mergedStyles as any)}
      {...props}
    >
      {children ?? <Text>‹</Text>}
    </Button>
  );
};

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
      onClick={() => goToNext()}
      isDisabled={!canGoNext}
      {...(mergedStyles as any)}
      {...props}
    >
      {children ?? <Text>›</Text>}
    </Button>
  );
};

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
  useEffect(() => {
    const id = registerSlide();
    slideIdRef.current = id;
    return () => {
      if (slideIdRef.current !== null) unregisterSlide(slideIdRef.current);
    };
  }, [registerSlide, unregisterSlide]);
  const defaultStyles = getDefaultCarouselStyles().item;
  const mergedStyles = {
    ...defaultStyles,
    ...globalStyles?.item,
    ...views?.item,
  };
  return (
    <View {...mergedStyles} {...props}>
      {children}
    </View>
  );
};

export const CarouselContentComponent: React.FC<CarouselContentProps> = ({
  children,
  views,
  style,
  ...props
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
  const childArr = React.Children.toArray(children);
  const activeChild = childArr[currentIndex];
  return (
    <View {...mergedContentStyles} {...props}>
      <View {...mergedInnerStyles}>{activeChild}</View>
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
  stepIndices,
  themeMode: elementMode,
  ...props
}) => {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
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
  const { activeIndex, totalSlides, goToSlide, nextSlide, prevSlide } =
    carouselState;
  const renderNavigation = () => {
    if (!showNavigation) return null;
    const prevButtonElement = prevButton || (
      <View {...NavigationButtonStyles} {...views?.prevButton}>
        <Text>‹</Text>
      </View>
    );
    const nextButtonElement = nextButton || (
      <View {...NavigationButtonStyles} {...views?.nextButton}>
        <Text>›</Text>
      </View>
    );
    return (
      <>
        <View
          position="absolute"
          top="50%"
          left={navigationPosition === 'inside' ? 10 : -40}
          onPress={prevSlide}
          onClick={prevSlide}
          opacity={!infinite && activeIndex === 0 ? 0.5 : 1}
        >
          {prevButtonElement}
        </View>
        <View
          position="absolute"
          top="50%"
          right={navigationPosition === 'inside' ? 10 : -40}
          onPress={nextSlide}
          onClick={nextSlide}
          opacity={!infinite && activeIndex === slides.length - 1 ? 0.5 : 1}
        >
          {nextButtonElement}
        </View>
      </>
    );
  };
  const renderIndicators = () => {
    if (!showIndicators) return null;
    return (
      <Horizontal
        position="absolute"
        left={0}
        right={0}
        justifyContent="center"
        {...(indicatorPosition === 'top' ? { top: 10 } : { bottom: 10 })}
        {...views?.indicators}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            onPress={() => goToSlide(index)}
            onClick={() => goToSlide(index)}
            {...IndicatorStyles[indicatorVariant]}
            {...(index === activeIndex
              ? { ...ActiveIndicatorStyles[indicatorVariant] }
              : {})}
            {...views?.indicator}
            {...(index === activeIndex ? views?.activeIndicator : {})}
          >
            {indicatorVariant === 'number' && <Text>{index + 1}</Text>}
          </View>
        ))}
      </Horizontal>
    );
  };
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
          styles: { ...getDefaultCarouselStyles(), ...views },
          contentId: carouselState.contentId,
          infinite,
        }}
      >
        <View
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
  return (
    <View
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
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
