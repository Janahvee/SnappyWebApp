ifUserIsLoggedIn(function(){
  // update the data of user
  updateUserData();

  loadUsers(function(users){
    var usersList="";

    for(var uid in users){ // iterate all user in your application
      var user=users[uid];

      /* if the user is not the currentUser then add it in list*/

      if(window.currentUser.id !=uid)
        usersList+=renderUser(user);
      //console.log(user);
    }
    getElement("members").innerHTML=usersList;
    //console.log(users);
  });

  onClickMultiple("member",function(element){
    var chat_id=element.id;
    loadMessages(chat_id,function(messages){

      var messagesList="";

      for(var uid in messages){ // iterate all user in your application
        var message=messages[uid];

        /* if the user is not the currentUser then add it in list*/


          messagesList+=renderMessage(message);

        //console.log(user);
      }
      getElement("messages").innerHTML=messagesList;
    });

    getElement("chat_id").value=chat_id;
  });

  click("send-button",function(){
    var text=getElement("message-text").value;
    var chat_id=getElement("chat_id").value;

    sendMessage(chat_id,text);

  });
});
