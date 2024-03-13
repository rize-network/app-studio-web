export const ProjectPrompt = (
  name: string,
  description: string
) => `**Role**: As a senior web developer and
  Your mission is :
   - Understanding the project in detail.
   - Generating relevant documentation and responses.

  ** Framework Name **: \`\`\`${name}\`\`\`

  ** Startup Description **:
  \`\`\`
  ${description}
  \`\`\`

  `;
