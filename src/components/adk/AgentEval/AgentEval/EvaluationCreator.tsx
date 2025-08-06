import React, { useState } from 'react';
import { Select, TextArea, TextField } from '../../../Form/Form';

import { View, Vertical, Horizontal, Text, Button } from 'app-studio';
import {
  EvaluationTemplate,
  EvaluationTestCase,
  EvaluationMetric,
} from './AgentEval.props';
import { DefaultAgentEvalStyles } from './AgentEval.style';

export interface EvaluationCreatorProps {
  templates: EvaluationTemplate[];
  isCreating: boolean;
  canCreate: boolean;
  onCreateEvaluation: (
    name: string,
    testCases: EvaluationTestCase[],
    metrics: EvaluationMetric[]
  ) => void;
  views?: {
    container?: any;
  };
}

/**
 * EvaluationCreator Component
 *
 * Form for creating new evaluations with test cases and metrics
 */
export const EvaluationCreator: React.FC<EvaluationCreatorProps> = ({
  templates,
  isCreating,
  canCreate,
  onCreateEvaluation,
  views = {},
}) => {
  const [name, setName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [testCasesText, setTestCasesText] = useState('');
  const [metricsText, setMetricsText] = useState('');

  /**
   * Handle template selection
   */
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setName(template.name);
      setTestCasesText(JSON.stringify(template.testCases, null, 2));
      setMetricsText(JSON.stringify(template.metrics, null, 2));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Please enter a name for the evaluation');
      return;
    }

    try {
      const testCases = testCasesText ? JSON.parse(testCasesText) : [];
      const metrics = metricsText ? JSON.parse(metricsText) : [];

      onCreateEvaluation(name, testCases, metrics);

      // Reset form
      setName('');
      setSelectedTemplate('');
      setTestCasesText('');
      setMetricsText('');
    } catch (error) {
      alert('Invalid JSON in test cases or metrics');
    }
  };

  /**
   * Load sample data
   */
  const loadSampleData = () => {
    setName('Sample Evaluation');
    setTestCasesText(
      JSON.stringify(
        [
          {
            id: 'test-1',
            name: 'Basic Question',
            description: 'Test basic question answering',
            input: { question: 'What is 2+2?' },
            expectedOutput: { answer: '4' },
            tags: ['math', 'basic'],
          },
          {
            id: 'test-2',
            name: 'Complex Question',
            description: 'Test complex reasoning',
            input: { question: 'Explain the concept of recursion' },
            expectedOutput: { answer: 'A function that calls itself...' },
            tags: ['programming', 'complex'],
          },
        ],
        null,
        2
      )
    );

    setMetricsText(
      JSON.stringify(
        [
          {
            id: 'accuracy',
            name: 'Accuracy',
            description: 'Measures correctness of answers',
            type: 'accuracy',
            threshold: 0.8,
            weight: 1.0,
          },
          {
            id: 'latency',
            name: 'Response Time',
            description: 'Measures response latency',
            type: 'latency',
            threshold: 5000,
            weight: 0.5,
          },
        ],
        null,
        2
      )
    );
  };

  return (
    <View {...DefaultAgentEvalStyles.createPanel} {...views.container}>
      <Vertical gap={24}>
        <Text fontSize="lg" fontWeight="600">
          Create New Evaluation
        </Text>

        {!canCreate && (
          <View
            padding={12}
            backgroundColor="color.yellow.50"
            borderRadius="8px"
            border="1px solid"
            borderColor="color.yellow.200"
          >
            <Text fontSize="sm" color="color.yellow.800">
              ⚠️ Maximum concurrent evaluations reached. Please wait for running
              evaluations to complete.
            </Text>
          </View>
        )}

        {/* Template Selection */}
        {templates.length > 0 && (
          <View {...DefaultAgentEvalStyles.formGroup}>
            <Text {...DefaultAgentEvalStyles.formLabel}>
              Use Template (Optional)
            </Text>
            <Select
              value={selectedTemplate}
              onChange={handleTemplateSelect}
              options={[
                { value: '', label: 'No template' },
                ...templates.map((t) => ({ value: t.id, label: t.name })),
              ]}
              placeholder="Select a template"
            />
          </View>
        )}

        {/* Evaluation Name */}
        <View {...DefaultAgentEvalStyles.formGroup}>
          <Text {...DefaultAgentEvalStyles.formLabel}>Evaluation Name *</Text>
          <TextField
            value={name}
            onChange={setName}
            placeholder="Enter evaluation name"
            disabled={isCreating}
          />
        </View>

        {/* Test Cases */}
        <View {...DefaultAgentEvalStyles.formGroup}>
          <Horizontal
            justifyContent="space-between"
            alignItems="center"
            marginBottom={8}
          >
            <Text {...DefaultAgentEvalStyles.formLabel}>Test Cases (JSON)</Text>
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
              disabled={isCreating}
            >
              Load Sample
            </Button>
          </Horizontal>
          <TextArea
            value={testCasesText}
            onChange={(e) => setTestCasesText(e.target.value)}
            placeholder="Enter test cases as JSON array"
            disabled={isCreating}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '8px 12px',
              border: '1px solid',
              borderColor: 'color.gray.300',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <Text fontSize="xs" color="color.gray.600" marginTop={4}>
            Each test case should have: id, name, input, expectedOutput
            (optional)
          </Text>
        </View>

        {/* Metrics */}
        <View {...DefaultAgentEvalStyles.formGroup}>
          <Text {...DefaultAgentEvalStyles.formLabel}>Metrics (JSON)</Text>
          <TextArea
            value={metricsText}
            onChange={(e) => setMetricsText(e.target.value)}
            placeholder="Enter metrics as JSON array"
            disabled={isCreating}
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '8px 12px',
              border: '1px solid',
              borderColor: 'color.gray.300',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <Text fontSize="xs" color="color.gray.600" marginTop={4}>
            Each metric should have: id, name, type, threshold (optional),
            weight (optional)
          </Text>
        </View>

        {/* Actions */}
        <Horizontal gap={12}>
          <Button
            variant="filled"
            onClick={handleSubmit}
            disabled={!name.trim() || isCreating || !canCreate}
            loading={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Evaluation'}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setName('');
              setSelectedTemplate('');
              setTestCasesText('');
              setMetricsText('');
            }}
            disabled={isCreating}
          >
            Clear
          </Button>
        </Horizontal>

        {/* Help Text */}
        <View
          padding={16}
          backgroundColor="color.blue.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.blue.200"
        >
          <Text
            fontSize="sm"
            fontWeight="600"
            color="color.blue.800"
            marginBottom={8}
          >
            💡 Tips for Creating Evaluations
          </Text>
          <Vertical gap={4}>
            <Text fontSize="sm" color="color.blue.700">
              • Use descriptive names for test cases to easily identify them
            </Text>
            <Text fontSize="sm" color="color.blue.700">
              • Include diverse test cases to thoroughly evaluate your agent
            </Text>
            <Text fontSize="sm" color="color.blue.700">
              • Set appropriate thresholds for metrics based on your
              requirements
            </Text>
            <Text fontSize="sm" color="color.blue.700">
              • Use tags to categorize and filter test cases
            </Text>
          </Vertical>
        </View>
      </Vertical>
    </View>
  );
};
