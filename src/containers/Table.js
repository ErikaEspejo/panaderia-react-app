import React from 'react';

const Table = ({ children, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((el, index) => {
            return <th key={index}>{el}</th>;
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
