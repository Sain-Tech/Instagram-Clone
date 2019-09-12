function animField(mElementId) {
  var mElement = document.getElementById(mElementId);
  var pos = 0;
  var cnt = 0;
  var id = setInterval(frame, 1);

  mElement.style.borderColor='red';

  function frame() {
    if(cnt == 85) {
      clearInterval(id);
    }
    else if(cnt > 0 && cnt <= 5) {
      pos--;
      mElement.style.left = pos + 'px'
    }
    else if(cnt > 5 && cnt <= 15) {
      pos++;
      mElement.style.left = pos + 'px'
    }
    else if(cnt > 15 && cnt <= 25) {
      pos--;
      mElement.style.left = pos + 'px'
    }
    else if(cnt > 25 && cnt <= 35) {
      pos++;
      mElement.style.left = pos + 'px'
    }
    else if(cnt > 35 && cnt <= 40) {
      pos--;
      mElement.style.left = pos + 'px'
    }
    cnt++;
  }
}

function applyMsg() {
  var emailphone = document.getElementById('emailorphone').value;
  var name = document.getElementById('name').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (!CheckInEmail('emailorphone')) {
    animField('emailorphone');
  }
  else {
    document.getElementById('emailorphone').style.borderColor='#efefef';
  }
  if (!CheckInUserName('username')) {
    animField('username');
  }
  else {
    document.getElementById('username').style.borderColor='#efefef';
  }
  if (!CheckInPassWord('password')) {
    animField('password');
  }
  else {
    document.getElementById('password').style.borderColor='#efefef';
  }

  if (CheckInEmail('emailorphone') && CheckInUserName('username') && CheckInPassWord('password')) {
    mboolean = true;
    alert("이메일 또는 휴대전화 번호: " + emailphone + "\n사용자 이름: " + username + "\n\n가입 완료!");
    document.getElementById('emailorphone').value='';
    document.getElementById('name').value='';
    document.getElementById('username').value='';
    document.getElementById('password').value='';

    document.location.assign('/login');
  }
}

function RegEmail(input) {
  var regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return (input != '' && input != 'undefined' && regExp.test(input));
}

function RegPhoneNo(input) {
  var regExp = /([0-9]{9,12})$/;
  return (input != '' && input != 'undefined' && regExp.test(input));
}

function RegUserName(input) {
  var regExp0 = /([a-zA-Z0-9_.]{1,255})$/;
  return (input != '' && input != 'undefined' && regExp0.test(input));
}

function RegPassWord(input) {
  var regExp = /([a-zA-Z0-9.;\-]{6,})$/;
  return (input != '' && input != 'undefined' && regExp.test(input));
}

function HiddenMsg(value, message) {
  if (value) {
    document.getElementById('wrongExp').innerHTML=message + '<br><br>';
    document.getElementById('wrongExp').style.visibility="visible";
    document.getElementById('wrongExp').style.position="relative";
  }
  else {
    document.getElementById('wrongExp').innerHTML=message;
    document.getElementById('wrongExp').style.visibility="hidden";
    document.getElementById('wrongExp').style.position="absolute";
  }
}

function CheckInEmail(mElement) {
  var valueIn = document.getElementById(mElement).value;
  if (valueIn == '' || valueIn == 'undefined') {
    //alert("email is empty!");
    HiddenMsg(1, "필수 입력 항목입니다.");
    return;
  }

  if (!RegEmail(valueIn)) {
    if (!RegPhoneNo(valueIn)) {
      //alert("wrong phone no. expression..");
      HiddenMsg(1, "휴대폰 번호가 정확하지 않습니다. 국가 번호를 포함하여 전체 전화번호를 입력해주세요.");
      return false;
    }
    else {
      //alert("good phone no! bb");
      HiddenMsg(0, "");
      return true;
    }
    //alert("wrong email expression..");
    HiddenMsg(1, "이메일 주소가 유효하지 않습니다.");
    return false;
  }
  else {
    //alert("good email! bb");
    HiddenMsg(0, "");
    return true;
  }
}

function CheckInUserName(mElement) {
  var valueIn = document.getElementById(mElement).value;
  if (valueIn == '' || valueIn == 'undefined') {
    HiddenMsg(1, "필수 입력 항목입니다.");
    return;
  }

  if(!RegUserName(valueIn)) {
    HiddenMsg(1, "사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.");
    return false;
  }
  else {
    HiddenMsg(0, "");
    return true;
  }
}

function CheckInPassWord(mElement) {
  var valueIn = document.getElementById(mElement).value;
  if (valueIn == '' || valueIn == 'undefined') {
    HiddenMsg(1, "필수 입력 항목입니다.");
    return;
  }

  if(!RegPassWord(valueIn)) {
    HiddenMsg(1, "6자 이상의 비밀번호를 만드세요.");
    return false;
  }
  else {
    HiddenMsg(0, "");
    return true;
  }
}
