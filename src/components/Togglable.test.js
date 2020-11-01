import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import Togglable from './Togglable.js';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv"></div>
      </Togglable>,
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const btn = component.getByText('show...');
    fireEvent.click(btn);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const btn = component.getByText('show...');
    fireEvent.click(btn);

    const closeBtn = component.getByText('cancel');
    fireEvent.click(closeBtn);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
