function check() {
    if (document.getElementById('fr_pass').value == document.getElementById('fr_pass1').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Password Matching';
      document.getElementById('br_submit').disabled = false;
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Password Not Matching';
      document.getElementById('br_submit').disabled = true;
    }
}

function validate(){
    if(document.getElementById('fr_pass').value.length < 8){
        document.getElementById('message1').style.color = 'red';
        document.getElementById('message1').innerHTML = 'Password must at least 8 character';
        document.getElementById('br_submit').disabled = true;
    } else {
        document.getElementById('message1').innerHTML = '';
        document.getElementById('br_submit').disabled = false;
    }
}

function ready(){
  if(document.getElementById('msg').innerHTML == "input card"){
    document.getElementById('daftar').hidden = true;
  }
  if(document.getElementById('msg').innerHTML == "user ada"){
    document.getElementById('daftar').hidden = true;
    document.getElementById('masuk').hidden = true;    
  }
}