import { Formik, Form, Field, ErrorMessage } from 'formik'; // Модулі з Formik для роботи з формами
import * as Yup from 'yup'; // Бібліотека Yup для валідації форми
import { nanoid } from 'nanoid'; // Бібліотека Nanoid для генерації унікального ID
import { useId } from 'react'; // Xук useId для унікальних ідентифікаторів
import styles from './ContactForm.module.css';

// Створюємо схему валідації для форми
const FormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, '"Too Short!') // Мінімум 3 символи
    .max(50, 'Too Long Name!') // Максимум 50 символів
    .required('Required'), // Поле обов'язкове
  number: Yup.string()
    .matches(/^\d+$/, 'Only digits are allowed') // Тільки цифри дозволені
    .min(3, '"Too Short!')
    .max(50, 'Too Long Number!')
    .required('Required'),
});

// Початкові значення форми
const initialValues = {
  name: '',
  number: '',
  id: '',
};

// Компонент ContactForm відповідає за розмітку і додавання нового контакту
const ContactForm = ({ onAdd }) => {
  // Генеруємо унікальні ID для полів вводу
  const nameFieldId = useId();
  const numberFieldId = useId();

  // Функція обробки сабміту форми
  const handleSubmit = (values, actions) => {
    // Викликаємо функцію onAdd і передаємо їй новий контакт із згенерованим ID
    onAdd({ ...values, id: nanoid() });
    actions.resetForm(); // Очищаємо форму після додавання контакту
  };

  // Розмітка форми
  return (
    // Компонент Formik для створення форми
    <Formik
      initialValues={initialValues} // Початкові значення
      onSubmit={handleSubmit} // Обробка сабміту
      validationSchema={FormValidationSchema} // Схема валідації
    >
      <Form className={styles.form}>
        {/* Поле для вводу імені */}
        <div className={styles.labelErrorWrap}>
          <label htmlFor={nameFieldId} className={styles.label}>
            Name
          </label>
          {/* Виводимо помилку, якщо є проблеми з полем */}
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>
        <Field
          className={styles.formInput}
          type="text"
          name="name"
          id={nameFieldId}
        ></Field>
        {/* Поле для вводу номера телефону */}
        <div className={styles.labelErrorWrap}>
          <label htmlFor={numberFieldId} className={styles.label}>
            Number
          </label>
          <ErrorMessage
            className={styles.error}
            name="number"
            component="span"
          />
        </div>
        <Field
          className={styles.formInput}
          type="text"
          name="number"
          id={numberFieldId}
        ></Field>
        {/* Кнопка сабміту */}
        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
