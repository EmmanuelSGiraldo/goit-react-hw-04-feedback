import { useState, useEffect, useMemo, useCallback } from 'react';
import Statistics from '../Statistics/Statistics';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Section from '../Section/Section';
import Notification from '../Notification/Notification';
import styles from './App.module.scss';

const App = () => {
  // Estado para almacenar las retroalimentacionesF
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Estado para mostrar/ocultar la notificación
  const [showNotification, setShowNotification] = useState(false);

  // Estado para el mensaje de la notificación
  const [notificationMessage, setNotificationMessage] = useState('');

  // Estado para controlar la tendencia positiva
  const [isPositiveTrend, setIsPositiveTrend] = useState(false);

  // Función para manejar las retroalimentaciones
  const handleFeedback = useCallback((type) => {
    setFeedback((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  }, []);

  // Desestructuración del estado feedback
  const { good, neutral, bad } = feedback;

  // Efecto para verificar la tendencia y mostrar notificaciones
  useEffect(() => {
    const totalFeedback = good + neutral + bad;
    const positivePercentage = (good / totalFeedback) * 100;

    if (positivePercentage >= 70) {
      setIsPositiveTrend(true);
      if (isPositiveTrend) {
        setNotificationMessage('¡Felicidades! La tendencia es positiva');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 7000);
      }
    } else {
      setIsPositiveTrend(false);
    }

    if (!isPositiveTrend && bad > 5) {
      setNotificationMessage(
        '¡Alerta! Se ha alcanzado un alto nivel de retroalimentación negativa.'
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 7000);
    }
  }, [good, neutral, bad, isPositiveTrend]);

  // Cálculo del total de retroalimentaciones utilizando useMemo
  const totalFeedback = useMemo(() => good + neutral + bad, [good, neutral, bad]);

  // Cálculo del porcentaje de retroalimentaciones positivas utilizando useMemo
  const positiveFeedbackPercentage = useMemo(() => {
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  }, [good, totalFeedback]);

  return (
    <div className={styles.container}>
      {/* Sección para dejar retroalimentación */}
      <Section title="Please leave your feedback">
        <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} />
      </Section>

      {/* Sección de estadísticas */}
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>

      {/* Notificación */}
      {showNotification && <Notification message={notificationMessage} />}

      <h2>Designed by Emmanuel S Giraldo</h2>

    </div>
  );
};


export default App;
