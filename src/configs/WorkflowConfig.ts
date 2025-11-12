/**
 * Worker/Skill Workflow Configuration
 * Organizes workflows by category for the application
 */

// Design workflows
export const logo = 'logo';

// Team workflows
export const team = 'team';
export const addMember = 'addMember';

// Ads workflows
export const adCreativePackage = 'adCreativePackage';
export const adCampaignStrategy = 'adCampaignStrategy';
export const adCampaignTechnicalSetup = 'adCampaignTechnicalSetup';
export const adCampaignLaunchManagement = 'adCampaignLaunchManagement';
export const adsVisual = 'adsVisual';
export const visualAdsGeneration = 'visualAdsGeneration';

// Blog workflows
export const blogContentStrategy = 'blogContentStrategy';

// Social Media workflows
export const socialMediaCalendar = 'socialMediaCalendar';
export const socialMediaProductionWorkflow = 'socialMediaProductionWorkflow';
export const socialMediaGrowthAndRiskPlan = 'socialMediaGrowthAndRiskPlan';
export const socialPosts = 'socialPosts';
export const mediaGeneration = 'mediaGeneration';

// Content workflows
export const contentStrategy = 'contentStrategy';

// Product workflows
export const userInterview = 'userInterview';
export const problemValidation = 'problemValidation';
export const firstUserActivation = 'firstUserActivation';

// Growth workflows
export const icpBuilderAction = 'icpBuilderAction';
export const leadMinerAction = 'leadMinerAction';
export const outreachGeneratorAction = 'outreachGeneratorAction';
export const channelRecommenderAction = 'channelRecommenderAction';
export const funnelStrategyAndOfferDesign = 'funnelStrategyAndOfferDesign';
export const funnelTopOfFunnelContent = 'funnelTopOfFunnelContent';
export const funnelAutomationAndOptimizationPlan = 'funnelAutomationAndOptimizationPlan';
export const marketingCampaignStrategy = 'marketingCampaignStrategy';
export const marketingCreativePackage = 'marketingCreativePackage';
export const marketingPrAndEventsPlan = 'marketingPrAndEventsPlan';
export const marketingOptimizationCompliancePlan = 'marketingOptimizationCompliancePlan';
export const salesPlaybook = 'salesPlaybook';

// Financing workflows
export const fundraising = 'fundraising';
export const financial = 'financial';
export const grant = 'grant';
export const application = 'application';

// Project workflows
export const project = 'project';

// Mentor workflows
export const mentorAdvise = 'mentorAdvise';
export const mentorRoast = 'mentorRoast';
export const mentorChallenge = 'mentorChallenge';
export const mentorSession = 'mentorSession';
export const mentorQuickCheck = 'mentorQuickCheck';

// Coach Agile workflows
export const okrManagement = 'okrManagement';
export const milestoneManagement = 'milestoneManagement';
export const sprintPlanning = 'sprintPlanning';

// Analytic workflows
export const kpiReporting = 'kpiReporting';

// Competitor workflows
export const tracker = 'tracker';

/**
 * Workflow categories organized by skill/domain
 */
export const WorkflowCategories = {
  design: {
    logo,
  },

  team: {
    team,
    addMember,
  },

  ads: {
    adCreativePackage,
    adCampaignStrategy,
    adCampaignTechnicalSetup,
    adCampaignLaunchManagement,
    adsVisual,
    visualAdsGeneration,
  },

  socialMedia: {
    // Social media
    socialMediaCalendar,
    socialMediaProductionWorkflow,
    socialMediaGrowthAndRiskPlan,
    socialPosts,
    mediaGeneration,
    // Content
    contentStrategy,
  },

  blog: {
    // Blog
    blogContentStrategy,
  },

  product: {
    userInterview,
    problemValidation,
    firstUserActivation,
  },

  growth: {
    icpBuilderAction,
    leadMinerAction,
    outreachGeneratorAction,
    channelRecommenderAction,
    funnelStrategyAndOfferDesign,
    funnelTopOfFunnelContent,
    funnelAutomationAndOptimizationPlan,
    marketingCampaignStrategy,
    marketingCreativePackage,
    marketingPrAndEventsPlan,
    marketingOptimizationCompliancePlan,
    salesPlaybook,
  },

  financing: {
    fundraising,
    financial,
    grant,
    application,
  },

  project: {
    project,
  },

  mentor: {
    mentorAdvise,
    mentorRoast,
    mentorChallenge,
    mentorSession,
    mentorQuickCheck,
  },

  coachAgile: {
    okrManagement,
    milestoneManagement,
    sprintPlanning,
  },

  analytic: {
    kpiReporting,
  },

  competitor: {
    tracker,
  },
} as const;

/**
 * Type definitions for workflow categories
 */
export type WorkflowCategoryKey = keyof typeof WorkflowCategories;

export type DesignWorkflow = keyof typeof WorkflowCategories.design;
export type TeamWorkflow = keyof typeof WorkflowCategories.team;
export type AdsWorkflow = keyof typeof WorkflowCategories.ads;
export type SocialMediaWorkflow = keyof typeof WorkflowCategories.socialMedia;
export type BlogWorkflow = keyof typeof WorkflowCategories.blog;
export type ProductWorkflow = keyof typeof WorkflowCategories.product;
export type GrowthWorkflow = keyof typeof WorkflowCategories.growth;
export type FinancingWorkflow = keyof typeof WorkflowCategories.financing;
export type ProjectWorkflow = keyof typeof WorkflowCategories.project;
export type MentorWorkflow = keyof typeof WorkflowCategories.mentor;
export type CoachAgileWorkflow = keyof typeof WorkflowCategories.coachAgile;
export type AnalyticWorkflow = keyof typeof WorkflowCategories.analytic;
export type CompetitorWorkflow = keyof typeof WorkflowCategories.competitor;

/**
 * Helper function to get all workflows in a category
 */
export const getWorkflowsByCategory = (
  category: WorkflowCategoryKey
): string[] => {
  return Object.values(WorkflowCategories[category]);
};

/**
 * Helper function to get all workflow names
 */
export const getAllWorkflows = (): string[] => {
  return Object.values(WorkflowCategories).flatMap((category) =>
    Object.values(category)
  );
};

/**
 * Helper function to find category for a workflow
 */
export const getCategoryForWorkflow = (
  workflowName: string
): WorkflowCategoryKey | null => {
  for (const [category, workflows] of Object.entries(WorkflowCategories)) {
    if (Object.values(workflows).includes(workflowName)) {
      return category as WorkflowCategoryKey;
    }
  }
  return null;
};

export default WorkflowCategories;
