// login validation
const login_btn = document.querySelector(".log_btn");
login_btn.onclick = async (e) => {
  e.preventDefault();
  const loginForm = document.forms.login;
  if (loginForm.checkValidity() == true) {
    login_btn.textContent = "LOADING...";
    await fetch("https://fair-teal-chinchilla-tam.cyclic.app/login", {
      method: "POST",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-type": "application/json",
      },

      withCredentials: true,
      body: JSON.stringify({
        email: loginForm[0].value,
        password: loginForm[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        login_btn.textContent = "LOGIN";
        const snackbar = document.querySelector(".snackbar");
        snackbar.style = "display:grid";
        snackbar.firstElementChild.textContent = data.message;
        if (data.status == "sucess") {
          snackbar.style.background = "green";
          setTimeout(() => {
            snackbar.style = "display:none";
            console.log(data);
            localStorage.setItem("token", data.token);
            window.location.href = "./dashboard.html";
          }, [1500]);
        }

        setTimeout(() => {
          snackbar.style = "display:none";
        }, [3500]);
      });
  } else {
    if (loginForm[0].checkValidity() == false) {
      loginForm.reportValidity();
      loginForm[0].focus();
    } else if (loginForm[1].checkValidity() == false) {
      loginForm.reportValidity();
      loginForm[1].focus();
    }
  }
};
