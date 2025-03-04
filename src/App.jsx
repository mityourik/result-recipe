import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import data from '../src/utils/data.json';

const App = () => {
    const [steps, setSteps] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const stepsComponents = data.map((item) => (
            <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
            </div>
        ));
        setSteps(stepsComponents);
    }, []);

    const handleClickBack = () => setActiveIndex((prevIndex) => prevIndex - 1);
    const handleClickNext = () => setActiveIndex((prevIndex) => prevIndex + 1);
    const handleClickRestart = () => setActiveIndex(0);

    const isFirstStep = activeIndex === 0;
    const isLastStep = activeIndex === steps.length - 1;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps[activeIndex]}
                    </div>
                    <ul className={styles['steps-list']}>
                        {steps.map((step, index) => {
                            const liClass = `${styles['steps-item']} ${
                                index < activeIndex
                                    ? styles.done
                                    : index === activeIndex
                                    ? `${styles.done} ${styles.active}`
                                    : ''
                            }`;
                            return (
                                <li className={liClass} key={index}>
                                    <button
                                        className={styles['steps-item-button']}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {index + 1}
                                    </button>
                                    Шаг {index + 1}
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles['buttons-container']}>
                        <button
                            className={styles.button}
                            onClick={handleClickBack}
                            disabled={isFirstStep}
                        >
                            Назад
                        </button>
                        <button
                            className={styles.button}
                            onClick={
                                isLastStep
                                    ? handleClickRestart
                                    : handleClickNext
                            }
                        >
                            {isLastStep ? 'Начать сначала' : 'Далее'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
