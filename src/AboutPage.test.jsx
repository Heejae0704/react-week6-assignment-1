import React from 'react';

import { render } from '@testing-library/react';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders about page', () => {
    const { container } = render((
      <AboutPage />
    ));

    expect(container).toHaveTextContent('About');
    expect(container).toHaveTextContent('About 페이지입니다.');
  });
});
