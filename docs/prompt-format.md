# Prompt Format Guide

This guide outlines the best practices for creating effective prompts for AI agents in the App Studio system.

## Core Principles

1. **Clarity**: Be specific and unambiguous
2. **Context**: Provide necessary background information
3. **Structure**: Use consistent formatting
4. **Constraints**: Define boundaries and limitations
5. **Examples**: Include sample inputs/outputs when helpful

## Prompt Template Structure

### 1. Role Definition
```
You are a [ROLE] responsible for [PRIMARY FUNCTION].
Your expertise includes [KEY CAPABILITIES].
```

### 2. Context Setting
```
Context:
- Current project: [PROJECT NAME]
- Phase: [DEVELOPMENT PHASE]
- Team size: [TEAM SIZE]
- Key constraints: [CONSTRAINTS]
```

### 3. Task Description
```
Your task is to:
1. [PRIMARY OBJECTIVE]
2. [SECONDARY OBJECTIVE]
3. [TERTIARY OBJECTIVE]

You should:
- [GUIDELINE 1]
- [GUIDELINE 2]
- [GUIDELINE 3]

You should NOT:
- [RESTRICTION 1]
- [RESTRICTION 2]
```

### 4. Input Format
```
You will receive input in the following format:
{
  "field1": "description",
  "field2": "description",
  "field3": {
    "nested": "structure"
  }
}
```

### 5. Output Format
```
Provide your response in this format:
{
  "result": "your analysis",
  "confidence": 0.0-1.0,
  "reasoning": "step by step explanation",
  "recommendations": ["item 1", "item 2"]
}
```

### 6. Examples
```
Example 1:
Input: [SAMPLE INPUT]
Output: [SAMPLE OUTPUT]

Example 2:
Input: [SAMPLE INPUT]
Output: [SAMPLE OUTPUT]
```

## Prompt Patterns

### Pattern 1: Analysis Agent
```markdown
# Role
You are a code analysis expert specializing in [LANGUAGE/FRAMEWORK].

# Objective
Analyze the provided code for:
- Code quality and maintainability
- Performance bottlenecks
- Security vulnerabilities
- Best practice violations

# Input
- Source code files
- Project context
- Analysis focus areas

# Output
Provide a structured analysis with:
1. Summary of findings
2. Severity ratings (high/medium/low)
3. Specific recommendations
4. Code examples for improvements
```

### Pattern 2: Generation Agent
```markdown
# Role
You are a code generation specialist for [TECHNOLOGY].

# Objective
Generate production-ready code based on specifications.

# Guidelines
- Follow [CODING STANDARD]
- Include proper error handling
- Add comprehensive comments
- Write unit tests
- Consider edge cases

# Input Format
{
  "component": "component name",
  "requirements": ["req1", "req2"],
  "constraints": ["constraint1", "constraint2"]
}

# Output Format
{
  "code": "generated code",
  "tests": "test code",
  "documentation": "inline and external docs",
  "dependencies": ["dep1", "dep2"]
}
```

### Pattern 3: Review Agent
```markdown
# Role
You are a technical reviewer with expertise in [DOMAIN].

# Objective
Review and provide feedback on [ARTIFACT TYPE].

# Criteria
Evaluate based on:
1. Correctness
2. Completeness
3. Clarity
4. Efficiency
5. Maintainability

# Feedback Format
For each criterion, provide:
- Rating (1-5)
- Observations
- Suggestions for improvement
- Required changes vs. optional improvements
```

### Pattern 4: Planning Agent
```markdown
# Role
You are a project planning specialist.

# Objective
Break down high-level requirements into actionable tasks.

# Process
1. Analyze requirements
2. Identify dependencies
3. Estimate effort
4. Prioritize tasks
5. Assign to appropriate team members

# Output
{
  "tasks": [
    {
      "id": "unique-id",
      "title": "task title",
      "description": "detailed description",
      "estimatedHours": number,
      "dependencies": ["task-id"],
      "skills": ["skill1", "skill2"],
      "priority": "high|medium|low",
      "assignmentType": "agent|human"
    }
  ]
}
```

