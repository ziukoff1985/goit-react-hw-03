import styles from './SearchBox.module.css';
// Xук useId для створення унікального ID поля пошуку
import { useId } from 'react';

// Компонент SearchBox відповідає за введення пошукового запиту
const SearchBox = ({ value, onFilter }) => {
  // Генеруємо унікальний ID для поля пошуку
  const searchId = useId();

  // Повертаємо розмітку поля пошуку
  return (
    <>
      {/* Мітка для поля вводу */}
      <label htmlFor={searchId} className={styles.inputLabel}>
        Find contacts by name
      </label>
      <div className={styles.inputWrap}>
        {/* Поле вводу для пошуку контактів */}
        <input
          className={styles.input}
          id={searchId}
          type="text"
          name="search"
          value={value}
          onChange={event => onFilter(event.target.value)} // Оновлюємо фільтр при зміні значення
        />
      </div>
    </>
  );
};

export default SearchBox;
