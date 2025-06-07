import React from 'react';

interface ErrorMessageProps {
  message?: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) =>
  message ? <div className="text-red-600 text-sm text-center my-2">{message}</div> : null; 