import React from 'react';
import classnames from 'classnames';

export default function Input({ htmlFor, name, className, children }) {
  return (
    <>
      <label htmlFor={htmlFor} className={classnames('col-form-label', className)}>
        {children}
      </label>
    </>
  );
}
