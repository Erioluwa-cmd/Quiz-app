// logic to show current year
document.querySelector(".year").innerHTML = new Date().getFullYear()

// logic to show nav
const menu_btn = document.querySelector(".menu-btn")
menu_btn.addEventListener("click", function(){
            document.querySelector("nav").classList.toggle("show-nav")
            menu_btn.classList.toggle("rotate-menu-btn")
})


// logic to preview an uploaded image
const upload_input = document.querySelector(".upload-input")
let uploaded_image_url = ""

upload_input.addEventListener("change", function(event){

          let uploaded_file = event.target.files[0]
          uploaded_image_url= URL.createObjectURL(uploaded_file)
         document.querySelector(".preview-img").src = uploaded_image_url
          
})


// function to close all tabs
function closeAllSection(){
       all_sections.forEach(function(section){
            section.style.display = "none"

       })
}



// logic to display registration form
function display_reg_form(){
    
         closeAllSection()
         registration_section.style.display = "flex"
         signUp_form.style.display = "flex"
         login_form.style.display = "none"
        

}

// to display login form
function login_now(){
           closeAllSection()
           registration_section.style.display = "flex"
           signUp_form.style.display = "none"
           login_form.style.display = "flex"
}
  // grab username
  let login_username = null
       // grab password
       let login_password = null
// logic to log user in
login_form.addEventListener("submit", function(event){
        event.preventDefault()
          login_username = document.querySelector(".login-username").value
   
    login_password  = document.querySelector(".login-password").value
        // authenticate
        if(new_user.username === login_username  && new_user.password === login_password
        ){
               closeAllSection()
               category_section.style.display = 'flex'
        //        document.querySelector("nav").innerHTML = `
        //            <a>Update Profile</a>
        //            <a>Print Result</a>
        //            <a>Logout</a>
               
        //        `
        }else{
               alert("Ooops! login credentials invalid")
        }
})



get_started_btn.addEventListener("click", display_reg_form)
register_btn.addEventListener("click", display_reg_form)

// function to register user
 let new_user = ""
signUp_form.addEventListener("submit", function(event){
        event.preventDefault()
       
        let profile_image = uploaded_image_url
        let full_name = document.querySelector(".full-name").value
        let username = document.querySelector(".username").value
        let password1 = document.querySelector(".password1").value
        let password2 = document.querySelector(".password2").value
     

        // validation

        //must upload profile image
        if(profile_image === ""){
               alert("pls upload a profile image")
        }else{
                     
                        // check if password match
                        if(password1 !== password2){
                            alert("password does not match!")
                        }else{
            
                                
                                    // create the new user
                                            new_user = {
                                            profile_image : profile_image,
                                            full_name : full_name,
                                            username: username,
                                            password : password1
                                        }

                                        // display the success section
                                        closeAllSection()
                                        success_section.style.display = "flex"
                                        setTimeout(function(){
                                            success_image.classList.add("magnify-success")
                                        }, 1000);
                                }
                        }

                    }
                    

            )



// logic to display login form
login_btn.addEventListener("click", login_now)
login_btn2.addEventListener("click", login_now)


// logic to handle quiz

// logic to load question

let chosen_subject = ""
let questions = ""
let current_question_index = 0
let total_score = 0
let userAnswers = ""


// selecting all the buttons in the category section
subject_btns.forEach(function(btn){
        btn.addEventListener("click", function(event){
                  closeAllSection()
                  start_section.style.display = "flex"
                   chosen_subject = event.target.id

                 
        })
})



// logic to display the call to actions
start_btn.addEventListener("click", function(){
            closeAllSection()
            call_to_action_section.style.display = 'flex'

        //     if yes button was clicked
            yes_btn.addEventListener("click", function(){


                        closeAllSection()
                        // load the question for the chosen subject
                        if(chosen_subject === "maths"){
                              questions = [...mathematics] // array of maths' questions

                
                        }else if(chosen_subject === "english"){
                                questions = [...english ] // array of english' question
                               
                        }
                        else if(chosen_subject === "computer"){
                                questions = [...computer]  // array of computer question
                               
                        }
                        else if(chosen_subject === "current_affairs"){
                                questions = [...current_affairs] // array of current affairs' question
                               
                        }

                        userAnswers = new Array(questions.length).fill(null)
                       
                       question_arena.style.display = 'flex'
                       load_question()
                         
            })

            no_btn.addEventListener("click", function(){

                         closeAllSection()
                         start_section.style.display = "flex"
                         
            })
})


