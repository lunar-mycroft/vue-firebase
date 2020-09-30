
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDE_O5p2wYbsDnnqGga11XXZxpOp1nLmlI", //Most important part; adjust for each firebase account
    authDomain: "test-17c76.firebaseapp.com",
    databaseURL: "https://test-17c76.firebaseio.com",
    projectId: "test-17c76",
    storageBucket: "",
    messagingSenderId: "855722645833"
  };
  firebase.initializeApp(config); //Used to initialize the vue app with firebase

let db= firebase.firestore(); //Set the database to the firebase with Firestore function 

// Create Vue component
var todoList = new Vue({ //Establishing new Vue app
  el: '#todo', //This points to the html element that we mounting the Vue instance to 
  data: {
    newTodoText:'', //List of to dos  They have a test value 

    todos:[
      {
        text: 'Teach Firebase',
      }
    ],
  },
  created() { //Data function to create fetchTodos() function we are going to create to get the todo 
    this.fetchTodos();
  },
  methods: { //Next after data is the methods/functions we are going to use 
    
    addTodo() { //Add ToDos from db collection  .add adds an instance of the new todo value   This – refers to the current Vue instance
        
      return db.collection('todos')
      .add({
        text: this.newTodoText
      })
      .then((docRef)=>{ //Document reference in Firebase 
        this.newTodoText= ''; //New is blank
        this.fetchTodos(); //Fetch the current todos
      })
    },
      
    fetchTodos() { //Fetch the todos from database with .get()
      return db.collection('todos').get()
      .then(querySnapshot => //Query the database from the document in the map to display the id and text of each
        querySnapshot.docs.map(doc=>{ 
        let data = doc.data()
        return {
          id: doc.id,
          text: data.text,
      }
      }))
      .then(todos => this.todos = todos)
      
    },
    
    removeTodo(id) { //Remove the value based on the id looking in the collection based on id then delete function  return empty todo
        return db.collection('todos').doc(id)
        .delete()
        .then(()=> {
          return this.fetchTodos();
        })
       },
  }
})
  
