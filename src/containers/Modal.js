import React from 'react';

export default function Modal({ children, show }) {
  if (!show) return null;
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="modal"
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
