import {initializeApp} from 'firebase/app'
import{
getFirestore,collection,getDoc,deleteDoc,doc ,addDoc,onSnapshot,
}from"firebase/firestore"
import{ getDownloadURL, getStorage,ref as sRef,uploadBytes }from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8-qE8gQuuIDUlLNpVfEyjAhcIqMg2KmA",
    authDomain: "my-brand-kevin.firebaseapp.com",
    projectId: "my-brand-kevin",
    storageBucket: "my-brand-kevin.appspot.com",
    messagingSenderId: "324812051694",
    appId: "1:324812051694:web:e33833a9c404d09b9c4fff",
    measurementId: "G-RW45H3518E"
  };
  //init firebase app
  initializeApp(firebaseConfig)
  //init firebase services
  const db =getFirestore()

  //collection reference
  //init storage
    const colRefmessages=collection(db,'messages')
    const colRefBlog=collection(db,'blogs')
    //real time collection of  blog data
    var blogs_data=[]
       let fetchData =new Promise(function(data,err){
           onSnapshot(colRefBlog, async(snapshot)=>{
                await snapshot.docs.forEach((doc)=>{
                blogs_data.push({...doc.data(),id:doc.id})
            })
            data(blogs_data)
            err("fetching resourses failed")
        })
           }
       )


    var imageLink;
    //adding a blog document to db
    const blogForm=document.querySelector('.new_blog')
    if(blogForm!=null){
        blogForm.onsubmit=(e)=>{
            e.preventDefault()
            document.querySelector(".animation").style.display="grid"
            console.log("uploading now")
           
            if(blogForm.checkValidity()==true){
                 //adding an image to cloud storage
            console.log("upload started")
            const file=document.querySelector(".new_blog_img").files[0]
            const name =file.name
            const meta={
            contentType:file.type }
            const storage=getStorage() 
            const storageRef=sRef(storage,'images/'+name)
            
            uploadBytes(storageRef,file,meta).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((url)=>{
                    imageLink=url
                    console.log(imageLink)
        
                 //adding everything to the data base
        
                addDoc(colRefBlog,{
                title:blogForm.title.value,
                blogImg: imageLink,
                description:blogForm.desc.value,
                content:document.querySelector(".ql-editor").innerHTML
            }).then(()=>{
                blogForm.reset()
                location.reload()
                document.querySelector(".ql-editor").innerHTML=''
                console.log("document added")
            })
                })
            }).catch((err)=>{
                console.log(err)
        
            })
            }
            
           }
           
    } 

    
//________________homepage showing_____________________________//
const blog_all=document.querySelector(".blog_all")
if(blog_all!=null){ 
    fetchData.then((data)=>{
        var blogsData=data
        document.querySelector(".landing_page")!=null?blogsData=data.splice(0,4):console.log(null)
        blog_all.innerHTML=blogsData.map(({blogImg,title,id})=>{
            var id_b
            if(document.querySelector(".name")){
                id_b=`./otherPages/blog.html?id=${id}`
                 console.log(id_b)

            }
            else{
                id_b=`./blog.html?id=${id}`
                console.log(id_b)
            }
            
        return(`<div class="blog_cont">
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${title}</p>
                <a href="${id_b}" class="read_blog">READ BLOG</a>
                </div>`)
        
       }).join('')
       console.log("we are here")
       if(document.querySelector(".animation")){
        document.querySelector(".animation").style.display="none"
       }
       
    })    
}

