import React from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from './getValidationErrors';

interface FormInterface {
  formRef: React.RefObject<FormHandles>;
  data: {};
}

const inputValidation = async ({
  formRef,
  data,
}: FormInterface): Promise<void> => {
  try {
    formRef.current?.setErrors({});
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      password: Yup.string().min(6, 'No mínimo 6 digitos'),
    });
    await schema.validate(data, {
      abortEarly: false,
    });
    // formRef.current?.reset();
  } catch (err) {
    const errors = getValidationErrors(err);
    formRef.current?.setErrors(errors);
    // formRef.current?.reset();
  }
};
export default inputValidation;
