import React from 'react';
import styles from '../styles/TemperatureToggle.module.css';

const TemperatureToggle = ({ isCelsius, onToggle }) => {
  return (
    <div className={styles.temperatureToggle}>
      <label className={styles.switch}>
        <input type="checkbox" checked={isCelsius} onChange={onToggle} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <span className={styles.unit}>{isCelsius ? '°C' : '°F'}</span>
    </div>
  );
};

export default TemperatureToggle;