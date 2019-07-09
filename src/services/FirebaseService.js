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
      async getData(){
        return firestore.collection("portfolio").get().then((docSnapshots) => {
          return docSnapshots.docs.map((doc) => {
              let data = doc.data()
              let id = doc.id
              return {id , data}
          })
        })
      },
      addData(title, image,content){
        return firestore.collection('portfolio').add({
          title,
          image,
          content,
          date: firebase.firestore.FieldValue.serverTimestamp()
        });
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
      }
  }