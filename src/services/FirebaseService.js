import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyChmqagl7tl4fnHVPjnnD3VAOS9HR3ozuY",
    authDomain: "wmproject-9876.firebaseapp.com",
    databaseURL: "https://wmproject-9876.firebaseio.com",
    projectId: "wmproject-9876",
    storageBucket: "wmproject-9876.appspot.com",
    messagingSenderId: "590413267489",
    appId: "1:590413267489:web:cb8e3dff9051ba6e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  
  export default{
      async getPortfolio(){
        return firestore.collection("portfolio").get().then((docSnapshots) => {
          return docSnapshots.docs.map((doc) => {
              let data = doc.data()
              let id = doc.id
              return {id , data}
          })
        })
      },
      changeDate(nowDate){
        let time = 
        nowDate.getFullYear() + "-" +
        nowDate.getMonth() + "-" +
        nowDate.getDay() + " " +
        nowDate.getHours() + ":" +
        nowDate.getMinutes() + ":" +
        nowDate.getSeconds();
        return time;
      },
      async getPost(){
        return firestore.collection("post").get().then((docSnapshots) => {
          return docSnapshots.docs.map((doc) => {
              let data = doc.data()
              data.date = this.changeDate(new Date(data.date.toDate()));
              return data
          })
        })
      },
      async getPostSort(header,sortflag){
        return firestore.collection("post").orderBy(header, sortflag)
        .get().then((docSnapshots) => {
          return docSnapshots.docs.map((doc) => {
              let data = doc.data()
              let id = doc.id
              data.date = this.changeDate(new Date(data.date.toDate()));
              return {id , data}
          })
        })
      },
      addPortfolio(title, image,content){
        return firestore.collection('portfolio').add({
          title,
          image,
          content,
          date: firebase.firestore.FieldValue.serverTimestamp()
        });
      },
      addPost(title, content, writer){
        return firestore.collection('post').add({
          title,
          content,
          writer,
          date: firebase.firestore.FieldValue.serverTimestamp()
        });
      },
      addUser(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          alert("가입 성공!");
        });
      },async loginUser(email, password){
        return  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
          console.log("로그인 성공");
          return true;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          return false;
        });
      },loginSuccess(){
        if(firebase.auth().currentUser == null){
          return null;
        }else{
          return firebase.auth().currentUser.email;
        }
      },
      delData(){
        
      },
      async loginWithFacebook(){
        let provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider).then(function(result) {
          let token = result.credential.accessToken;
          let user = result.user;
          return result;
        }).catch();
      },
      logout(){
        firebase.auth().signOut();
      }
  }