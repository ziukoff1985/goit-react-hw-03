// Імпортуємо необхідні функції та компоненти
import { useState, useEffect } from 'react';
import './App.css';
// Початковий список контактів з файлу JSON
import ContactListData from './assets/ContactListData.json';
import ContactList from './components/ContactList/ContactList'; // Компонент для відображення списку контактів
import SearchBox from './components/SearchBox/SearchBox'; // Компонент для пошуку контактів
import ContactForm from './components/ContactForm/ContactForm'; // Компонент для додавання нового контакту

// Основна функція додатку
function App() {
  // Ініціалізуємо стан для контактів
  const [contacts, setContacts] = useState(() => {
    // Отримуємо збережені контакти з localStorage
    const savedContactsData = localStorage.getItem('contactList');
    // Якщо є збережені контакти, повертаємо їх (розпарсивши JSON), інакше використовуємо початкові дані
    return savedContactsData ? JSON.parse(savedContactsData) : ContactListData;
  });

  // Використовуємо useEffect для збереження списку контактів у localStorage при кожній зміні списку
  useEffect(() => {
    // Зберігаємо поточний стан контактів у localStorage у вигляді JSON-строки
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]); // Ефект спрацьовує при зміні `contacts`

  // Ініціалізуємо стан для пошукового запиту
  const [filter, setFilter] = useState(''); // Початковий фільтр порожній

  // Функція для додавання нового контакту
  const addNewContact = newContact => {
    // Оновлюємо стан контактів, додаючи новий контакт до попереднього списку
    setContacts(prevContacts => {
      return [...prevContacts, newContact]; // Повертаємо новий масив з усіма попередніми та новим контактом
    });
  };

  // Функція для видалення контакту
  const deleteContact = contactId => {
    // Оновлюємо стан контактів, відфільтровуючи (залишаючи) ті, що не відповідають переданому ID (видаленого елемента)
    setContacts(prevContacts => {
      // Повертаємо масив без видаленого контакту
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  // Функція для фільтрування списку контактів
  // Фільтруємо контакти, які відповідають пошуковому запиту
  const visibleContacts = contacts.filter(contact => {
    // Порівнюємо ім'я контакту (у нижньому регістрі) з пошуковим запитом
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  // Рендеринг компонента
  return (
    <>
      <h1 className="title">Phonebook</h1> {/* Заголовок */}
      <ContactForm onAdd={addNewContact} />{' '}
      {/* Форма для додавання нового контакту */}
      <SearchBox value={filter} onFilter={setFilter} />{' '}
      {/* Поле для введення пошукового запиту */}
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />{' '}
      {/* Список видимих контактів */}
    </>
  );
}

export default App;