// logic to deselect all options, so that user can choose his/her own option
function unchecked_options(){
      const options =  document.querySelectorAll(".option")
      options.forEach(function(opt){
           opt.checked = false
      })


}



// grab the user's selected option and save it in the user answers array
function get_selected_answer(){
           const all_answers =  document.querySelectorAll(".option")
           all_answers.forEach(function(opt){
                    opt.addEventListener("change", function(event){
                                 userAnswers[current_question_index] =  event.target.value
                    } )        
           })
}

// logic to load question
let timer = 60
function load_question(){
         unchecked_options()
        //  display prev button when current question index > 0

        if(current_question_index > 0){
                 prev_btn.style.display = "flex"
        }else{
                  prev_btn.style.display = "none"
        }

          
        //    loading the question
           let current_question = questions[current_question_index]
           question_no.innerHTML = current_question.id
           question_display.innerHTML = current_question.question
           option_a_text.innerHTML = current_question.a
           option_b_text.innerHTML = current_question.b
           option_c_text.innerHTML = current_question.c
           option_d_text.innerHTML = current_question.d

        
            get_selected_answer()
            let chosen_answer = userAnswers[current_question_index]
        clear.disabled = true

           if(chosen_answer){
                document.getElementById(chosen_answer).checked = true
           }
          clear =  setInterval(function(){
                timer--
                secs.innerHTML = timer
                if(timer <= 0){
                        retake_quizs()  
                        clearInterval(clear)  
                    }
           }, 1000);
          
}


function show_next(){
    
            if(current_question_index <( questions.length - 1)){
                   current_question_index ++
                   
            }else{
                  current_question_index = current_question_index
                  next_btn.innerHTML = "finish"  
                  
                  if(next_btn.innerHTML === "finish"){
                          get_total_score()
                          closeAllSection()
                          score_board.style.display = "flex"
                  }

            }
            
              load_question()
}

function show_prev(){
        
            if(current_question_index > 0 ){
                   
                   current_question_index-- 
                   next_btn.innerHTML = "next"  // set the finish button back to next

            }else{
                  current_question_index = current_question_index
            }
            
              load_question()
}

function retake_quizs(){
       closeAllSection()
        retake.style.display = "flex"
        retakes.addEventListener("click", function(){
                closeAllSection()
                category_section.style.display = "flex"
                timer = 60
        })
        show.addEventListener("click", function(){
                get_total_score()
                closeAllSection()
                score_board.style.display = "flex"
        })
}

next_btn.addEventListener("click", show_next)
prev_btn.addEventListener("click", show_prev)
// logic to calculate total score
function get_total_score(){
            clearInterval(clear)
           let correct_answers = questions.map(function(question){
                     return question.correct
           })

           for(let i=0; i<userAnswers.length; i++){
                if(userAnswers[i] === correct_answers[i]){
                          total_score+= 10
                }else{
                         total_score = total_score
                }
           }

           if(total_score){
                img.src= uploaded_image_url
                fname.innerHTML = login_username
                subject.innerHTML.category
                score.innerHTML = total_score
                percentage.innerHTML = 100 + "%"
                remark.innerHTML = "Execellence"
                con.innerHTML = "What a great performance good effort keep it up👍"
           }else if(total_score >= 20){
                img.src= uploaded_image_url
                fname.innerHTML = login_username
                subject.innerHTML.category
                score.innerHTML = total_score
                percentage.innerHTML = 70 + "%"
                remark.innerHTML = "very good"
                con.innerHTML = "good effort keep it up👍"
           }else if(total_score  >= 10){
                img.src= uploaded_image_url
                fname.innerHTML = login_username
                subject.innerHTML.category
                score.innerHTML = total_score
                percentage.innerHTML = 20 + "%"
                remark.innerHTML = "good"
                con.innerHTML = "good effort keep it up👍"
           }else if(total_score >= ""){
                img.src= uploaded_image_url
                fname.innerHTML = login_username
                subject.innerHTML.category
                score.innerHTML = total_score
                percentage.innerHTML = 0 + "%"
                remark.innerHTML = "Fail"
                con.innerHTML = "try to read your book😒"
           }

           

        //    alert(`your total score is ${total_score}`)
        //    let retake_quiz = confirm("retake quiz")
        //      if(retake_quiz){
        //             window.location.reload()
        //      }else{
        //         closeAllSection()
        //         category_section.style.display = "flex"

        //      }
        //    
        //    userAnswers = ""
        //    correct_answers = ""
        //    total_score = 0
        //    next_btn.innerHTML = "next"
        //    current_question_index = 0
        //    questions = ""
           
}


