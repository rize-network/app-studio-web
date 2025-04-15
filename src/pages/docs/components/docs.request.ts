// useChatNavigation.ts

export type Sections = {
  title: string;
  items?: { name: string; link: string }[];
}[];
export const useDocsRequest = () => {
  const sections: Sections = [
    { title: 'overview' },
    { title: 'theme' },
    { title: 'typography' },
    { title: 'responsive' },
    {
      title: 'components',
      items: [
        { name: 'Button', link: 'button' },
        { name: 'Input', link: 'input' },
      ],
    },
  ];

  return { sections };
};
