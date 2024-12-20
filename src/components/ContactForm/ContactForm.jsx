import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useId } from 'react';
import styles from './ContactForm.module.css';

const FormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, '"Too Short!')
    .max(50, 'Too Long Name!')
    .required('Required'),
  number: Yup.string()
    .min(3, '"Too Short!')
    .max(50, 'Too Long Name!')
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
  id: '',
};

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormValidationSchema}
    >
      <Form className={styles.form}>
        <label htmlFor={nameFieldId} className={styles.label}>
          Name
        </label>
        <Field
          className={styles.formInput}
          type="text"
          name="name"
          id={nameFieldId}
        ></Field>
        <ErrorMessage name="name" component="span" />

        <label htmlFor={numberFieldId} className={styles.label}>
          Number
        </label>
        <Field
          className={styles.formInput}
          type="number"
          name="number"
          id={numberFieldId}
        ></Field>
        <ErrorMessage name="number" component="span" />

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
