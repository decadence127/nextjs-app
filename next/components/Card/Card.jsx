import React from 'react';
import styles from './Card.module.scss'
const Card = ({ children, ...props }) => {
  return (
    <div className={styles.[props.classNameProp]} >
      {children}
    </div>
  );
};

export default Card;