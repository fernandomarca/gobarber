import React from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from './getValidationErrors';

type FormRef = React.RefObject<FormHandles>;

const InputValidation = async (formRef: FormRef, data: {}): Promise<void> => {
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
  } catch (err) {
    const errors = getValidationErrors(err);
    formRef.current?.setErrors(errors);
  }
};
export default InputValidation;
