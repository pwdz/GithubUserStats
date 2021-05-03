/*
    Entire script wrapped in an IIFE to exclude/capsulate variables and functions from outside invasion!.
*/
(function iife(){
    // github user api
    const userBaseURL = "https://api.github.com/users/"

    // cache all the needed html elements here
    let submitBtn = document.getElementById("submit-btn")
    let usernameTxtArea = document.getElementById("username");
    let errorWrapper = document.getElementById('error')
    let profileImage = document.getElementById('prof-img') 
    let fullname = document.getElementById('fullname') 
    let blogAddr = document.getElementById('blog-addr') 
    let location = document.getElementById('location') 
    let bio = document.getElementById('bio')
    let progLang = document.getElementById('prog-lang')
    
    // set the submit button onclick here.
    submitBtn.onclick = submit()

    /* 
        http requests send via fetch api.
        showError function is called here(for network problems and codes above 400)
    */
    async function fetchData(url) {
        try {
            let response = await fetch(url)
    
            if(response.status >= 400) {
                showError(`Request failed with error ${response.status}`)
                return Promise.reject(`Request failed with error ${response.status}`)
            }
            return response.json()
        } catch(e) {
            console.log(e)
            showError("network error")
        }
    }
 
    /*
        show the text as error message in the error div.
        set timeout for hiding error message after 4 seconds from screen.
    */
    function showError(text) {
        errorWrapper.style.width = '100%'
        errorWrapper.textContent = text
        console.log('timeout staretd')
        setTimeout(() => {
            console.log('timeout finished')
            errorWrapper.style.width = '0'
            errorWrapper.textContent = ''
        }, 4000)
    }   

    // change the "programming language" text in html
    function setTopLanguage(langName){
        progLang.innerText = langName
    }

    // find user's top language among latest 5 repos 
    function findTopLanguage(repos){
        let arr = new Array()
        let maxLang = "", maxCount = 0
        for(let i = 0; i < 5 && i<repos.length; i++){
            if(repos[i]["language"] !== null){
                if(repos[i]["language"] in arr){
                    arr[repos[i]["language"]]++
                }else
                    arr[repos[i]["language"]] = 1
                if(arr[repos[i]["language"]] > maxCount){
                    maxCount = arr[repos[i]["language"]]
                    maxLang = repos[i]["language"]
                }
            }
        }  

        setTopLanguage(maxLang)
    }

    // sort user repos based on their "pushed_at" field in json.
    function sortRepos(reposURL){
        reposData = fetchData(reposURL)
        
        return reposData.then((val)=>{
            val.sort((a, b)=>{
                return a.pushed_at < b.pushed_at
            })
            let repos = val
            findTopLanguage(repos)
        })
    }

    // update user information fields in html from js.
    function updateInfo(userData){
        profileImage.src = userData["avatar_url"]
        blogAddr.innerText = userData["blog"]
        fullname.innerText = userData["name"]
        location.innerText = userData["location"]
        bio.innerText = userData["bio"]
        
        if(userData["max_lang"] == undefined){
            reposUrl = userData["repos_url"]
            return sortRepos(reposUrl)
        }
        else
            setTopLanguage(userData["max_lang"])
    }

    // save user information in localstorage
    function cacheInfo(username, userData){
        console.log("saving:"+userData)
        window.localStorage.setItem(username, userData)
    }

    /*
        submit button onclick callback.
        it checks the localstorage and if user info's aren't present, then 
        it uses fetchData function for gathering user info.
        the it'll update user infos and cache info automatically.
    */
    function submit() {
        return () => {
            let username = usernameTxtArea.value;
            
            if(window.localStorage.getItem(username) == null){
                let userData = fetchData(userBaseURL + username)
                
                userData.then((data)=>{
                    if(data != undefined){
                        topLang = updateInfo(data) 
                        topLang.then(()=>{
                            data["max_lang"] = progLang.innerText
                            cacheInfo(username, JSON.stringify(data))
                        })
                    }
                    return
                })
            }else{
                let userData = window.localStorage.getItem(username)
                console.log("read data:"+userData)
                updateInfo(JSON.parse(userData))
            }
        };
    }
})()