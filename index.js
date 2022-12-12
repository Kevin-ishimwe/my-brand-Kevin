//nav 
var links=document.querySelectorAll('.nav_a')
window.addEventListener('scroll',()=>{
  
    if(scrollY>590){
        if(visualViewport.width<500){
            menu_btn.style.color="#000d53"
        }
        else{
            links.forEach((item)=>{
                item.style.color="#000d53"
             })
        }
    }
    else{
        links.forEach((item)=>{
            item.style.color="white"
            menu_btn.style.color="white"
         })
    }

})
//hamburger menu
const menu_btn=document.getElementById("bars")
var menu_tracker=0
menu_btn.onclick=()=>{
    if(visualViewport.width<=500){
        menu_tracker++
        if(menu_tracker%2!=0){
            
            document.querySelector(".nav_ul").style.transform=" translateY(0%)"
            menu_btn.classList="fas fa-times"
            menu_btn.style.color="white"
            links.forEach((item)=>{
                item.style.color="white"
                menu_btn.style.color="white"
             })
            
        }
        else{
            document.querySelector(".nav_ul").style.transform=" translateY(-100%)"
            menu_btn.classList="fas fa-bars"
            if(scrollY>590){
                menu_btn.style.color="#000d53"
            }
            
        }

    }
    
  
   
}
//disappearing navigation menu
links.forEach((item)=>{
    item.onclick=()=>{
        if(visualViewport.width<501){
            document.querySelector(".nav_ul").style.transform=" translateY(-100%)"
            menu_btn.classList="fas fa-bars"
        }
        else{
            
        }
       
    }
})
//contact page validation
// login validation
const contact_btn=document.querySelector('.contact_btn')
contact_btn.onclick=(e)=>{
    e.preventDefault()
    validateContact()
}


function validateContact(){
    const contactForm=document.getElementById("contact_page")
    if(contactForm.checkValidity()==true){
        alert("successfully validated")           
    }
    else{
        if(contactForm[0].checkValidity()==false){
            contactForm.reportValidity()
            contactForm[0].focus()
        }
        else if(contactForm[1].checkValidity()==false){
            contactForm.reportValidity()
            contactForm[1].focus()
        }
        else if(contactForm[2].checkValidity()==false){
            contactForm.reportValidity()
            contactForm[2].focus()
        }
    }
}