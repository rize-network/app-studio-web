import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: 'color.white',
  border: '1px solid',
  borderColor: 'color.gray.200',
  borderRadius: 8,
  overflow: 'hidden',
};

export const toolbarStyles: ViewProps = {
  height: 48,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  justifyContent: 'space-between',
  backgroundColor: 'color.white',
};

export const mainContentStyles: ViewProps = {
  display: 'flex',
  flex: 1,
  overflow: 'hidden', // Prevent outer scroll
};

export const leftPanelStyles: ViewProps = {
  borderRight: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'color.white',
  zIndex: 10,
};

export const leftPanelHeaderStyles: ViewProps = {
  height: 40,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  fontWeight: 600,
  fontSize: 12,
  color: 'color.gray.600',
  backgroundColor: 'color.gray.50',
};

export const taskListStyles: ViewProps = {
  flex: 1,
  overflowY: 'hidden', // Sync scroll with right panel, but we might use a shared container or sync via JS
  overflowX: 'hidden',
};

export const taskRowStyles: ViewProps = {
  height: 40,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  borderBottom: '1px solid',
  borderColor: 'color.gray.100',
  cursor: 'pointer',
  _hover: {
    backgroundColor: 'color.gray.50',
  },
};

export const milestoneRowStyles: ViewProps = {
  height: 32,
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  backgroundColor: 'color.gray.50',
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  fontWeight: 600,
  fontSize: 12,
  color: 'color.gray.800',
};

export const rightPanelStyles: ViewProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
};

export const timelineHeaderStyles: ViewProps = {
  height: 40,
  borderBottom: '1px solid',
  borderColor: 'color.gray.200',
  display: 'flex',
  overflowX: 'hidden', // Synced scroll
  backgroundColor: 'color.gray.50',
};

export const timelineBodyStyles: ViewProps = {
  flex: 1,
  overflow: 'auto', // This will control the scroll for both directions
  position: 'relative',
};

export const gridColumnStyles: ViewProps = {
  height: '100%',
  borderRight: '1px solid',
  borderColor: 'color.gray.100',
  position: 'absolute',
};

export const todayLineStyles: ViewProps = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 2,
  backgroundColor: 'color.blue.500',
  zIndex: 5,
  pointerEvents: 'none',
};

export const taskBarStyles: ViewProps = {
  height: 24,
  borderRadius: 4,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 8,
  fontSize: 11,
  color: 'white',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  cursor: 'pointer',
};

export const viewModeButtonStyles: ViewProps = {
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
  marginLeft: 4,
};
