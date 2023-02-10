const blogId = location.search.split("=")[1];
const updateform = document.forms.update_blog;
fetch(`https://fair-teal-chinchilla-tam.cyclic.app/singleblog/${blogId}`, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    updateform[0].value = data[0].blogTitle;
    updateform[1].value = data[0].blogDescription;
    document.getElementById("blogImg").src = data[0].blogImg;
    document.getElementById(
      "editor"
    ).outerHTML = `<div id=\"editor\" class=\"ql-container ql-snow\"><div class=\"ql-editor\" data-gramm=\"false\" data-placeholder=\"enter blog content here...\" contenteditable=\"true\">${data[0].blogContent}</div><div class=\"ql-clipboard\" tabindex=\"-1\" contenteditable=\"true\"></div><div class=\"ql-tooltip ql-hidden\"><a class=\"ql-preview\" target=\"_blank\" href=\"about:blank\"></a><input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\"><a class=\"ql-action\"></a><a class=\"ql-remove\"></a></div></div>`;
    data[0].blogContent;
    document.querySelector(".animation").style.display = "none";
    console.log(document.getElementById("editor"));
  });

updateform.onsubmit = async (e) => {
  e.preventDefault();
  document.querySelector(".animation").style.display = "grid";
  const body = new FormData();
  body.append("blogImg", document.querySelector(".new_blog_img").files[0]);
  body.append("blogTitle", updateform.title.value);
  body.append("blogDescription", updateform.desc.value);
  body.append("blogContent", document.querySelector(".ql-editor").innerHTML);
  console.log(body);
  await fetch(
    `https://fair-teal-chinchilla-tam.cyclic.app/updateblog/${blogId}`,
    {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
        token: `Bearer ${localStorage.token}`,
      },
      body: body,
      mode: "cors",
    }
  )
    .then((res) => res)
    .then((data) => {
      updateform.reset();
      document.querySelector(".animation").style.display = "none";
    });
  window.location.href = "./manageBlogs.html";
  console.log("update_blog");
};
