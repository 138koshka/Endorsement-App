// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { 
    databaseURL: "https://we-are-the-champions-a939b-default-rtdb.firebaseio.com/" 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentListInDB = ref(database, "commentListEl")

const inputFieldEl = document.getElementById("input-field")
const publishBtnEl = document.getElementById("publish-btn")
const commentListEl = document.getElementById("comment-list")

// publish and push event listener //

publishBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    push(commentListInDB, inputValue)
    
    clearInputFieldEl()
})

// snapshot loop from object //

onValue(commentListInDB, function(snapshot){
      if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearCommentListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToCommentListEl(currentItem)
        }    
    } else {
        commentListEl.innerHTML = "No comments here yet!"
    }
})

// core functions //

function clearCommentListEl(){
    commentListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToCommentListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    commentListEl.append(newEl)

}