import React from 'react';

export default function Button({ onClick, icon, text = '', classNames }) {
  if (!classNames) classNames = 'btn-flat transparent';

  return (
    <a
      className={`waves-effect waves-purple ${classNames}`}
      style={{ borderRadius: '6px' }}
      onClick={onClick}
    >
      {icon && (
        <i style={styles.icon} className="material-icons left">
          {icon}
        </i>
      )}

      {text}
    </a>
  );
}

const styles = {
  icon: {
    color: 'grey',
    fontSize: 'calc(15px + 1.5vmin)',
  },
};
