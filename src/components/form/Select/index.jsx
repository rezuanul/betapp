import React from 'react';
import classnames from 'classnames';

export default function Select({
  type,
  error,
  touched,
  name,
  id,
  className,
  children,
  value,
  ...restProps
}) {
  return (
    <>
      <select
        className={classnames('form-control', className)}
        id={id}
        name={name}
        value={value}
        {...restProps}
      >
        {children}
      </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </>
  );
}
