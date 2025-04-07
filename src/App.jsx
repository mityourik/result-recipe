import React, { useState } from 'react';
import styles from './App.module.css';
import data from '../src/utils/data.json';

const App = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClickBack = () => setActiveIndex((prev) => prev - 1);
    const handleClickNext = () => setActiveIndex((prev) => prev + 1);
    const handleClickRestart = () => setActiveIndex(0);

    const isFirstStep = activeIndex === 0;
    const isLastStep = activeIndex === data.length - 1;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        <div key={data[activeIndex].id}>
                            <h2>{data[activeIndex].title}</h2>
                            <p>{data[activeIndex].content}</p>
                        </div>
                    </div>
                    <ul className={styles['steps-list']}>
                        {data.map((step, index) => {
                            const liClass = `${styles['steps-item']} ${
                                index < activeIndex
                                    ? styles.done
                                    : index === activeIndex
                                    ? `${styles.done} ${styles.active}`
                                    : ''
                            }`;
                            return (
                                <li className={liClass} key={step.id}>
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
