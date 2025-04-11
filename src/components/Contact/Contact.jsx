// Імпортуємо іконки користувача та телефону з бібліотеки react-icons
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

// Компонент Contact -> відповідає за відображення одного контакту
const Contact = ({ name, number, id, onDelete }) => {
  // Повертаємо розмітку одного контакту
  return (
    // Окремий контакт у списку
    <li className={styles.contactCard}>
      <div className={styles.contactCardWrap}>
        {/* Ім'я контакту разом із відповідною іконкою */}
        <p className={styles.contactCardItem}>
          <FaUser className={styles.iconUser} />
          {name}
        </p>
        {/* Номер телефону контакту разом із відповідною іконкою */}
        <p className={styles.contactCardItem}>
          <FaPhoneAlt className={styles.iconPhone} />
          {number}
        </p>
      </div>
      {/* Кнопка для видалення контакту */}
      <button
        className={styles.deleteButton}
        type="button"
        onClick={() => onDelete(id)} // Викликає функцію видалення з переданим ID при кліку на кнопку
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
