import JustValidate from 'just-validate'

const validation = new JustValidate('#form-contacts', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    color: '#FF3030',
  },
})

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Поле должно содержать не менее 3 символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Поле должно содержать не более 30 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Недопустимый формат',
    },
    {
      rule: 'customRegexp',
      value: /^[а-яё -]+$/i,
      errorMessage: 'Введите кирилицей',
    }
  ])
  .addField('#email-2', [
    {
      rule: 'required',
      errorMessage: 'Недопустимый формат',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])
  .addField('#textarea', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Поле должно содержать не менее 3 символов',
    },
    {
      rule: 'maxLength',
      value: 300,
      errorMessage: 'Поле должно содержать не более 300 символов',
    },
    {
      rule: 'required',
      errorMessage: 'Недопустимый формат',
    },
  ])
