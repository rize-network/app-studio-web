import { View, Horizontal, Vertical, Link, FileSVG } from 'src/components';
import { Sections } from './docs.request';
import { ReactComponent as DownArrow } from 'src/assets/svg/down_arrow.svg';
import { ReactComponent as RightArrow } from 'src/assets/svg/chevron_right.svg';
import Svg from 'src/assets/svg';
import { SVGIcon } from 'src/components';

const upperFirst = (title) => title.charAt(0).toUpperCase() + title.slice(1);
const isSectionSelected = (selected, section) =>
  selected?.section === section.title;

const isItemSelected = (selected, section, link) =>
  selected?.section === section.title && selected?.id === link;

export const Menu = ({
  sections = [],
  selected,
}: {
  selected?: { section?: string; id?: string };
  sections?: Sections;
}) => (
  <Vertical>
    {sections.map((section) => {
      const sectionSelected = isSectionSelected(selected, section);
      return (
        <Vertical key={section.title}>
          <Link href={`/docs/${section.title}`}>
            <Horizontal paddingVertical={10} alignItems={'center'}>
              <SVGIcon
                name={'Chevron_rightSvg'}
                size={20}
                marginRight={5}
                transform={sectionSelected ? 'rotate(90deg)' : 'rotate(0deg)'}
              />
              <C2 color={sectionSelected ? 'black' : 'black'}>
                {upperFirst(section.title)}
              </C2>
            </Horizontal>
          </Link>
          {section.items &&
            section.items.map((item) => {
              const selectedItem = isItemSelected(selected, section, item.link);
              return (
                <View
                  backgroundColor={
                    selectedItem ? 'color.gray.100' : 'transparent'
                  }
                  key={item.link}
                  borderLeft={'1px solid'}
                  marginLeft={10}
                  paddingVertical={5}
                  paddingLeft={20}
                >
                  <Link href={`/docs/${section.title}/${item.link}`}>
                    <C2 padding={5} color={selectedItem ? 'black' : 'grey'}>
                      {upperFirst(item.name)}
                    </C2>
                  </Link>
                </View>
              );
            })}
        </Vertical>
      );
    })}
  </Vertical>
);

export const Apps = (props) => (
  <Horizontal
    width="100vw"
    height={330}
    position="relative"
    marginVertical={150}
  >
    <Blue />
    <Grey />
    <Black />
    <Green />
    <RightGrey />
    <RightBlue />
    <Purple />
    <White />
  </Horizontal>
);

export const HeaderDocs = ({
  title = 'Title',
  description = 'The only component library that lets you choose the JS/CSS framework',
}) => (
  <View
    backgroundColor="color.grey.200"
    paddingVertical={60}
    paddingHorizontal={20}
  >
    <H1>{title}</H1>
    <C2>{description}</C2>
  </View>
);

export const Card = (props) => (
  <View
    overflow="hidden"
    position="absolute"
    backgroundRepeat="no-repeat"
    backgroundSize="contain"
    backgroundPosition="center"
    borderRadius="10px"
    {...props}
  />
);

export const Black = (props) => (
  <Card
    width="30vw"
    height="30vh"
    background="rgb(0, 0, 0)"
    left="26vw"
    top="0px"
    {...props}
  />
);

export const Grey = (props) => (
  <Card
    width="20vw"
    height="20vh"
    background="linear-gradient(-90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"
    left="20vw"
    top="24vh"
    {...props}
  />
);

export const RightGrey = (props) => (
  <Card
    width="20vw"
    height="30vh"
    background="linear-gradient(-90deg, rgba(0, 60, 60, 0.2), rgba(0, 0, 0, 0.2))"
    left="60vw"
    top="5vh"
    {...props}
  />
);

export const Purple = (props) => (
  <Card
    width="26vw"
    height="30vh"
    background="rgb(132, 75, 253)"
    left="44vw"
    top="20vh"
    {...props}
  />
);

export const White = (props) => (
  <Card
    width="24vw"
    height="26vh"
    background="rgb(255, 255, 255)"
    left="45vw"
    top="22vh"
    {...props}
  />
);

export const Green = (props) => (
  <Card
    width="20vw"
    height="50vh"
    background="rgb(151, 227, 151)"
    left="72vw"
    top="0"
    {...props}
  />
);

export const RightBlue = (props) => (
  <Card
    width="15vw"
    height="40vh"
    background="rgb(130, 206, 243)"
    right="0"
    top="10vh"
    {...props}
  />
);

export const Blue = (props) => (
  <Card
    width="25vw"
    height="50vh"
    background="rgb(130, 206, 243)"
    left="0px"
    top="0px"
    {...props}
  />
);
