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
    .matches(/^\d+$/, 'Only digits are allowed')
    .min(3, '"Too Short!')
    .max(50, 'Too Long Number!')
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
        <div className={styles.labelErrorWrap}>
          <label htmlFor={nameFieldId} className={styles.label}>
            Name
          </label>
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>
        <Field
          className={styles.formInput}
          type="text"
          name="name"
          id={nameFieldId}
        ></Field>

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

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
