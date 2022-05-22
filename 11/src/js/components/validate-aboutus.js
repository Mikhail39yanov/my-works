import JustValidate from 'just-validate'

const validation = new JustValidate('#form-aboutus', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    color: '#F06666',
  },
})

validation
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Недопустимый формат',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])
