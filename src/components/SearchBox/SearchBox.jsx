import styles from './SearchBox.module.css';
import { useId } from 'react';

const SearchBox = ({ value, onFilter }) => {
  const searchId = useId();

  return (
    <div className={styles.inputWrap}>
      <label htmlFor={searchId} className={styles.inputLabel}>
        Find contacts by name
      </label>
      <input
        className={styles.input}
        id={searchId}
        type="text"
        name="search"
        value={value}
        onChange={event => onFilter(event.target.value)}
      />
    </div>
  );
};

export default SearchBox;
