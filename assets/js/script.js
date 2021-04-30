/*
    JS Code: Seyed Mohammad Hadi Tabatabaei

    Desc:
    Entire script wrapped in an IIFE to exclude/capsulate variables and functions from outside invasion!.
    Code scripts are pretty self explanatory and http requests send via fetch api.

    Small caching system implemented for saving older films to reduce number of requests and performance improvements.
    This system wont re-fetch a film if it was previously fetched and cached, instead it will use the already cached one.
*/
(function iife(){
    const userBaseURL = "https://api.github.com/users/"

    let starships = []
    let cachedFilms = []

    let submitBtn = document.getElementById("submit-btn")
    submitBtn.onclick = submit("username")
    
    let errorWrapper = document.getElementById('error')
    let profileImage = document.getElementById('prof-img') 
    let fullname = document.getElementById('fullname') 
    let blogAddr = document.getElementById('blog-addr') 
    let location = document.getElementById('location') 
    let bio = document.getElementById('bio')
    let progLang = document.getElementById('prog-lang')

    /* Generate uncached film urls to fetch */
    function generateUncachedFilmUrls(filmUrlsToCheck) {
        const uncached = []
        for(const url of filmUrlsToCheck) {
            if(!cachedFilms.find(cfilm => cfilm.url === url)) {
                uncached.push(url)
            }
        }
        return uncached
    }
    
    /* Fetch star ships */
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
        }
    }

    function showError(text) {
        errorWrapper.style.width = '100%'
        errorWrapper.textContent = text
        console.log('timeout staretd')
        setTimeout(() => {
            console.log('timeout finished')
            errorWrapper.style.width = '0'
            errorWrapper.textContent = ''
        }, 6000)
    }
    function setTopLanguage(repos){
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

        progLang.innerText = maxLang
    }
    function findTopLanguage(reposURL){
        reposData = fetchData(reposURL)
        
        reposData.then((val)=>{
            val.sort((a, b)=>{
                return a.pushed_at < b.pushed_at
            })
            let repos = val
            setTopLanguage(repos)
        })
    }

    function updateInfo(userData){
        profileImage.src = userData["avatar_url"]
        blogAddr.innerText = userData["blog"]
        fullname.innerText = userData["name"]
        location.innerText = userData["location"]
        bio.innerText = userData["bio"]
        
        reposUrl = userData["repos_url"]
        findTopLanguage(reposUrl)

    }
    function submit(textareaID) {
        return () => {
            let usernameTxtArea = document.getElementById(textareaID);
            let username = usernameTxtArea.value;
            let userData = fetchData(userBaseURL + username)


            userData.then((val)=>{
                updateInfo(val) 
                return
            })

        };
    }
})()