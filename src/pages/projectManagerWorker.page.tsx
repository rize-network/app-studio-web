import React from 'react';
import { View } from 'app-studio';
import { BasicProjectManagerWorkerExample } from '../components/ProjectManagerWorker/examples/Basic';

/**
 * ProjectManagerWorker Demo Page
 *
 * Demonstrates the ProjectManagerWorker component with:
 * - OKR roadmap board for planning deliverables
 * - Kanban board for task management
 * - AI agent builder for automated task assignment
 * - Workflow automation
 * - Project analytics
 */
const ProjectManagerWorkerPage: React.FC = () => {
  return (
    <View height="100vh" overflow="hidden">
      <BasicProjectManagerWorkerExample />
    </View>
  );
};

export default ProjectManagerWorkerPage;
