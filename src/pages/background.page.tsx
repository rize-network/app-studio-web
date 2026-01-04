import React from 'react';
import { Vertical, Horizontal, View } from 'app-studio';
import { Background } from '../components/Background/Background';
import { Text } from 'app-studio';

const BackgroundTestPage = () => {
  return (
    <Vertical gap={32} padding={32}>
      <Text fontSize={24} fontWeight="600">
        Background Component Test
      </Text>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Aurora Background
        </Text>
        <Background.Aurora height={300} width={300} showRadialGradient={true}>
          <Text color="white" fontSize={20} fontWeight="600">
            Aurora Effect Background
          </Text>
        </Background.Aurora>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Meteors Effect
        </Text>
        <Background.Meteors number={15} height={300} width={300} />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Wall Effect
        </Text>
        <Background.Wall
          rows={15}
          cols={10}
          squareSize={40}
          height={300}
          width={300}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Custom Wall Variations
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          <Background.Wall
            rows={8}
            cols={6}
            squareSize={30}
            height={200}
            width={250}
          />
          <Background.Wall
            rows={12}
            cols={8}
            squareSize={25}
            height={200}
            width={250}
          />
        </Horizontal>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Particles Effect
        </Text>
        <Background.Particles
          count={50}
          speed="medium"
          shapes={['circle', 'square', 'triangle']}
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Grid Effect
        </Text>
        <Background.Grid
          gridSize={30}
          animationSpeed="medium"
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Ripples Effect
        </Text>
        <Background.Ripples
          rippleCount={5}
          maxSize={200}
          frequency={3}
          height={300}
          width={400}
        />
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Image
        </Text>
        <Background.Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          height={300}
          width={400}
          backgroundSize="cover"
          overlay={<Background.Overlay />}
          blendMode="multiply"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Image Background with Overlay
          </Text>
        </Background.Image>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Video
        </Text>
        <Background.Video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          height={300}
          width={400}
          overlay={<Background.Overlay />}
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Video Background
          </Text>
        </Background.Video>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Gradient
        </Text>
        <Background.Gradient
          from="color.blue.500"
          to="color.purple.500"
          height={300}
          width={400}
          animate={true}
          animationDuration={4}
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Animated Gradient Background
          </Text>
        </Background.Gradient>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Multi-color Radial Gradient
        </Text>
        <Background.Gradient
          type="radial"
          colors={[
            { color: 'color.red.500', position: '0%' },
            { color: 'color.orange.500', position: '50%' },
            { color: 'color.yellow.500', position: '100%' },
          ]}
          height={300}
          width={400}
          shape="ellipse"
          position="top-left"
        >
          <Text color="white" fontSize={20} fontWeight="600">
            Radial Multi-color Gradient
          </Text>
        </Background.Gradient>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Overlay Effects (Hero Example)
        </Text>

        {/* Full width example to better demonstrate gradients */}
        <Background.Image
          src="https://images.unsplash.com/photo-1519681393798-3828d50229fa?w=1200&h=600&fit=crop"
          height={400}
          width="100%"
          backgroundSize="cover"
          overlay={<Background.Overlay contentPosition="left" />}
        >
          {/* Overlay sits behind content but over image. Background.Image wraps children in a relative content div. 
              Since Background.Overlay is absolute top=0 left=0, it will cover the content div. 
              We ensure content div is full size by default or let it be. 
              However, if we want Overlay to cover the IMAGE, not just content, it should be part of the image container.
              Currently Background.Image doesn't support injecting siblings to image easily aside from 'overlay' prop.
              
              BUT, if we place Background.Overlay as a child, it is in the Content View.
              If Content View is smaller than Image, Overlay is smaller.
              To fix this visual "bug", we will use a custom composition for the advanced overlay here.
           */}

          {/* Actually, let's use the Background.Overlay as intended inside a relative container, 
               and show a "Manual Composition" which is often safer for complex layering. */}

          <Vertical
            width="100%"
            height="100%"
            justifyContent="center"
            padding={48}
            style={{ position: 'relative', zIndex: 2 }} // Ensure text is above overlay
          >
            <Text color="white" fontSize={48} fontWeight="700">
              Hero Title
            </Text>
            <Text
              color="rgba(255,255,255,0.9)"
              fontSize={20}
              marginTop={16}
              maxWidth={600}
            >
              This demonstrates the Left content position overlay. Notice how
              the text is readable against the dark gradient on the left, while
              the image shines through on the right.
            </Text>
          </Vertical>
        </Background.Image>

        {/* Comparison grid */}
        <Horizontal gap={16} flexWrap="wrap" width="100%">
          <Background.Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            height={250}
            width={400}
            backgroundSize="cover"
            overlay={<Background.Overlay contentPosition="center" />}
          >
            <Vertical
              justifyContent="center"
              height="100%"
              padding={24}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Text
                color="white"
                fontSize={24}
                fontWeight="600"
                textAlign="center"
              >
                Center
              </Text>
            </Vertical>
          </Background.Image>

          <Background.Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            height={250}
            width={400}
            backgroundSize="cover"
            overlay={<Background.Overlay contentPosition="top" />}
          >
            <Vertical
              justifyContent="flex-start"
              height="100%"
              padding={24}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Text
                color="white"
                fontSize={24}
                fontWeight="600"
                textAlign="center"
              >
                Top
              </Text>
            </Vertical>
          </Background.Image>

          <Background.Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            height={250}
            width={400}
            backgroundSize="cover"
            overlay={<Background.Overlay contentPosition="bottom" />}
          >
            <Vertical
              justifyContent="flex-end"
              height="100%"
              padding={24}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Text
                color="white"
                fontSize={24}
                fontWeight="600"
                textAlign="center"
              >
                Bottom
              </Text>
            </Vertical>
          </Background.Image>

          <Background.Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            height={250}
            width={400}
            backgroundSize="cover"
            overlay={<Background.Overlay contentPosition="right" />}
          >
            <Vertical
              justifyContent="center"
              alignItems="flex-end"
              height="100%"
              padding={24}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Text
                color="white"
                fontSize={24}
                fontWeight="600"
                textAlign="right"
              >
                Right
              </Text>
            </Vertical>
          </Background.Image>

          <Background.Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            height={250}
            width={400}
            backgroundSize="cover"
            overlay={<Background.Overlay contentPosition="left" />}
          >
            <Vertical
              justifyContent="center"
              alignItems="flex-start"
              height="100%"
              padding={24}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Text
                color="white"
                fontSize={24}
                fontWeight="600"
                textAlign="left"
              >
                Left
              </Text>
            </Vertical>
          </Background.Image>
        </Horizontal>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Mixed Effects Showcase
        </Text>
        <Horizontal gap={16} flexWrap="wrap">
          <Background.Particles
            count={30}
            speed="fast"
            shapes={['circle']}
            height={200}
            width={250}
          />
          <Background.Grid
            gridSize={20}
            animationSpeed="fast"
            height={200}
            width={250}
          />
          <Background.Ripples
            rippleCount={3}
            maxSize={100}
            frequency={2}
            height={200}
            width={250}
          />
        </Horizontal>
      </Vertical>

      <Vertical gap={24}>
        <Text fontSize={18} fontWeight="500">
          Background Layout
        </Text>
        <Background.Layout>
          <Vertical alignItems="center" gap={16} paddingTop={20}>
            <Text
              fontSize={32}
              fontWeight="700"
              color="#1e293b"
              textAlign="center"
            >
              Background Layout
            </Text>
            <Text
              fontSize={18}
              color="#475569"
              textAlign="center"
              maxWidth={600}
            >
              This component now wraps content with a responsive container, a
              decorative rotated styling element, and supports designProps.
            </Text>
            <Horizontal gap={16} marginTop={32}>
              <View
                backgroundColor="white"
                padding={24}
                borderRadius={12}
                boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              >
                <Text fontWeight="600">Card 1</Text>
              </View>
              <View
                backgroundColor="white"
                padding={24}
                borderRadius={12}
                boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              >
                <Text fontWeight="600">Card 2</Text>
              </View>
            </Horizontal>
          </Vertical>
        </Background.Layout>
      </Vertical>
    </Vertical>
  );
};

export default BackgroundTestPage;
