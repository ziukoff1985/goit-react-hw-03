import styles from './SearchBox.module.css';

const SearchBox = ({ value, onFilter }) => {
  return (
    <div className={styles.inputWrap}>
      <label className={styles.inputLabel}>
        Find contacts by name
        <input
          className={styles.input}
          type="text"
          name="search"
          value={value}
          onChange={event => onFilter(event.target.value)}
        />
      </label>
    </div>
  );
};

export default SearchBox;
