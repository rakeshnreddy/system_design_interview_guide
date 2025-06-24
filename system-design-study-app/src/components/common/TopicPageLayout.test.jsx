import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicPageLayout from './TopicPageLayout';

// Mock the useColorMode hook
jest.mock('@docusaurus/theme-common/internal', () => ({
  useColorMode: () => ({
    colorMode: 'light', // or 'dark'
    setColorMode: jest.fn(),
  }),
}));

// Mock ThemeSwitcher component
jest.mock('../shared/ThemeSwitcher', () => () => <div data-testid="theme-switcher-mock">ThemeSwitcher</div>);


describe('TopicPageLayout', () => {
  it('renders sidebar and content props', () => {
    const SidebarComponent = () => <div data-testid="sidebar">Sidebar Content</div>;
    const ContentComponent = () => <div data-testid="content">Main Content</div>;

    render(
      <TopicPageLayout
        sidebar={<SidebarComponent />}
        content={<ContentComponent />}
        topicTitle="Test Topic"
      />
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders the topic title', () => {
    const SidebarComponent = () => <div>Sidebar</div>;
    const ContentComponent = () => <div>Content</div>;

    render(
      <TopicPageLayout
        sidebar={<SidebarComponent />}
        content={<ContentComponent />}
        topicTitle="My Awesome Topic"
      />
    );

    expect(screen.getByText('My Awesome Topic')).toBeInTheDocument();
  });

  it('renders ThemeSwitcher', () => {
    const SidebarComponent = () => <div>Sidebar</div>;
    const ContentComponent = () => <div>Content</div>;

    render(
      <TopicPageLayout
        sidebar={<SidebarComponent />}
        content={<ContentComponent />}
        topicTitle="Test Topic"
      />
    );
    expect(screen.getByTestId('theme-switcher-mock')).toBeInTheDocument();
  });
});
