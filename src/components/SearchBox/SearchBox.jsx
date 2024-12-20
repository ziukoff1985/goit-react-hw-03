import styles from './SearchBox.module.css';
import { useId } from 'react';

const SearchBox = ({ value, onFilter }) => {
  const searchId = useId();

  return (
    <>
      <label htmlFor={searchId} className={styles.inputLabel}>
        Find contacts by name
      </label>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          id={searchId}
          type="text"
          name="search"
          value={value}
          onChange={event => onFilter(event.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBox;
