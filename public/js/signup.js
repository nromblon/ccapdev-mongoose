/**
 * The following code is not used by default. 
 * See src/view/signup.hbs for instructions on how to use this script instead. 
 */
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");

  submitBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const form = new FormData(document.querySelector("#signup"));
    let formObj = {};
    for (const data of form) {
      formObj[data[0]] = data[1];
    }

    const jsonForm = JSON.stringify(formObj);
    console.log(jsonForm);

    fetch("/signup", {
      method: "POST",
      body: jsonForm,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log(`Server responded:`);
      console.log(res);
      if (res.redirected) {
        window.location.href = res.url; // change the URL of the current window/tab to the redirect URL specified by the server
      }
    }).catch(err => {
      console.error(err);
    });
  });
});
