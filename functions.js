

function click(elementId,fn){
  var element=document.getElementById(elementId);
  if(element){ /* check if element exist*/
    element.addEventListener("click",fn);
                            /*event,function written executed*/
  }
}


function redirect(path){
    window.location=path;
    return false;
}

function logInWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
  //  var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    // create user
    createUser(user.uid,user.displayName,user.email);

  }).catch(function(error) {
    console.log(error.message);
  });
}
function logInUser(){
  // log in google using firebase
  logInWithGoogle();
  //redirect("chat.html");
}

function createUser(uid,uname,uemail){

  // Get a reference to the database service
  var database = firebase.database();
  var usersRef=database.ref("users");

  var user={
      id: uid,
      name: uname,
      email: uemail //value retervied from parameter

  };

// then method promise object called once when user is created
  usersRef.child(uid).set(user).then(function(){
    redirect("chat.html");
  });
}

function ifUserIsLoggedIn(fn){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in window  object property declared as global in page
      //console.log(user);
       window.currentUser={
         id: user.uid,
         name: user.displayName,
         email: user.email
       };
       fn();
    } else {
      // No user is signed in.
    }
  });
}

function getElement(id){
  return document.getElementById(id);
}

function updateUserData(){
  var usernameElement=getElement("username");
  usernameElement.textContent=window.currentUser.name; // wrap user namee current
}

function loadUsers(fn){
  var database=firebase.database();
  var usersRef=database.ref("users");

  usersRef.on('value',function(snapshot){
    var users=snapshot.val();
    fn(users);
  }); // make real time

}

function renderUser(user){
  var uid=user.id;

  var chat_id=getChatId(window.currentUser.id,uid);

  var name=user.name;
  var html='<div id="'+chat_id+'"class="member">'+name+' </div>';
    return html;
}
/*update and create database if not exist create present the update*/


/*
  generally do this
*/
  function getChatId(id1,id2){
  if(id1 > id2){
    return id1+""+id2;
  }
  return id2+""+id1;
}


function onClickMultiple(className, func) {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains(className)) {
            func(event.target);
        }
    });
}

function loadMessages(chat_id,fn){
  var database=firebase.database();
  var chatsRef=database.ref("chats");

  chatsRef.child(chat_id).on('value',function(snapshot){
    var messages=snapshot.val();
    fn(messages);
  }); // make real time
}

function renderMessage(message){
  var text=message.text;
  var msgClass="message";
  if(message.sender_id==window.currentUser.id){
    msgClass="by-user";
  }
  var html='<div class="msgClass">'+text+'</div>'
  return html;
}


function sendMessage(chat_id,text){
  var message={
    text: text,
    sender_id: window.currentUser.id
  };

  var database=firebase.database();
  var chatsRef=database.ref("chats");
  var chat=chatsRef.child(chat_id);
  var newMessageId=chatsRef.push().key;
  chat.child(newMessageId).set(message);
}
