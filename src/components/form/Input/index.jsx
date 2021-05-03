import React from 'react';
import classnames from 'classnames';

export default function Input({ type, name, id, error, touched, className, ...restProps }) {
  return (
    <>
      <input
        type={type}
        className={classnames('form-control', {
          'border border-danger': touched && error,
          className,
        })}
        id={id}
        name={name}
        {...restProps}
      />
      {touched && error && <div className="text-danger">{error}</div>}
    </>
  );
}
