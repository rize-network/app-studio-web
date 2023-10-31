import React from 'react';
import { Text as TextApp } from 'src/components';
import { View } from 'src/components/Layout/View/View';
import { Size, TextWeights } from 'src/components/Text/Text/Text.type';

export const TextPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <td>Default</td>
            <td>
              <TextApp>Some text here</TextApp>
            </td>
          </tr>
          <tr>
            <td>Strike</td>
            <td>
              <TextApp color="theme.secondary" isStriked>
                Some text here
              </TextApp>
            </td>
          </tr>
          <tr>
            <td>Subscript</td>

            <td>
              <TextApp>
                H<TextApp isSup>2</TextApp>O
              </TextApp>
              <TextApp>
                H<TextApp isSub>2</TextApp>O
              </TextApp>
            </td>
          </tr>
          <tr>
            <td>Truncate</td>
            <td>
              <TextApp isTruncated maxLines={2} size="xl">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </TextApp>
            </td>
          </tr>
          <tr>
            <td>Underline</td>
            <td>
              <TextApp isUnderlined>Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</TextApp>
            </td>
          </tr>
          <tr>
            <td>Italic</td>

            <td>
              <TextApp isItalic>Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</TextApp>
            </td>
          </tr>
          <tr>
            <td>Sizes</td>
            <td>
              <View display="flex" gap={5} flexDirection="column" alignItems="center">
                {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((size, index) => (
                  <TextApp key={index} size={size as Size}>
                    {size}
                  </TextApp>
                ))}
              </View>
            </td>
          </tr>
          <tr>
            <td>Headings</td>
            <td>
              <>
                <TextApp heading="h1">Heading 1</TextApp>
                <TextApp heading="h2">Heading 2</TextApp>
                <TextApp heading="h3">Heading 3</TextApp>
                <TextApp heading="h4">Heading 4</TextApp>
                <TextApp heading="h5">Heading 5</TextApp>
                <TextApp heading="h6">Heading 6</TextApp>
              </>
            </td>
          </tr>
          <tr>
            <td>Weights</td>
            <td>
              <View display="flex" gap={5} flexDirection="column" alignItems="center">
                {['hairline', 'tdin', 'light', 'normal', 'medium', 'semiBold', 'bold', 'extraBold', 'black'].map(
                  (weight, index) => (
                    <TextApp key={index} weight={weight as TextWeights}>
                      {weight}
                    </TextApp>
                  )
                )}
              </View>
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TextPage;
