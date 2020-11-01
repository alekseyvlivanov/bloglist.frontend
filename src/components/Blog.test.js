import React from 'react';
import { prettyDOM } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import Blog from './Blog.js';

test('render contents', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test user',
    url: 'http://localhost:3000',
    likes: 1,
    user: { name: 'root' },
  };

  const mockDeleteHandler = jest.fn();
  const mockLikeHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      deleteBlog={mockDeleteHandler}
      likeBlog={mockLikeHandler}
      canDelete={true}
    />,
  );

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library',
  );

  const element = component.getByText(
    'Component testing is done with react-testing-library',
    { exact: false },
  );
  expect(element).toBeDefined();

  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  expect(div).not.toHaveTextContent(blog.url);
  expect(div).not.toHaveTextContent(blog.likes);

  const btnView = component.getByText('view');
  fireEvent.click(btnView);

  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent(blog.likes);

  //   expect(mockHandler.mock.calls).toHaveLength(1);
});
