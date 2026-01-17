import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import { Title } from 'src/components/Title';
import { Separator } from 'src/components';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Vertical gap={24} marginBottom={48}>
    <Text as="h2" fontSize={28} fontWeight={600} color="color-gray-900">
      {title}
    </Text>
    <Separator color="color-gray-200" />
    <Vertical gap={24} paddingLeft={16}>
      {children}
    </Vertical>
  </Vertical>
);

const UsageLabel = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize={14} color="color-gray-500" marginBottom={8}>
    {children}
  </Text>
);

const TitlePage = () => {
  return (
    <View
      padding={48}
      paddingBottom={100}
      overflow="auto"
      height="100vh"
      backgroundColor="color-white"
    >
      <Title size="xl" marginBottom={48}>
        Title Component Showcase
      </Title>

      {/* 1. Basic Sizes */}
      <Section title="1. Sizes">
        <View>
          <UsageLabel>Size: xs</UsageLabel>
          <Title size="xs">Extra Small (xs)</Title>
        </View>
        <View>
          <UsageLabel>Size: sm</UsageLabel>
          <Title size="sm">Small (sm)</Title>
        </View>
        <View>
          <UsageLabel>Size: md</UsageLabel>
          <Title size="md">Medium (md)</Title>
        </View>
        <View>
          <UsageLabel>Size: lg</UsageLabel>
          <Title size="lg">Large (lg)</Title>
        </View>
        <View>
          <UsageLabel>Size: xl</UsageLabel>
          <Title size="xl">Extra Large (xl)</Title>
        </View>
      </Section>

      {/* 2. Highlight Styles */}
      <Section title="2. Highlight Styles (Targeted)">
        <View>
          <UsageLabel>Style: solid (Default)</UsageLabel>
          <Title
            highlightText="Solid"
            highlightStyle="solid"
            highlightColor="color-indigo-500"
          >
            This has a Solid highlight.
          </Title>
        </View>

        <View>
          <UsageLabel>Style: background</UsageLabel>
          <Title
            highlightText="Background"
            highlightStyle="background"
            highlightColor="color-blue-500"
          >
            This has a Background highlight.
          </Title>
        </View>

        <View>
          <UsageLabel>Style: gradient</UsageLabel>
          <Title
            highlightText="Gradient"
            highlightStyle="gradient"
            highlightColor="color-pink-500"
            highlightSecondaryColor="color-purple-600"
          >
            This has a Gradient highlight.
          </Title>
        </View>

        <View>
          <UsageLabel>Style: underline</UsageLabel>
          <Title
            highlightText="Underline"
            highlightStyle="underline"
            highlightColor="color-blue-500"
          >
            This has an Underline highlight.
          </Title>
        </View>

        <View>
          <UsageLabel>Style: outline</UsageLabel>
          <Title
            highlightText="Outline"
            highlightStyle="outline"
            highlightColor="color-blue-500"
          >
            This has an Outline highlight.
          </Title>
        </View>

        <View>
          <UsageLabel>Style: glow</UsageLabel>
          <Title
            highlightText="Glow"
            highlightStyle="glow"
            highlightColor="color-green-500"
          >
            This has a Glow highlight.
          </Title>
        </View>
      </Section>

      {/* 3. Solid Highlight with Effects */}
      <Section title="3. Solid Highlight with Effects">
        <View>
          <UsageLabel>Solid + Typewriter</UsageLabel>
          <Title
            highlightText="Typewriter"
            highlightStyle="solid"
            highlightColor="color-indigo-500"
            highlightTypewriter={true}
            highlightTypewriterDuration={2000}
          >
            Solid Typewriter Effect
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>Solid + Slide</UsageLabel>
          <Title
            highlightText="Sliding"
            highlightStyle="solid"
            highlightColor="color-indigo-500"
            highlightSlide={true}
            highlightSlideDuration={500}
          >
            Solid Sliding Effect
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>Solid + Alternating + Typewriter</UsageLabel>
          <Title
            highlightText="Building"
            alternateHighlightText={['Designing', 'Scaling', 'Launching']}
            alternateAnimation={true}
            highlightStyle="solid"
            highlightColor="color-indigo-500"
            highlightTypewriter={true}
            highlightTypewriterDuration={1500}
            alternateDuration={2000}
          >
            We are Building the future.
          </Title>
        </View>
      </Section>

      {/* 4. Full Title Highlights */}
      <Section title="4. Full Title Highlights">
        <View>
          <UsageLabel>Full Background</UsageLabel>
          <Title highlightStyle="background" highlightColor="theme-primary">
            Full Background Highlight
          </Title>
        </View>

        <View>
          <UsageLabel>Full Gradient</UsageLabel>
          <Title
            highlightStyle="gradient"
            highlightColor="theme-primary"
            highlightSecondaryColor="theme-secondary"
          >
            Full Gradient Highlight
          </Title>
        </View>

        <View>
          <UsageLabel>Full Outline</UsageLabel>
          <Title highlightStyle="outline" highlightColor="theme-primary">
            Full Outline Highlight
          </Title>
        </View>
      </Section>

      {/* 5. Animations */}
      <Section title="5. Animations">
        <View>
          <UsageLabel>Typewriter Effect</UsageLabel>
          <Title
            highlightText="typewriter"
            highlightTypewriter={true}
            highlightTypewriterDuration={2000}
            highlightStyle="background"
            highlightColor="theme-primary"
          >
            Here is a typewriter effect.
          </Title>
        </View>

        <View>
          <UsageLabel>Slide Effect</UsageLabel>
          <Title
            highlightText="sliding in"
            highlightSlide={true}
            highlightSlideDuration={800}
            highlightStyle="background"
            highlightColor="theme-primary"
          >
            Here is text sliding in nicely.
          </Title>
        </View>
      </Section>

      {/* 6. Alternating Text */}
      <Section title="6. Alternating Text">
        <View>
          <UsageLabel>Alternating with Slide Effect</UsageLabel>
          <Title
            highlightText="Amazing"
            alternateHighlightText={['Incredible', 'Fantastic', 'Awesome']}
            alternateAnimation={true}
            highlightStyle="gradient"
            highlightColor="theme-primary"
            highlightSecondaryColor="theme-secondary"
            highlightSlide={true}
          >
            We build Amazing products.
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>Alternating with Typewriter</UsageLabel>
          <Title
            highlightText="Design"
            alternateHighlightText={['Code', 'Build', 'Ship']}
            alternateAnimation={true}
            highlightStyle="background"
            highlightColor="theme-primary"
            highlightTypewriter={true}
            highlightTypewriterDuration={1500}
            alternateDuration={2000}
          >
            We love to Design.
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>Alternating without Animation (Instant)</UsageLabel>
          <Title
            highlightText="Fast"
            alternateHighlightText={['Quick', 'Rapid', 'Instant']}
            alternateAnimation={true}
            highlightStyle="outline"
            highlightColor="theme-primary"
            alternateDuration={1500}
          >
            It is Fast and efficient.
          </Title>
        </View>
      </Section>

      {/* 7. Debug Case */}
      <Section title="7. Debug Case">
        <View>
          <UsageLabel>User Reported Issue</UsageLabel>
          <Title
            highlightText="Fast"
            alternateHighlightText={['Quick', 'Rapid', 'Instant']}
            alternateAnimation={true}
            highlightStyle="outline"
            highlightColor="theme-primary"
            alternateDuration={1500}
          >
            It is Fast and efficient.
          </Title>
        </View>
      </Section>

      {/* 9. Multi-line Strings */}
      <Section title="9. Multi-line Strings">
        <View>
          <UsageLabel>Using Pipe (|) for Line Breaks</UsageLabel>
          <Title
            size="lg"
            highlightStyle="gradient"
            highlightColor="theme-primary"
            highlightSecondaryColor="theme-secondary"
          >
            First Line | Second Line | Third Line
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>With Highlighted Text</UsageLabel>
          <Title
            highlightText="Line"
            highlightStyle="background"
            highlightColor="color-orange-500"
          >
            First Line | Second Line
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>With Typewriter Animation (Partial)</UsageLabel>
          <Title
            highlightTypewriter={true}
            highlightTypewriterDuration={2000}
            highlightText="Second Line"
            highlightStyle="gradient"
            highlightColor="theme-primary"
            highlightSecondaryColor="theme-secondary"
          >
            First Line | Second Line
          </Title>
        </View>

        <View marginTop={24}>
          <UsageLabel>With Slide Animation (Partial)</UsageLabel>
          <Title
            highlightSlide={true}
            highlightSlideDuration={500}
            highlightText="Second Line"
            highlightStyle="background"
            highlightColor="color-blue-500"
          >
            First Line | Second Line
          </Title>
        </View>
      </Section>
    </View>
  );
};

export default TitlePage;
