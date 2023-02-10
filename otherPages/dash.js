// .dashboard control view
const dash_btn = document.getElementById("dash_menu");
var count = 0;
visualViewport.width < 801 ? count++ : (count = count);
dash_btn.onclick = () => {
  count++;

  if (count % 2 != 0) {
    dash_btn.classList = "fa-solid fa-angles-right";
    document.querySelectorAll(".dashboard_link").forEach((item) => {
      item.style.display = "none";
    });
    document.querySelector(".logo").style.cssText =
      "padding:6px 15px;margin:3% 0%";
    document.querySelector(".dash_left").style.cssText =
      "width: 3em ;min-width:2em";
    if (visualViewport.width > 800) {
      document.querySelector(".dash_right").style.cssText = "margin-left:5em";
    }
  } else {
    console.log("back");
    document.querySelector(".logo").style.cssText =
      "padding:8px 20px;margin:1% 10%";
    document.querySelector(".dash_left").style.cssText =
      "min-width:15em;width:20vw";
    if (visualViewport.width > 800) {
      document.querySelector(".dash_right").style.cssText = "width: 70vw ;";
    }
    dash_btn.classList = "fa-solid fa-angles-left";
    document.querySelectorAll(".dashboard_link").forEach((item) => {
      item.style.display = "inline";
    });
  }
};
if (localStorage.token == null) {
  window.location.href = "./login.html";
}
const messageQueries = document.querySelector(".messages");
if (messageQueries != null) {
  const getMessages = fetch(
    "https://fair-teal-chinchilla-tam.cyclic.app/getmessages",
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.token}`,
      },
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "failed") {
        window.location.href = "./login.html";
      } else {
        messageQueries.innerHTML = data.map(({ content, name, email, _id }) => {
          document.querySelector(".animation").style.display = "none";
          return `
              <div class="message_box">
                  <i class="fa-solid fa-message" id="message_icon"></i>
                  <div class="message_info" style="width:100%">
                  <h3 class="sender_name">${name}</h3>
                  <p class="sender_email">${email}</p>
                  <p class="message_content">${content}</p>
                  </div>
                  <div style="width:fit-content">
                  <i class="fa-sharp fa-solid fa-trash" style="color: red; font-size: x-large;  " id="delMe" title=${_id} "></i>
                  </div>
                  </div>
              `;
        }).join("")
      }
      document.querySelectorAll("#delMe").forEach((item) => {
        item.onclick = async () => {
          document.querySelector(".animation").style.display = "grid";
          console.log(item.title);
          await fetch(
            `https://fair-teal-chinchilla-tam.cyclic.app/deletemessage/${item.title}`,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: `Bearer ${localStorage.token}`,
              },
              mode: "cors",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              document.querySelector(".animation").style.display = "none";
              location.reload();
            });
        };
      });

      console.log(data);
    });
}

const blogForm = document.querySelector(".new_blog");
if (blogForm != null) {
  blogForm.onsubmit = (e) => {
    e.preventDefault();
    document.querySelector(".animation").style.display = "grid";
    const body = new FormData();
    body.append("blogImg", document.querySelector(".new_blog_img").files[0]);
    body.append("blogTitle", blogForm.title.value);
    body.append("blogDescription", blogForm.desc.value);
    body.append("blogContent", document.querySelector(".ql-editor").innerHTML);
    console.log(body);

    fetch("https://fair-teal-chinchilla-tam.cyclic.app/addblog", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
        token: `Bearer ${localStorage.token}`,
      },
      mode: "cors",
      body: body,
    })
      .then((r) => r.json())
      .then((data) => {
        blogForm.reset();
        location.reload();
        document.querySelector(".animation").style.display = "none";
        console.log(data);
      });
  };
}

const blog_manage = document.querySelector(".blog_manage");
if (blog_manage != null) {
  fetch("https://fair-teal-chinchilla-tam.cyclic.app/getblogs", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".animation").style.display = "none";
      blog_manage.innerHTML = data.map(({ blogImg, blogTitle, _id }) => {
        return ` <div class="blog_cont" id=${_id}>
                <img src=${blogImg} alt="" class="blog_img">
                <p class="blog_desc">${blogTitle}</p>
                <div class="manage_icons">
                <a href="./update_blog.html?id=${_id}">
                <i class="fas fa-edit" style="color: #46487b;font-size: larger;" id=${_id}></i>
                </a>
                <i class="fa-sharp fa-solid fa-trash" style="color: red; font-size: x-large;" id="delMe" title=${_id} "></i>
                </div>
            </div>`;
      }).join("")
      console.log(document.querySelectorAll("#delMe"));
      document.querySelectorAll("#delMe").forEach((item) => {
        item.onclick = (e) => {
          document.querySelector(".are_you_sure").style.display = "grid";
          document.querySelector(".cancel_action_btn").onclick = () => {
            document.querySelector(".are_you_sure").style.display = "none";
          };
          document.querySelector(".delete_action_btn").onclick = async () => {
            document.querySelector(".are_you_sure").style.display = "none";
            document.querySelector(".animation").style.display = "grid";

            await fetch(
              `https://fair-teal-chinchilla-tam.cyclic.app/deleteblog/${e.target.title}`,
              {
                method: "delete",
                headers: {
                  "Access-Control-Allow-Credentials": true,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  token: `Bearer ${localStorage.token}`,
                },
                mode: "cors",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                document.querySelector(".animation").style.display = "none";
                console.log(data);
              });
          };
        };
      });
    });
  //__________________delete blogs_________________________________________//
}
