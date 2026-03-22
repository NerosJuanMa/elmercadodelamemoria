import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ children, to }) => {
  return (
    <Link to={to} className="btn-navegacion">
      {children}
    </Link>
  );
};

export default Button;