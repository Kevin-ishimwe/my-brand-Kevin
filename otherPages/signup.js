// sign up validation
const signup_btn = document.querySelector(".signup_btn");
signup_btn.onclick = (e) => {
  e.preventDefault();
  validateSignUp();
};
function validateSignUp() {
  const signUpForm = document.forms.signup;

  if (signUpForm.checkValidity() == true) {
    if (signUpForm[1].value == signUpForm[2].value) {
      signUpForm[3].textContent = "LOADING...";
      fetch("https://fair-teal-chinchilla-tam.cyclic.app/adduser", {
        method: "POST",
        headers: {
          Accept: "application/json,text/plain,*/*",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: signUpForm[0].value,
          password: signUpForm[1].value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          signUpForm[3].textContent = "SIGN UP";
          window.location.href = "./login.html";
        });
    } else {
      alert("passwords don't match");
      signUpForm[2].focus();
    }
  } else {
    if (signUpForm[0].checkValidity() == false) {
      signUpForm.reportValidity();
      signUpForm[0].focus();
    } else if (signUpForm[1].checkValidity() == false) {
      signUpForm.reportValidity();
      signUpForm[1].focus();
    } else if (signUpForm[2].checkValidity() == false) {
      signUpForm.reportValidity();
      signUpForm[2].focus();
    }
  }
}
