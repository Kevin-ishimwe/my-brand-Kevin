//nav 

window.addEventListener('scroll',()=>{
    var links=document.querySelectorAll('.nav_a')
    if(scrollY>600){
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
    menu_tracker++
    if(menu_tracker%2!=0){
        document.querySelector(".nav_ul").style.transform=" translateX(0%)"
        menu_btn.classList="fas fa-times"
    }
    else{
        document.querySelector(".nav_ul").style.transform=" translateX(-100%)"
        menu_btn.classList="fas fa-bars"
 

    }
   
}
window.onhashchange=()=>{
    console.log("chenged")
    document.querySelector(".nav_ul").style.transform=" translateX(-100%)"
        menu_btn.classList="fas fa-bars"
}