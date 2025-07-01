
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Modified AllTheProviders to accept routerProps
const AllTheProviders = ({ children, routerProps }) => {
  return <MemoryRouter {...routerProps}>{children}</MemoryRouter>;
};

// Modified customRender to pass routerProps
const customRender = (ui, options) => {
  const { routerProps, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} routerProps={routerProps} />,
    ...renderOptions
  });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
