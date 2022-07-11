import React from 'react';
import styles from './Styles.module.scss';
//Form Imports
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Forms/FormikControl';

const ContributeModal = ({
  setShowModal,
  registerFormIsVisible,
  setRegisterFormIsVisible,
}) => {
  if (registerFormIsVisible) {
    return (
      <>
        <ContributeForm
          setShowModal={setShowModal}
          setRegisterFormIsVisible={setRegisterFormIsVisible}
        />
      </>
    );
  }

  return (
    <div className={styles.modal}>
      <div className={`${styles.modal__heading} modal_heading`}>
        <h2>
          Contribute <br />
          <span>Here</span>
        </h2>
        <button
          className={`closeBtn`}
          onClick={() => {
            setShowModal(false);
            setRegisterFormIsVisible(false);
          }}
        >
          &times;
        </button>
      </div>
      <div className={styles.modal__body}>
        <h1>ABOUT THE ORGANISATION</h1>
        <div className={styles.details_info}>
          <p>
            Our mission is to make it easy for you to contribute to the
            realisation of a great and working nation. All you have to do is
            sensitize 23 persons from your village to be a part of this
            movement.
          </p>
        </div>
        <button
          className="btn_dark"
          type="submit"
          // onClick={() => setRegisterFormIsVisible(true)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

const ContributeForm = ({ setShowModal, setRegisterFormIsVisible }) => {
  const stateOptions = [
    {
      label: 'Rivers',
      value: 'Rivers State',
    },
    {
      label: 'Lagos',
      value: 'Lagos State',
    },
    {
      label: 'Ogun',
      value: 'Ogun State',
    },
  ];
  const villageOptions = [
    {
      label: 'Ezeani Village 1',
      value: 'Ezeani Village',
    },
    {
      label: 'Osusus Village 2',
      value: 'Osusu Village',
    },
    {
      label: 'Ariara Village 3',
      value: 'Ariara Village',
    },
  ];

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    village: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    state: Yup.string().required('Required'),
    village: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Form Data', values);
  };

  return (
    <div className={styles.modal}>
      <div className={`${styles.modal__heading} modal_heading`}>
        <h2>
          Enter your <br />
          <span>Details</span>
        </h2>
        <button
          className={`closeBtn`}
          onClick={() => {
            setShowModal(false);
            setRegisterFormIsVisible(false);
          }}
        >
          &times;
        </button>
      </div>
      <div className={styles.modal__body}>
        <p>Kindly fill our your personal details</p>
        <div className={styles.details_form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form autoComplete="off">
                <FormikControl
                  values={values}
                  control="input"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                />
                <FormikControl
                  values={values}
                  control="input"
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                />
                <FormikControl
                  values={values}
                  control="input"
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                />
                <FormikControl
                  values={values}
                  control="select"
                  placeholder="Select your state"
                  name="state"
                  options={stateOptions}
                />
                <FormikControl
                  values={values}
                  control="select"
                  placeholder="Select your village"
                  name="village"
                  options={villageOptions}
                />
                <button
                  className="btn_dark"
                  type="submit"
                  // onClick={() => setShowModal(false)}
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;
