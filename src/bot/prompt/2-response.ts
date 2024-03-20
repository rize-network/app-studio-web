export const RespondPrompt = () => `
Analyse the props and type files and return the following information as follows:

**PropsName**: Will be obtained in the props file. Note all props in the props file should be return in the json file.
Other required informations will be collected in the type.ts and view.tsx files provided.
Ensure that the exact values are set for the type values and default values.

Json Format:
{
  propsName:{
    type:[props type],
    typeValues:[Provided in the props file or type file],
    description:[component found in the props file for each props]
    defaultValue:[default value in any in the view.file]
  }
}
`;
