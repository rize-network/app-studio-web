export const RespondPrompt = (props: string, view: string, type: string) => `
Please analyze the provided files and extract detailed information as specified below:

**Files Content:**
- Props.ts:
\`\`\`
${props}
\`\`\`

- View.ts:
\`\`\`
${view}
\`\`\`

- Type.ts:
\`\`\`
${type}
\`\`\`

**Instructions:**
1. From the Props.ts file, extract all property names and their details.
2. Use the Type.ts and View.ts files to complement the information where necessary, especially for type values, default values, and descriptions.
3. Ensure that the exact values are set for the type values and default values.



**Expected JSON Output Format:**
{
  propsName:{
    type:[props type],
    typeValues:[Provided in the props file or type file],
    description:[component found in the props file for each props]
    defaultValue:[default value in any in the view.file]
  }
}

Return the information in the JSON format shown above. If there is no data available, return an empty object (\`{}\`).
`;