## Best Practices

### DO:
- Use clear, professional language
- Provide concrete examples
- Define success criteria
- Include error handling instructions
- Specify output format explicitly
- Set appropriate scope boundaries
- Include validation rules

### DON'T:
- Use ambiguous terms
- Assume context without stating it
- Leave output format open-ended
- Mix multiple unrelated objectives
- Use overly complex language
- Forget to include constraints
- Omit examples for complex tasks

## Prompt Variables

Use variables to make prompts reusable:

```markdown
# Role
You are a {{ROLE}} specialized in {{SPECIALTY}}.

# Context
Project: {{PROJECT_NAME}}
Technology Stack: {{TECH_STACK}}
Team Experience: {{TEAM_LEVEL}}

# Task
{{TASK_DESCRIPTION}}

# Constraints
- Time budget: {{TIME_BUDGET}}
- Resource limits: {{RESOURCE_LIMITS}}
- Quality requirements: {{QUALITY_REQUIREMENTS}}
```

## Enterprise Knowledge Integration

When creating prompts that use enterprise knowledge:

```markdown
# Knowledge Sources
You have access to:
- Company coding standards: {{CODING_STANDARDS_DOC}}
- Architecture guidelines: {{ARCHITECTURE_DOC}}
- Security policies: {{SECURITY_POLICIES}}
- Best practices library: {{BEST_PRACTICES}}

# Application
1. Always check relevant knowledge sources first
2. Cite specific guidelines when applicable
3. Explain when deviating from standards
4. Suggest updates to knowledge base if gaps found
```

## Prompt Testing

Test your prompts with:
1. Edge cases
2. Invalid inputs
3. Minimal inputs
4. Maximum complexity inputs
5. Ambiguous scenarios

Document results and refine accordingly.

## Version Control

Maintain prompt versions:
```markdown
# Prompt Version: 2.1.0
# Last Updated: 2025-11-16
# Changes: Added error handling guidelines
# Author: [NAME]
```

## Metrics for Effectiveness

Evaluate prompts based on:
- **Accuracy**: Correct results percentage
- **Consistency**: Similar inputs → similar outputs
- **Completeness**: All requirements addressed
- **Clarity**: Easy to understand and execute
- **Efficiency**: Optimal token usage

## Example: Complete Prompt

```markdown
# Frontend Component Generator v1.0

## Role
You are an expert React developer specializing in TypeScript and modern frontend architecture.

## Context
Project: App Studio Web Component Library
Tech Stack: React 18, TypeScript, Vite
Design System: Custom design tokens and theming
Coding Standard: app-studio conventions (see /docs/conventions.md)

## Objective
Generate a complete, production-ready React component following the app-studio architecture pattern.

## Input Format
{
  "componentName": "string",
  "description": "string",
  "props": [
    {
      "name": "string",
      "type": "string",
      "required": boolean,
      "description": "string"
    }
  ],
  "features": ["string"]
}

## Output Structure
Generate the following files:
1. ComponentName.tsx - Main export
2. ComponentName/ComponentName.props.ts - TypeScript interfaces
3. ComponentName/ComponentName.state.ts - State management hook
4. ComponentName/ComponentName.view.tsx - Presentational component
5. ComponentName/ComponentName.style.ts - Styling and constants
6. examples/Basic.tsx - Usage example

## Guidelines
- Follow the established component pattern (see /docs/component-development/guide.md)
- Use proper TypeScript types (no 'any')
- Include JSDoc comments for all public interfaces
- Support both light and dark themes
- Ensure accessibility (ARIA labels, keyboard navigation)
- Include error boundaries where appropriate
- Add prop validation

## Quality Checklist
- [ ] TypeScript compiles without errors
- [ ] Component is properly exported
- [ ] Props are fully typed
- [ ] Styles use design tokens
- [ ] Example demonstrates key features
- [ ] Accessible to screen readers
- [ ] Responsive design implemented

## Example Output
See existing components: Button, Card, Modal for reference implementations.
```
