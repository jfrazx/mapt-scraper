function signIn(email, password) {
  var form = Array.from(document.querySelectorAll('form')).find(function(form) {
    return form.name === 'sign-in-form';
  });

  document.querySelector('#login-input-email').value = email;
  document.querySelector('#login-input-password').value = password;

  form.id = 'form-login';

  form.querySelector('button').click();
}

module.exports = signIn;
