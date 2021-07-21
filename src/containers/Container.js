import React from 'react';
import './styles/Container.css';

export default function container({ children }) {
  return <div className="page-container">{children}</div>;
}
