import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import BlogForm from './BlogForm.js';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createNewBlog = jest.fn();

  const component = render(<BlogForm createNewBlog={createNewBlog} />);

  const form = component.container.querySelector('form');
  const title = component.container.querySelector('.title');
  const author = component.container.querySelector('.author');
  const url = component.container.querySelector('.url');

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(author, { target: { value: 'test user' } });
  fireEvent.change(url, { target: { value: 'http://localhost:3000' } });
  fireEvent.submit(form);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier',
  );
});
