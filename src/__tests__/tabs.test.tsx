import React from 'react';
import renderer from 'react-test-renderer';
import { Tabs } from 'src/components';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Tabs component without crashing', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} />);
});

test('renders tabs with labels', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} />);
  expect(screen.getByText('Tab 1')).toBeInTheDocument();
  expect(screen.getByText('Tab 2')).toBeInTheDocument();
});

test('renders first tab content by default', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} />);
  expect(screen.getByText('Content 1')).toBeInTheDocument();
});

test('renders specified default tab content', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} defaultValue="tab2" />);
  expect(screen.getByText('Content 2')).toBeInTheDocument();
});

test('switches tab content on click', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} />);
  const tab2Button = screen.getByText('Tab 2');
  fireEvent.click(tab2Button);
  expect(screen.getByText('Content 2')).toBeInTheDocument();
});

test('calls onTabChange callback when tab changes', () => {
  const handleTabChange = jest.fn();
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  render(<Tabs tabs={tabs} onTabChange={handleTabChange} />);
  const tab2Button = screen.getByText('Tab 2');
  fireEvent.click(tab2Button);
  expect(handleTabChange).toHaveBeenCalled();
});

test('renders with custom renderTab function', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  const renderTab = (tab, isActive, onClick) => (
    <button onClick={onClick}>Custom {tab.label}</button>
  );
  render(<Tabs tabs={tabs} renderTab={renderTab} />);
  expect(screen.getByText('Custom Tab 1')).toBeInTheDocument();
});

test('renders with custom renderContent function', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  const renderContent = (tab) => <div>Rendered: {tab.content}</div>;
  render(<Tabs tabs={tabs} renderContent={renderContent} />);
  expect(screen.getByText('Rendered: Content 1')).toBeInTheDocument();
});

test('renders empty tabs array', () => {
  render(<Tabs tabs={[]} />);
});

test('renders single tab', () => {
  const tabs = [{ value: 'tab1', label: 'Only Tab', content: 'Content' }];
  render(<Tabs tabs={tabs} />);
  expect(screen.getByText('Only Tab')).toBeInTheDocument();
  expect(screen.getByText('Content')).toBeInTheDocument();
});

test('Tabs with default props matches snapshot', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  const tree = renderer.create(<Tabs tabs={tabs} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tabs with custom views matches snapshot', () => {
  const tabs = [
    { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { value: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];
  const customViews = { container: { backgroundColor: '#f5f5f5' } };
  const tree = renderer.create(<Tabs tabs={tabs} views={customViews} />).toJSON();
  expect(tree).toMatchSnapshot();
});
