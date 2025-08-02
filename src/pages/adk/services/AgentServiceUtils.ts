/**
 * Agent Service Utilities
 *
 * Helper functions and utilities for working with the Agent Service
 */

import {
  AgentMessage,
  MessagePart,
} from '../../../components/adk/AgentChat/AgentChat/AgentChat.props';

import {
  TraceEvent,
  TraceMetrics,
} from '../../../components/adk/AgentTrace/AgentTrace/AgentTrace.props';

import {
  EvaluationRun,
  EvaluationResult,
} from '../../../components/adk/AgentEval/AgentEval/AgentEval.props';

/**
 * Message Utilities
 */
export class MessageUtils {
  /**
   * Create a text message part
   */
  static createTextPart(text: string): MessagePart {
    return {
      text,
    };
  }

  /**
   * Create an inline data part from file
   */
  static async createInlineDataPart(file: File): Promise<MessagePart> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            mimeType: file.type,
            data: base64Data,
            displayName: file.name,
          },
        });
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Create a function call part
   */
  static createFunctionCallPart(
    name: string,
    args: any,
    id: string = 'func-' + Date.now()
  ): MessagePart {
    return {
      functionCall: {
        id,
        name,
        args,
      },
    };
  }

  /**
   * Create a function response part
   */
  static createFunctionResponsePart(
    name: string,
    response: any,
    id: string = 'resp-' + Date.now()
  ): MessagePart {
    return {
      functionResponse: {
        id,
        name,
        response,
      },
    };
  }

  /**
   * Extract text content from message parts
   */
  static extractTextContent(parts: MessagePart[]): string {
    return parts
      .filter((part) => part.text !== undefined)
      .map((part) => part.text)
      .join(' ');
  }

  /**
   * Check if message contains attachments
   */
  static hasAttachments(parts: MessagePart[]): boolean {
    return parts.some((part) => part.inlineData !== undefined);
  }

  /**
   * Get attachment count
   */
  static getAttachmentCount(parts: MessagePart[]): number {
    return parts.filter((part) => part.inlineData !== undefined).length;
  }

  /**
   * Format message for display
   */
  static formatMessageForDisplay(message: AgentMessage): string {
    if (message.text) {
      return message.text;
    }

    if (message.parts) {
      const textContent = this.extractTextContent(message.parts);
      if (textContent) return textContent;
    }

    // Fallback for special message types
    if (message.functionCall) {
      return `🔧 Function Call: ${message.functionCall.name}`;
    }

    if (message.functionResponse) {
      return `✅ Function Response: ${message.functionResponse.name}`;
    }

    if (message.executableCode) {
      return `💻 Code: ${message.executableCode.language}`;
    }

    return '[Non-text content]';
  }
}

/**
 * Trace Utilities
 */
export class TraceUtils {
  /**
   * Calculate trace metrics from events
   */
  static calculateMetrics(events: TraceEvent[]): TraceMetrics {
    const totalEvents = events.length;
    const durations = events.filter((e) => e.duration).map((e) => e.duration!);
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const averageResponseTime =
      durations.length > 0 ? totalDuration / durations.length : 0;

    const errorCount = events.filter(
      (e) => e.metadata?.level === 'error'
    ).length;
    const successCount = totalEvents - errorCount;
    const functionCallCount = events.filter(
      (e) => e.type === 'function_call'
    ).length;
    const llmRequestCount = events.filter(
      (e) => e.type === 'llm_request'
    ).length;

    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate percentiles
    const sortedDurations = durations.sort((a, b) => a - b);
    const getPercentile = (p: number) => {
      const index = Math.ceil((p / 100) * sortedDurations.length) - 1;
      return sortedDurations[index] || 0;
    };

    return {
      totalEvents,
      totalDuration,
      averageResponseTime,
      errorCount,
      successCount,
      functionCallCount,
      llmRequestCount,
      eventsByType,
      performanceMetrics: {
        p50: getPercentile(50),
        p90: getPercentile(90),
        p95: getPercentile(95),
        p99: getPercentile(99),
      },
    };
  }

  /**
   * Filter events by type
   */
  static filterEventsByType(
    events: TraceEvent[],
    types: string[]
  ): TraceEvent[] {
    return events.filter((event) => types.includes(event.type));
  }

  /**
   * Filter events by time range
   */
  static filterEventsByTimeRange(
    events: TraceEvent[],
    startTime: number,
    endTime: number
  ): TraceEvent[] {
    return events.filter(
      (event) => event.timestamp >= startTime && event.timestamp <= endTime
    );
  }

  /**
   * Group events by type
   */
  static groupEventsByType(events: TraceEvent[]): Record<string, TraceEvent[]> {
    return events.reduce((groups, event) => {
      if (!groups[event.type]) {
        groups[event.type] = [];
      }
      groups[event.type].push(event);
      return groups;
    }, {} as Record<string, TraceEvent[]>);
  }

  /**
   * Find events by parent ID
   */
  static findChildEvents(events: TraceEvent[], parentId: string): TraceEvent[] {
    return events.filter((event) => event.parentId === parentId);
  }