//_____________________________________showing a single blog____________________________//
const single_blog=document.querySelector(".blog_left")
if(single_blog!=null){
    const blogId=location.search.split("=")[1]
        //_________showing a singe blog________//
        fetchData.then((data)=>{
            console.log(data)
            data.filter((element,index)=>{
                if (element.id==blogId){
                 
                    single_blog.innerHTML=(`
                    <h3 class="blog_hd">${data[index].title}</h3>
                    <p class="author">author:Ishimwe Kevin</p>
                    <img src="${data[index].blogImg}" class="blog_img_single">
                    <h2 style="overflow:none;padding: 2% 0%;
                    font-size: x-large;
                    font-weight: 500;
                    color: #00034a;">${data[index].description}</h2>
                ${data[index].content} `)
                }
             
            })
            document.querySelector(".animation").style.display="none"
            //______________side nav blogs________________
            const more=(data.splice(0,4))
            document.querySelector(".more_blogs").innerHTML=more.map(({blogImg,title,description,id})=>{
             
                return(`
                <div class="blog_visit">
                <img src="${blogImg}" class="more_blogs_img" alt="">
                <div class="more_blog_txt">
                    <h3 class="blog_more_title" 
                    style="overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    "
                    >${title} </h3>
                <a href="./blog.html?id=${id}" style="overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp:3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                ">${description}</a>
                </div>
                </div>
                `)
            })
        })   
        // when they click on different blog
    window.addEventListener('hashchange', function() {
        this.location.reload()
    });   
}
//____________________________blog manage_____________//
const blog_manage=document.querySelector(".blog_manage")
if(blog_manage!=null){
    fetchData.then((data)=>{

        blog_manage.innerHTML=data.map(({blogImg,title,id})=>{
      
        return(`
            <div class="blog_cont" id=${id}>
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${title}</p>
                <div class="manage_icons">
                <i class="fas fa-edit" style="color: blue;font-size: x-large;" id=${id}></i>
                <i class="fa-sharp fa-solid fa-trash" style="color: red; font-size: x-large;" id="delMe" title=${id} "></i>
                </div>
            </div>
        `)
     
       }).join("")
       document.querySelector(".animation").style.display="none"
       //__________________delete blogs_________________________________________//
       document.querySelectorAll("#delMe").forEach((item)=>{
        item.onclick=(e)=>{
            document.querySelector(".are_you_sure").style.display="grid"
            document.querySelector(".cancel_action_btn").onclick=()=>{
                document.querySelector(".are_you_sure").style.display="none"
            }
            document.querySelector(".delete_action_btn").onclick=()=>{
                document.querySelector(".are_you_sure").style.display="none"           
                document.querySelector(".animation").style.display="grid"
                console.log(e.target.title)
                let id=e.target.title
                
                deleteDoc(doc(db,'blogs',id)).then(()=>{
                
                    console.log("doc deleted")
                    location.reload()
                
                }).catch((err)=>{

                })
            }
            }
       })
    })
















}
//___________________manage contact queries _______________________//
//adding queries messages
const contactPage=document.forms.contact_page

if(contactPage!=null){
 
    contactPage.onsubmit=(e)=>{
        console.log(contactPage)
        e.preventDefault()
        document.querySelector(".contact_btn").innerHTML="LOADING..."
        console.log( "here yaaaaaa")
             addDoc(colRefmessages,{
         name:contactPage[0].value,
         email:contactPage[1].value,
         content:contactPage[2].value
         }).then(()=>{
      document.querySelector(".contact_btn").innerHTML="SENT"
      document.querySelector(".contact_btn").style.background="green"
    
             contactPage.reset()

         }).catch((err)=>{
            document.querySelector(".contact_btn").innerHTML="FAILED"
            console.log(err)
         })
    }
}
const messageQueries=document.querySelector(".messages")
if(messageQueries){
    const messages=[]
    onSnapshot(colRefmessages,(data)=>{
        data.docs.forEach((item)=>{
            messages.push(item.data())
        })
        console.log(messages)
        messageQueries.innerHTML=messages.map(({content,name,email})=>{
            return `
            <div class="message_box">
                <i class="fa-solid fa-message" id="message_icon"></i>
                <div class="message_info">
                    <h3 class="sender_name">${name}</h3>
                    <p class="sender_email">${email}</p>
                    <p class="message_content">${content}</p>
                </div>
                
            </div>
            `
        })
    })
    
    

}
