
import PropTypes from 'prop-types';
import styles from './Statistics.module.scss';

const Statistics = ({ good, neutral, bad, total, positivePercentage }) => {
  return (
    <div>
      <p className={styles['statistics-item']}>Good: {good}</p>
      <p className={styles['statistics-item']}>Neutral: {neutral}</p>
      <p className={styles['statistics-item']}>Bad: {bad}</p>
      <p className={styles['statistics-item']}>Total: {total}</p>
      <p className={styles['statistics-item']}>
        Positive Feedback: {positivePercentage}%
      </p>
    </div>
  );
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number.isRequired,
};

export default Statistics;
