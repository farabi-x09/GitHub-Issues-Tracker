document.getElementById("login_btn").addEventListener("click", ()=>{
    // 1- get user input
    const input_usr_name = document.getElementById("input_usr_name");
    const inputUser = input_usr_name.value;
    console.log(inputUser);

    const input_usr_password = document.getElementById("input_usr_password");
      const inputPss = input_usr_password.value;
    console.log(inputPss);

    // 2- match user name and pass

    if(inputUser == "admin" && inputPss == "admin123"){
        alert("Login Successful");
        window.location.assign("./home.html");
    }
    else{
        alert("Login Failed!");
        return;

    };

});