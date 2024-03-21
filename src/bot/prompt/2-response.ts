export const RespondPrompt = (props: string, view: string, type?: string) => `
Please use the provided """Files Content""" as specified below:

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
1. The the key name  """ componentDescription""" has key value "" string"" which is a brief description of the purpose of this component in 100 letters or less , without mentioning the framework, use cases, props, types, or other details.
Just one line to indicate its use for the user. It should never be an object.
2. The other key names for props only will be objects containing the type, typeVa;ues, description and default values.
3. From the Props.ts code, extract all property names and their details.
4. Use the Type.ts and View.ts codes to complement the information where necessary, especially for type values, default values, and descriptions.
5. Ensure that the exact values are set for the type values and default values.

""Note"": Here an example of the componentDescription key name should be  - componentDescription:  """The component ...{description in text of the component}"""

**Expected JSON Output Format:**
\`\`\`json
{
  componentDescription :"",
  [state each propsName here]:{
    type:[props type],
    typeValues:[Provided in the props code or type code],
    description:[component found in the props code for each props]
    defaultValue:[default value in any in the view.ts code]
  }
}
\`\`\`

Return the information in the ""JSON format"" shown above. If there is no data available, return an empty object (\`{}\`).
`;
