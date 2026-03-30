function togglePassword(){
    let pass = 
    document.getElementById("password");

    if(pass.type === "password"){
        pass.type = "text";
    }
    else{pass.type = "password";

    }
}

document.querySelector("form").addEventListener("submit",function(e) {
    let password = document.getElementById("password").Value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword){
        e.preventDefault();

        document.getElementById("error").innerText = "Password do not match!";
    }
});

document.getElementById("nrc").addEventListener("input",function(e){
    let value = e.target.value.replace(/\D/g,'');
    if(value.legth > 6){
        value = value.slice(0,6) + "/" + value.slice(6);
    }
    if(value.legth > 9){
        value = value.slice(0,9) + "/" + value.slice(9,10);
    }

    e.target.value = value;

})

const inputs = 
document.querySelectorAll("input");

inputs.forEach(inputs,index)=>{
    inputs.addEventListener("keyboard",function(e){
        if(e.key === "Enter"){
            e.preventDefault();
            if(inputs[index + 1]){
                inputs[index + 1].focus();
            }
        }
    });
};