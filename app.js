
var experienceSection = document.getElementById("exp-btn");
var educationSection = document.getElementById("edu-btn");
var certificateSection = document.getElementById("cert-btn");
var skillsSection = document.getElementById("skills-btn");
var projectsSection = document.getElementById("proj-btn");
var contactSection = document.getElementById("cont-btn");
var displaySections = document.getElementById("visible-html");


experienceSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="certifications">
    <h1>Work <span>Experience</span></h1>
    <li>Associate Software Enginner 
    <br><span>Accenture</span>
    <br>Oct-2022 - Present
    <br>7 months</li>
    
</div>`
});

educationSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="container-about">
    <div id="about">
        <h1>Education<span> Section</span></h1>
    </div>
    <div id="education">
        <h2>BBA</h2>
        <li>Narula Institute of Technology</li>
        <li>8.9 CGPA</li>
        <h2>Intermediate</h2>
        <li>Guru Vasisth vidyayan</li>
        <li>59.4%</li>
        <h2>Matriculation</h2>
        <li>St. Xavier's High School</li>
        <li>9.6 CGPA</li>
    </div>
</div>`
});

certificateSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="certifications">
    <h1>Certificates <span>Section</span></h1>
    <li>Project Management Specialization <br> <span>Google</span></li>
    <li>Google Digital Marketing <br> <span>Google Workshop</span></li>
    <li>Tosca Automation AS1 <br> <span>Tricentis Acadamy</span></li>
    <li>Tosca Automation AS2 <br> <span>Tricentis Acadamy</span></li>
    <li>Responsive Web Design <br> <span>Freecodecamp</span></li><br>
</div>`
});

skillsSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="skills">
    <h1>Skills <span>Acquired</span></h1>
    <div class="skill-cont">
        <div class="left">
            <li>HTML </li>
            <li>CSS </li>
            <li>JavaScript </li>
            <li>MonogDB</li>
            <li>Bootsrap</li>
            <li>Express JS</li>
            <li>Node JS</li>
            <li>Angular JS</li>
        </div>
        <div class="right">
            <li>React JS</li>
            <li>Tosca </li>
            <li>Cucumber </li>
            <li>Selenium </li>
            <li>Project Management </li>
            <li>Manual Testing</li>
            <li>Automation Testing</li>
            <li>Functional Testing</li>
        </div>
    </div>`
});

projectsSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="projects">
    <h1>Projects <span>Section</span></h1>
    <li><a href="https://ank-google-clone.netlify.app/" target="_blank">Google Clone Homepage</a></li>
    <li><a href="https://ank-space-exploration.netlify.app/" target="_blank">Space Exploration Site</a></li>
    <li><a href="https://ank-basketball-counter.netlify.app/" target="_blank">BasketBall Score Counter App</a></li>
    <li><a href="https://r-ankur2k.github.io/random-pass-generator.github.io/" target="_blank">Random Password
            Generator</a></li>
    <li><a href="https://ank-unit-converter.netlify.app/" target="_blank">Unit / Metrrics Converter</a></li>
    <li><a href="https://github.com/r-ankur2k" target="_blank">More...</a></li>
</div>`
});
contactSection.addEventListener("click" , function(){
    displaySections.innerHTML = `<div id="contact">
    <h1>Contact <span>ME</span></h1>
    <li>Phone - <a href="callto:+919060828354" target="_blank">+919060828354</a></li>
    <li>Instagram - <a href="https://www.instagram.com/ankur29feb" target="_blank">@ankur29feb</a></li>
    <li>Email - <a href="mailto:r.ankur2k@gmail.com">r.ankur2k@gmail.com</a></li>
    <li>Github - <a href="https://github.com/r-ankur2k/ankur-raj-site" target="_blank">r-ankur2k</a></li>

</div>
</div>`
});



