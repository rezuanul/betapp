import React from 'react';
import classnames from 'classnames';

export default function Textarea({ type, name, id, touched, error, className, ...restProps }) {
  return (
    <>
      <textarea
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
