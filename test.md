
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MidTerm Proj - Mohammad Ebrahim Adibzadeh 9731002</title>
    
    <link rel="stylesheet" href="assets/style/reset.css">
    <link rel="stylesheet" href="assets/style/style.css">

</head>
<body>
    <!-- error wrapper for api dynamic errors -->
    <div class="error" id="error"></div>
    
    <!-- Middle container -->
    <section class="container"> 
        <div class="info-box" >
            <div class="info-header">
                <img src="assets/img/defaultProf.png" id="prof-img">
                <div class="prof-info">
                    <p class="text">
                        <span class="bold" id="fullname">fullname</span>
                        </br>
                        <span id="blog-addr">blog</span>
                        </br>
                        <span id="location">city, country</span>
                    </p>
                </div>               
            </div>
            
            <div class="info-footer text">
                <h6>Bio</h6>
                <span id="bio"></span>
                <h6>&lt/&gt</h6>
                <p align="center" id="prog-lang">programming language</p>
            </div>
        </div>

        <div class="input-box">
                <label class="bold">Enter username</label>
                <input type="text" name="username" id="username"/>
                <button type="button" id="submit-btn">fetch</button> 
        </div>
    </section> 

    <script src="assets/js/script.js"></script>
</body>
</html>
