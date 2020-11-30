import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntryPoint from './EntryPoint';
import '@testing-library/jest-dom';

test('hey', () => {
  const {getByText, getByLabelText} = render(<EntryPoint/>);
  
  const loginInput = getByLabelText(/Email Address/);
  const passwordInput = getByLabelText(/Password/);

  userEvent.type(loginInput, 'admin')
  expect(loginInput).toHaveValue('admin');

  userEvent.type(passwordInput, 'admin')
  expect(passwordInput).toHaveValue('admin');

  const submitBtn = getByText(/Sign In/);
  userEvent.click(submitBtn);

  /* How to simulate this behaviour? */
  // expect(localStorage.getItem('role')).not.toBeNull();
})