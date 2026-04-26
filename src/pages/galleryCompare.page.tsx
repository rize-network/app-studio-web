import React from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';

const FramePanel = ({ title, src }: { title: string; src: string }) => (
  <Vertical gap={12} style={{ flex: '1 1 560px', minWidth: 0 }}>
    <Text fontSize={13} lineHeight="18px" fontWeight="700" color="#111827">
      {title}
    </Text>

    <View
      backgroundColor="color-white"
      border="1px solid #E5E7EB"
      borderRadius="18px"
      overflow="hidden"
      height="calc(100vh - 190px)"
      minHeight="720px"
    >
      <iframe
        title={title}
        src={src}
        allow="microphone"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          background: '#FFFFFF',
        }}
      />
    </View>
  </Vertical>
);

export const GalleryComparePage = () => (
  <View backgroundColor="#FAFAFA" minHeight="100vh" padding="24px">
    <Vertical gap={20}>
      <Vertical gap={8}>
        <Text
          fontSize={28}
          lineHeight="32px"
          fontWeight="800"
          letterSpacing="-0.03em"
          color="#0F172A"
        >
          Gallery Compare
        </Text>
        <Text fontSize={14} lineHeight="20px" color="#4B5563" maxWidth="900px">
          Left is the static reference from `gallery.html`. Right is the live
          mirrored inventory page using the same gallery card list, with inline
          previews for key components and direct links to each shipped component
          page.
        </Text>
      </Vertical>

      <Horizontal gap={20} alignItems="stretch" flexWrap="wrap">
        <FramePanel
          title="Reference Gallery"
          src="/gallery.html?view=compare"
        />
        <FramePanel
          title="Live Library Mirror"
          src="/gallery-live?view=compare"
        />
      </Horizontal>
    </Vertical>
  </View>
);

export default GalleryComparePage;
