const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail != confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.")
    isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.")
    isVerified = false;
  }

  if (signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    const login = {
      email: signupEmail,
      password: signupPassword
    }
    fetch('/signupuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.alert("Success! Account created.");
        window.location.href = `/uredjaji.html`;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        window.alert("Error occurred. Try again. " + errorMessage);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  const login = {
    email: email,
    password: password
  }
  fetch('/loginuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // If the response is OK, parse the response as JSON
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      window.alert("Success! Logged in.");
      window.location.href = `/uredjaji.html`;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      window.alert("Error occurred. Try again. " + errorMessage);
    });
});

signupButton.addEventListener("click", function () {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});