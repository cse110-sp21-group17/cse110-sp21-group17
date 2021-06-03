
export class FBService {

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

     static getInstance() {
        if(!this.instance) {
            this.instance = new FBService()
        }
        return this.instance
    }
    
    getUserGoals(fn) {
        const uid = firebase.auth().currentUser.uid

        let ref = uid +"/goals"
        firebase.database().ref().child(ref)
          .get()
          .then((snapshot) => {
            fn(snapshot.val())
          })
          .catch((error) => {
            console.log('No current user' + error.message)
          })
    }

    getUserDateTasks(fn, errfn) {
        const uid = firebase.auth().currentUser.uid

        let ref = uid +"/dates"
        firebase.database().ref().child(ref)
          .get()
          .then((snapshot) => {
            console.log("dates are " + snapshot)
            fn(snapshot.val())
          })
          .catch((error) => {
            console.log('No current user' + error.message)
            errfn(error.message);
          })
    }

    createGoals(goalName, goalDate, tasks, goalNote, imgaeFile=null, fn) {

        const uid = firebase.auth().currentUser.uid

        var _this = this;
        // first save the image
        var imgUrl = null;
        if (imgaeFile != null) {
            this.saveImage(imgaeFile, goalName + goalDate, (url)=>{
                imgUrl = url


                let goalRef = uid +"/goals" + "/" + goalName
                var goalObj = {
                    name: goalName,
                    date: goalDate,
                    tasks: tasks,
                    note: goalNote,
                    imgUrl: imgUrl
                }
                // save the goal to the server
        
                this.updateData(goalRef, goalObj, ()=>{
                    console.log("goals upload success");
        
                    for (var i = 0; i < tasks.length; i++) {
                        let date = tasks[i]['date']
                        let name = tasks[i]['name']
                        var taskObj = {
                            name: name,
                            date: date,
                            goal: goalName,
                            note: goalNote,
                            imgUrl: imgUrl,
                            subTasks:[]
                        }
                        let ref = uid + "/tasks" + "/" + name
                       
                        // save the task to the server
                        _this.updateData(ref, taskObj, ()=>{
                            console.log("task upload success");
        
                            var dateObj = {
                                date: date,
                                taskName: name,
                                goal: goalName,
                                note: goalNote,
                                imgUrl: imgUrl,
                                subTasks:[]
                            }
                            let dateRef = uid +"/dates" + "/"+ date
                          
                            // save the dates of tasks to the server
                            _this.updateData(dateRef, dateObj, ()=>{
                                console.log("date upload success");
                                fn()
                            })   
                        })
                    }
                })

            })
        }
       
    }

    createTasks(taskName, taskDate, subTasks, goalName, taskNote, imgaeFile=null, fn) {
        const uid = firebase.auth().currentUser.uid

        var imgUrl = null;
        var _this = this;

        if (imgaeFile != null) {
            this.saveImage(imgaeFile,taskName + goalName + taskDate, (url)=>{
                imgUrl = url

                var taskObj = {
                    name: taskName,
                    date: taskDate,
                    goal: goalName,
                    note: taskNote,
                    imgUrl: imgUrl,
                    subTasks:subTasks
                }
        
                let ref = uid + "/tasks/" + taskName
        
             // save the task to the server
                _this.updateData(ref, taskObj, ()=>{
                    console.log("task upload success");

                    let dateRef = uid + "/dates" + "/"+ taskDate
        
                    var dateObj = {
                        date: taskDate,
                        taskName: taskName,
                        goal: goalName,
                        note: taskNote,
                        imgUrl: imgUrl,
                        subTasks:subTasks
                    }
            
                    // save the dates of tasks to the server
                      _this.updateData(dateRef, dateObj, ()=>{
                          console.log("date upload success");
                         fn()

                    })   
                })
            })
        }
    }


    saveImage(imageFile, name, fn) {
        const uid = firebase.auth().currentUser.uid

        const refStr = uid + '/' + name +'/'+ Date.now().toString().slice(-8); //unique image url with timestamp
        let storageRef = firebase.storage().ref(refStr)
        storageRef.put(imageFile)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => fn(url))
    }

    registerUser(name, email, password, fn) {
        let userObj = {
            name: name,
            email:email
        }

        var _this = this;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((info) => {
            //name bind to this user id 
            _this.updateData("userMap/"+name, userObj, ()=>{
                fn({userObj})
            })         
          })
          .catch((error) => {
            console.log('Register user failed:' + error.message)
          })
    }

    loginUser(name, email, password, fn, errorfn) {
        let userObj = {
            name: name,
            email:email
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((info) => {
            fn(userObj)
        })
        .catch((e) => {
            console.log("------- login fail ----- " + e.message)
            errorfn("error")
        })
    }

    fetchData(ref, fn, errfn) {
        firebase.database().ref().child(ref)
          .get()
          .then((snapshot) => {
            console.log("snapshot ---- " + snapshot)
            if (snapshot.exists()) {
              fn(snapshot.val())
            } else {
              console.log('No current user')
              errfn("no user")
            }
          })
          .catch((error) => {
            errfn("no user")
          })
    }


    updateData(ref, userObj, fn) {
        firebase.database().ref(ref)
        .set(userObj)
        .then(()=>{
             fn()
        })
        .catch((error) => {
            console.log('Map user failed:' + error.message)
        })
    }


}

// web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBAmnyb-fUH_pjLS3bgeYVkLcCvsapqLQU",
    authDomain: "chimplanzee-9af74.firebaseapp.com",
    databaseURL: "https://chimplanzee-9af74-default-rtdb.firebaseio.com",
    projectId: "chimplanzee-9af74",
    storageBucket: "chimplanzee-9af74.appspot.com",
    messagingSenderId: "382340562173",
    appId: "1:382340562173:web:555120ff199ce69afa1294"
};