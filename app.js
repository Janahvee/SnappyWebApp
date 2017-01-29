click("signin-button",logInUser);



 /* array of user registered on database*/
// we need to access name from database
/*
  get undefined error if only write below code
  console.log("databaseRef.name");

  on is method
  snapshot : stage of data how your data looks
*/

/*databaseRef.on("value",function(snapshot){
console.log(snapshot.val()); /* you can't read value directly to read use method val()
});*/

/*userRef.on("value",function(snapshot){
console.log(snapshot.val()); /* you can't read value directly to read use method val()
});*/

/*
databaseRef.set({
   email: "jrshah15396@gmail.com"
});
because we called set it overwrite previous data
so we create :*/
/*var userRef=database.ref("users");  array of user registered on database*/

/*userRef.child("1234").set({ // 1234 key to this email id
  email:"jrshah@gmail.com"
});*/

// when something changes your app work and change it in real time
/*like whatsapp nd facebook app retrive automatically message when its added to server*/