  /**
   * Build event tree structure
   */
  static buildEventTree(events: TraceEvent[]): TraceEvent[] {
    const eventMap = new Map(
      events.map((e) => [e.id, { ...e, children: [] as TraceEvent[] }])
    );
    const roots: TraceEvent[] = [];

    events.forEach((event) => {
      const eventWithChildren = eventMap.get(event.id)!;
      if (event.parentId && eventMap.has(event.parentId)) {
        eventMap.get(event.parentId)!.children!.push(eventWithChildren);
      } else {
        roots.push(eventWithChildren);
      }
    });

    return roots;
  }
}

/**
 * Evaluation Utilities
 */
export class EvaluationUtils {
  /**
   * Calculate evaluation summary
   */
  static calculateSummary(results: EvaluationResult[]) {
    const totalTests = results.length;
    const passedTests = results.filter((r) => r.status === 'pass').length;
    const failedTests = results.filter((r) => r.status === 'fail').length;
    const errorTests = results.filter((r) => r.status === 'error').length;
    const skippedTests = results.filter((r) => r.status === 'skip').length;

    const scores = results
      .filter((r) => r.score !== undefined)
      .map((r) => r.score!);
    const averageScore =
      scores.length > 0
        ? scores.reduce((sum, s) => sum + s, 0) / scores.length
        : 0;

    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    const passRate = totalTests > 0 ? passedTests / totalTests : 0;

    // Calculate metric averages
    const metricsAverages: Record<string, number> = {};
    const allMetrics = new Set<string>();

    results.forEach((result) => {
      Object.keys(result.metrics).forEach((metric) => allMetrics.add(metric));
    });

    allMetrics.forEach((metric) => {
      const values = results
        .map((r) => r.metrics[metric])
        .filter((v) => v !== undefined);

      if (values.length > 0) {
        metricsAverages[metric] =
          values.reduce((sum, v) => sum + v, 0) / values.length;
      }
    });

    return {
      totalTests,
      passedTests,
      failedTests,
      errorTests,
      skippedTests,
      averageScore,
      totalDuration,
      metricsAverages,
      passRate,
    };
  }

  /**
   * Filter results by status
   */
  static filterResultsByStatus(
    results: EvaluationResult[],
    statuses: string[]
  ): EvaluationResult[] {
    return results.filter((result) => statuses.includes(result.status));
  }

  /**
   * Get failed test cases
   */
  static getFailedResults(results: EvaluationResult[]): EvaluationResult[] {
    return this.filterResultsByStatus(results, ['fail', 'error']);
  }

  /**
   * Get passed test cases
   */
  static getPassedResults(results: EvaluationResult[]): EvaluationResult[] {
    return this.filterResultsByStatus(results, ['pass']);
  }

  /**
   * Calculate pass rate
   */
  static calculatePassRate(results: EvaluationResult[]): number {
    const totalTests = results.length;
    const passedTests = this.getPassedResults(results).length;
    return totalTests > 0 ? passedTests / totalTests : 0;
  }

  /**
   * Find slowest test cases
   */
  static getSlowestResults(
    results: EvaluationResult[],
    count = 5
  ): EvaluationResult[] {
    return [...results].sort((a, b) => b.duration - a.duration).slice(0, count);
  }

  /**
   * Find fastest test cases
   */
  static getFastestResults(
    results: EvaluationResult[],
    count = 5
  ): EvaluationResult[] {
    return [...results].sort((a, b) => a.duration - b.duration).slice(0, count);
  }

  /**
   * Compare two evaluations
   */
  static compareEvaluations(eval1: EvaluationRun, eval2: EvaluationRun) {
    const summary1 = eval1.summary;
    const summary2 = eval2.summary;

    if (!summary1 || !summary2) {
      return null;
    }

    return {
      passRateDiff: summary2.passRate - summary1.passRate,
      averageScoreDiff: summary2.averageScore - summary1.averageScore,
      durationDiff: summary2.totalDuration - summary1.totalDuration,
      testCountDiff: summary2.totalTests - summary1.totalTests,
    };
  }
}

/**
 * File Utilities
 */
export class FileUtils {
  /**
   * Convert file to base64
   */
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get file type category
   */
  static getFileTypeCategory(
    mimeType: string
  ): 'image' | 'video' | 'audio' | 'document' | 'other' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (
      mimeType.includes('pdf') ||
      mimeType.includes('document') ||
      mimeType.includes('text')
    ) {
      return 'document';
    }
    return 'other';
  }

  /**
   * Format file size
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validate file type
   */
  static isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some((type) => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });
  }

  /**
   * Validate file size
   */
  static isValidFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }
}

/**
 * Format Utilities
 */
export class FormatUtils {
  /**
   * Format duration in milliseconds
   */
  static formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
    return `${(ms / 3600000).toFixed(1)}h`;
  }

  /**
   * Format timestamp
   */
  static formatTimestamp(
    timestamp: number,
    format: 'short' | 'long' | 'relative' = 'short'
  ): string {
    const date = new Date(timestamp);

    switch (format) {
      case 'short':
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'long':
        return date.toLocaleString();
      case 'relative':
        return this.formatRelativeTime(timestamp);
      default:
        return date.toISOString();
    }
  }

  /**
   * Format relative time
   */
  static formatRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  }

  /**
   * Format percentage
   */
  static formatPercentage(value: number, decimals = 1): string {
    return `${(value * 100).toFixed(decimals)}%`;
  }

  /**
   * Format score
   */
  static formatScore(score: number, decimals = 2): string {
    return score.toFixed(decimals);
  }
}
