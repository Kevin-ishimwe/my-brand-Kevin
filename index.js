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
        }
        else{
            document.querySelector(".nav_ul").style.transform=" translateY(-100%)"
            menu_btn.classList="fas fa-bars"
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
