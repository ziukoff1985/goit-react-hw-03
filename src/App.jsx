// Імпортуємо React-хуки та стилі
import { useState, useEffect } from 'react';
import './App.css';

import ContactListData from './assets/ContactListData.json'; // Початковий список контактів з файлу JSON
import ContactList from './components/ContactList/ContactList'; // Компонент для відображення списку контактів
import SearchBox from './components/SearchBox/SearchBox'; // Компонент для пошуку контактів
import ContactForm from './components/ContactForm/ContactForm'; // Компонент для додавання нового контакту

// Основна функція додатку
function App() {
  // Ініціалізуємо стан для списку контактів
  const [contacts, setContacts] = useState(() => {
    // Отримуємо збережені контакти з localStorage
    const savedContactsData = localStorage.getItem('contactList');
    // Якщо є збережені контакти, повертаємо їх (розпарсивши JSON), інакше використовуємо початкові дані (з файлу ContactListData.json)
    return savedContactsData ? JSON.parse(savedContactsData) : ContactListData;
  });

  // Використовуємо useEffect для збереження списку контактів у localStorage при кожній зміні списку (стану `contacts`)
  useEffect(() => {
    // Зберігаємо поточний стан контактів у localStorage у вигляді JSON-строки
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]); // Ефект спрацьовує при зміні `contacts`

  // Ініціалізуємо стан для пошуку контактів за ім'ям
  const [searchByName, setSearchByName] = useState(''); // Початковий фільтр порожній

  // Функція для додавання нового контакту
  const addNewContact = newContact => {
    // Оновлюємо стан контактів, додаючи новий контакт до попереднього списку
    setContacts(prevContacts => {
      return [...prevContacts, newContact]; // Повертаємо новий масив з усіма попередніми та новим контактом
    });
  };

  // Функція для видалення контакту за його ID
  const deleteContact = contactId => {
    // Оновлюємо стан контактів, відфільтровуючи (залишаючи) ті, що не відповідають переданому ID (видаленого елемента)
    setContacts(prevContacts => {
      // Повертаємо масив без видаленого контакту
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  // Функція для фільтрування списку контактів (за ім'ям)
  // Фільтруємо контакти методом filter(), які відповідають пошуковому запиту
  const visibleContacts = contacts.filter(contact => {
    // Порівнюємо ім'я контакту (у нижньому регістрі) з пошуковим запитом
    return contact.name.toLowerCase().includes(searchByName.toLowerCase());
  });

  // Рендеринг компонента
  return (
    <>
      <h1 className="title">Phonebook</h1> {/* Заголовок */}
      <ContactForm onAdd={addNewContact} />
      {/* Форма для додавання нового контакту */}
      <SearchBox value={searchByName} onFilter={setSearchByName} />
      {/* Поле для введення пошукового запиту */}
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      {/* Список видимих контактів */}
    </>
  );
}

export default App;
