import React from 'react';
import styles from './Input.module.scss'
const Input = ({ classNameProp, children, ...props }) => {
  return (
    <input {...props} className={styles.[classNameProp]}>
    </input>
  );
};

export default Input;