import React from 'react';
import { Vertical, View } from 'app-studio';
import { Title } from '../components/Title/Title';

/**
 * Demo page showcasing the responsive Title component functionality
 */
export const ResponsiveTitleDemoPage = () => {
  return (
    <View padding={32} maxWidth={1200} marginX="auto">
      <Vertical gap={48}>
        <Title size="xl" centered>
          Responsive Title Component Demo
        </Title>

        <Vertical gap={32}>
          <Title
            size="lg"
            highlightText="Responsive"
            highlightStyle="background"
          >
            Responsive Titles
          </Title>

          <Vertical gap={24}>
            <Title
              size="xl"
              responsive={true}
              highlightText="XL"
              highlightStyle="gradient"
              highlightColor="theme.primary"
              highlightSecondaryColor="theme.secondary"
            >
              XL Responsive Title (H1 Scale)
            </Title>

            <Title
              size="lg"
              responsive={true}
              highlightText="LG"
              highlightStyle="background"
              highlightColor="theme.primary"
            >
              LG Responsive Title (H2 Scale)
            </Title>

            <Title
              size="md"
              responsive={true}
              highlightText="MD"
              highlightStyle="underline"
              highlightColor="theme.accent"
            >
              MD Responsive Title (H3 Scale)
            </Title>

            <Title
              size="sm"
              responsive={true}
              highlightText="SM"
              highlightStyle="glow"
              highlightColor="theme.primary"
            >
              SM Responsive Title (T1 Scale)
            </Title>

            <Title
              size="xs"
              responsive={true}
              highlightText="XS"
              highlightStyle="outline"
              highlightColor="theme.secondary"
            >
              XS Responsive Title (S1 Scale)
            </Title>
          </Vertical>
        </Vertical>

        <Vertical gap={32}>
          <Title size="lg" highlightText="Static" highlightStyle="background">
            Static Titles (Non-Responsive)
          </Title>

          <Vertical gap={24}>
            <Title
              size="xl"
              highlightText="Static"
              highlightStyle="background"
              highlightColor="theme.warning"
            >
              XL Static Title
            </Title>

            <Title
              size="lg"
              highlightText="Static"
              highlightStyle="background"
              highlightColor="theme.warning"
            >
              LG Static Title
            </Title>

            <Title
              size="md"
              highlightText="Static"
              highlightStyle="background"
              highlightColor="theme.warning"
            >
              MD Static Title
            </Title>

            <Title
              size="sm"
              highlightText="Static"
              highlightStyle="background"
              highlightColor="theme.warning"
            >
              SM Static Title
            </Title>

            <Title
              size="xs"
              highlightText="Static"
              highlightStyle="background"
              highlightColor="theme.warning"
            >
              XS Static Title
            </Title>
          </Vertical>
        </Vertical>

        <Vertical gap={32}>
          <Title size="lg" highlightText="Manual" highlightStyle="background">
            Manual Media Queries
          </Title>

          <Title
            media={{
              mobile: {
                fontSize: 24,
                lineHeight: '32px',
              },
              tablet: {
                fontSize: 36,
                lineHeight: '44px',
              },
              desktop: {
                fontSize: 48,
                lineHeight: '56px',
              },
            }}
            highlightText="Custom"
            highlightStyle="gradient"
            highlightColor="theme.primary"
            highlightSecondaryColor="theme.accent"
          >
            Custom Responsive Title with Manual Media Queries
          </Title>
        </Vertical>

        <Vertical gap={32}>
          <Title
            size="lg"
            highlightText="Animation"
            highlightStyle="background"
          >
            Animation Loop Control
          </Title>

          <Vertical gap={24}>
            <Title
              size="md"
              animate={{
                from: { opacity: 0, transform: 'translateY(-20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
                duration: '1s',
              }}
              animationLoop={1}
              highlightText="Once"
              highlightStyle="background"
              highlightColor="theme.primary"
            >
              Animation Plays Once (Default)
            </Title>

            <Title
              size="md"
              animate={{
                from: { transform: 'scale(0.8)' },
                to: { transform: 'scale(1)' },
                duration: '0.8s',
              }}
              animationLoop={3}
              highlightText="Three"
              highlightStyle="gradient"
              highlightColor="theme.primary"
              highlightSecondaryColor="theme.secondary"
            >
              Animation Plays Three Times
            </Title>

            <Title
              size="md"
              animate={{
                from: { transform: 'translateX(-10px)' },
                to: { transform: 'translateX(10px)' },
                duration: '2s',
                direction: 'alternate',
              }}
              animationLoop="infinite"
              highlightText="Infinite"
              highlightStyle="glow"
              highlightColor="theme.accent"
            >
              Animation Loops Infinitely
            </Title>

            <Title
              size="md"
              highlightAnimate={{
                from: { transform: 'rotate(-5deg)' },
                to: { transform: 'rotate(5deg)' },
                duration: '1s',
                direction: 'alternate',
              }}
              highlightAnimationLoop="infinite"
              highlightText="Wiggling"
              highlightStyle="outline"
              highlightColor="theme.warning"
            >
              Title with Wiggling Highlight
            </Title>
          </Vertical>
        </Vertical>

        <View
          backgroundColor="color.gray.50"
          padding={24}
          borderRadius={8}
          marginTop={32}
        >
          <Vertical gap={16}>
            <Title
              size="md"
              highlightText="Instructions"
              highlightStyle="background"
            >
              How to Test Responsiveness
            </Title>
            <View fontSize={16} lineHeight="24px" color="color.gray.700">
              <p>To see the responsive behavior and animations in action:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                <li>Resize your browser window to different widths</li>
                <li>
                  Use browser dev tools to simulate mobile/tablet/desktop
                  viewports
                </li>
                <li>Compare responsive titles vs static titles</li>
                <li>
                  Notice how responsive titles adapt their font size
                  automatically
                </li>
                <li>
                  Observe the different animation loop behaviors (once, multiple
                  times, infinite)
                </li>
                <li>
                  Watch how highlight animations can have independent loop
                  controls
                </li>
              </ul>
            </View>
          </Vertical>
        </View>
      </Vertical>
    </View>
  );
};

export default ResponsiveTitleDemoPage;
