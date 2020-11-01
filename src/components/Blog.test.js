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

  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      deleteBlog={() => {}}
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
});

// test('clicking the button calls event handler once', () => {
//   const mockHandler = jest.fn();

//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'test user',
//     url: 'http://localhost:3000',
//     likes: 1,
//     user: { name: 'root' },
//   };

//   const component = render(
//     <Blog
//       blog={blog}
//       updateBlog={() => {}}
//       deleteBlog={() => {}}
//       canDelete={true}
//     />,
//   );

//   const btn = component.getByText('view');
//   console.log(prettyDOM(btn));
//   fireEvent.click(btn);

//   expect(mockHandler.mock.calls).toHaveLength(1);
// });
