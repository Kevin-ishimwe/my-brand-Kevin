// login validation
const login_btn=document.querySelector('.log_btn')
login_btn.onclick=(e)=>{
    e.preventDefault()
    validateLogin()
    
}


function validateLogin(){
    const loginForm=document.forms.login
    if(loginForm.checkValidity()==true){
        window.location.href="./dashboard.html"       
    }
    else{
        if(loginForm[0].checkValidity()==false){
            loginForm.reportValidity()
            loginForm[0].focus()
        }
        else if(loginForm[1].checkValidity()==false){
            loginForm.reportValidity()
            loginForm[1].focus()
        }
    }
}
