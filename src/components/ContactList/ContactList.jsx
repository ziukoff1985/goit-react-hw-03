// Імпортуємо компонент Contact
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

// Компонент ContactList -> відповідає за відображення списку контактів
const ContactList = ({ contacts, onDelete }) => {
  // Повертаємо розмітку зі списком контактів
  return (
    <ul className={styles.contactList}>
      {/* Проходимо по списку контактів та відображаємо кожен з них */}
      {contacts.map(contact => (
        // Передаємо всі властивості контакту (spread-оператор) як пропси та функцію видалення
        <Contact key={contact.id} {...contact} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
