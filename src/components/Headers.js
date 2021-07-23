import React from 'react';
import './styles/Headers.scss';

const Headers = ({ title, icon }) => {
  return (
    <>
      <h1 className="page-title">
        {icon}
        {title}
      </h1>
    </>
  );
};

export default Headers;
