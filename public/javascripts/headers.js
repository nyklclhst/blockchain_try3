function ready(){
    var url = window.location.href;
    url = url.split('/');
    $('.nav li a[href="'+url[3]+'"]').addClass('active');
    if(document.getElementById('msg').innerHTML == "user ada"){
      document.getElementById('profile').hidden = false;
    }
  }