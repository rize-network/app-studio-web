import React, { useState } from 'react';
import { View, Vertical, Text } from 'app-studio';
import { AgentEval } from '../AgentEval';
import { EvaluationRun } from '../AgentEval/AgentEval.props';

/**
 * Default AgentEval Example
 *
 * Demonstrates basic usage of the AgentEval component
 */
export const DefaultDemo = () => {
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<EvaluationRun | null>(null);

  const handleEvaluationCreate = (evaluation: EvaluationRun) => {
    console.log('Evaluation created:', evaluation);
    setSelectedEvaluation(evaluation);
  };

  const handleEvaluationComplete = (evaluation: EvaluationRun) => {
    console.log('Evaluation completed:', evaluation);
  };

  const handleError = (error: Error) => {
    console.error('AgentEval error:', error);
  };

  return (
    <Vertical gap={32} padding={20}>
      <Text fontSize={20} fontWeight="600">
        AgentEval Component - Default Example
      </Text>

      <Text color="color.gray.600">
        A comprehensive evaluation component for ADK agents. Handles evaluation
        creation, execution, monitoring, and results analysis.
      </Text>

      {/* Selected Evaluation Info */}
      {selectedEvaluation && (
        <View
          padding={16}
          backgroundColor="color.green.50"
          borderRadius="8px"
          border="1px solid"
          borderColor="color.green.200"
        >
          <Text fontSize={14} fontWeight="600" color="color.green.800">
            Active Evaluation
          </Text>
          <Text fontSize={12} color="color.green.600">
            Name: {selectedEvaluation.name}
          </Text>
          <Text fontSize={12} color="color.green.600">
            Status: {selectedEvaluation.status}
          </Text>
          <Text fontSize={12} color="color.green.600">
            Progress: {selectedEvaluation.progress}%
          </Text>
        </View>
      )}

      {/* AgentEval Component */}
      <View
        height="700px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="12px"
      >
        <AgentEval
          appName="demo-agent"
          userId="demo-user"
          apiBaseUrl="http://localhost:3000/adk"
          enableBatchEvaluation={true}
          enableMetricsComparison={true}
          enableResultExport={true}
          enableTemplates={true}
          showEvaluationHistory={true}
          showMetricsPanel={true}
          showTestCaseDetails={true}
          showProgressIndicators={true}
          maxConcurrentEvals={3}
          enableAutoRefresh={false}
          onEvaluationCreate={handleEvaluationCreate}
          onEvaluationComplete={handleEvaluationComplete}
          onError={handleError}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * AgentEval with Mock Data Example
 *
 * Shows the component with sample evaluation data
 */
export const MockDataDemo = () => {
  const mockEvaluations: EvaluationRun[] = [
    {
      id: 'eval-1',
      name: 'Customer Support Evaluation',
      appName: 'support-agent',
      userId: 'user123',
      status: 'completed',
      progress: 100,
      startTime: Date.now() - 3600000,
      endTime: Date.now() - 3000000,
      duration: 600000,
      testCases: [
        {
          id: 'test-1',
          name: 'Basic Greeting',
          description: 'Test agent greeting response',
          input: { message: 'Hello' },
          expectedOutput: { response: 'Hello! How can I help you today?' },
          tags: ['greeting', 'basic'],
        },
        {
          id: 'test-2',
          name: 'Product Question',
          description: 'Test product information query',
          input: { message: 'Tell me about your pricing' },
          expectedOutput: { response: 'Our pricing starts at...' },
          tags: ['product', 'pricing'],
        },
      ],
      metrics: [
        {
          id: 'accuracy',
          name: 'Response Accuracy',
          description: 'Measures correctness of responses',
          type: 'accuracy',
          threshold: 0.8,
          weight: 1.0,
        },
        {
          id: 'latency',
          name: 'Response Time',
          description: 'Measures response latency',
          type: 'latency',
          threshold: 3000,
          weight: 0.5,
        },
      ],
      results: [
        {
          id: 'result-1',
          evaluationId: 'eval-1',
          testCaseId: 'test-1',
          status: 'pass',
          score: 0.95,
          actualOutput: { response: 'Hello! How can I help you today?' },
          metrics: { accuracy: 0.95, latency: 1200 },
          duration: 1200,
          timestamp: Date.now() - 3500000,
        },
        {
          id: 'result-2',
          evaluationId: 'eval-1',
          testCaseId: 'test-2',
          status: 'pass',
          score: 0.88,
          actualOutput: { response: 'Our pricing starts at $29/month...' },
          metrics: { accuracy: 0.88, latency: 2100 },
          duration: 2100,
          timestamp: Date.now() - 3400000,
        },
      ],
      summary: {
        totalTests: 2,
        passedTests: 2,
        failedTests: 0,
        errorTests: 0,
        skippedTests: 0,
        averageScore: 0.915,
        totalDuration: 3300,
        metricsAverages: { accuracy: 0.915, latency: 1650 },
        passRate: 1.0,
      },
    },
    {
      id: 'eval-2',
      name: 'Code Review Assistant',
      appName: 'code-agent',
      userId: 'user123',
      status: 'running',
      progress: 60,
      startTime: Date.now() - 1800000,
      testCases: [
        {
          id: 'test-3',
          name: 'Python Code Review',
          description: 'Review Python code for best practices',
          input: { code: 'def hello(): print("world")' },
          expectedOutput: {
            suggestions: ['Add type hints', 'Use more descriptive names'],
          },
          tags: ['python', 'review'],
        },
      ],
      metrics: [
        {
          id: 'quality',
          name: 'Review Quality',
          description: 'Quality of code review suggestions',
          type: 'quality',
          threshold: 0.7,
          weight: 1.0,
        },
      ],
    },
  ];

  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        AgentEval with Mock Data
      </Text>

      <View
        height="600px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentEval
          appName="demo-agent"
          userId="demo-user"
          initialEvaluations={mockEvaluations}
          selectedEvaluationId="eval-1"
          enableMetricsComparison={true}
          showMetricsPanel={true}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Compact AgentEval Example
 *
 * Shows the component in compact mode
 */
export const CompactDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Compact AgentEval Example
      </Text>

      <View
        height="400px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentEval
          appName="compact-agent"
          userId="user123"
          compactMode={true}
          showMetricsPanel={false}
          enableTemplates={false}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Customized AgentEval Example
 *
 * Shows advanced customization options
 */
export const CustomizedDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Customized AgentEval Example
      </Text>

      <View
        height="600px"
        border="1px solid"
        borderColor="color.purple.200"
        borderRadius="12px"
      >
        <AgentEval
          appName="custom-agent"
          userId="user123"
          enableBatchEvaluation={true}
          enableResultExport={true}
          maxConcurrentEvals={5}
          views={{
            container: {
              backgroundColor: 'color.purple.25',
              height: '100%',
            },
            header: {
              backgroundColor: 'color.purple.500',
              color: 'white',
            },
            evaluationList: {
              backgroundColor: 'color.white',
            },
            activeEvaluationItem: {
              backgroundColor: 'color.purple.100',
              borderColor: 'color.purple.500',
            },
            createPanel: {
              backgroundColor: 'color.purple.50',
            },
          }}
        />
      </View>
    </Vertical>
  );
};

/**
 * Real-time AgentEval Example
 *
 * Demonstrates real-time updates and monitoring
 */
export const RealTimeDemo = () => {
  return (
    <Vertical gap={16} padding={20}>
      <Text fontSize={18} fontWeight="600">
        Real-time AgentEval Example
      </Text>

      <Text fontSize={14} color="color.gray.600">
        This example shows real-time evaluation monitoring with auto-refresh
        enabled.
      </Text>

      <View
        height="500px"
        border="1px solid"
        borderColor="color.gray.200"
        borderRadius="8px"
      >
        <AgentEval
          appName="realtime-agent"
          userId="user123"
          enableAutoRefresh={true}
          enableRealTimeUpdates={true}
          refreshInterval={10000}
          showProgressIndicators={true}
          views={{
            container: {
              height: '100%',
            },
          }}
        />
      </View>
    </Vertical>
  );
};
