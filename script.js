// =====================================================
// JOBREADY - RESUME BUILDER
// =====================================================


// =====================================================
// SKILL DATABASE
// =====================================================

const skillDatabase = [
    "Python",
    "C",
    "C++",
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "SQL",
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
    "Data Structures",
    "Algorithms",
    "Cyber Security",
    "Networking",
    "Linux",
    "Machine Learning",
    "Artificial Intelligence",
    "Communication",
    "Problem Solving"
];


// =====================================================
// SELECTED SKILLS
// =====================================================

let selectedSkills = [];


// =====================================================
// SKILL AUTOCOMPLETE
// =====================================================

function setupSkillAutocomplete() {

    const skillInput = document.getElementById("skillInput");
    const suggestionsBox =
        document.getElementById("skillSuggestions");

    if (!skillInput || !suggestionsBox) {
        return;
    }

    skillInput.addEventListener("input", function () {

        const typedText =
            skillInput.value.trim().toLowerCase();

        suggestionsBox.innerHTML = "";

        if (typedText === "") {
            return;
        }

        const matches = skillDatabase.filter(function (skill) {

            return skill.toLowerCase().includes(typedText);

        });

        matches.forEach(function (skill) {

            if (selectedSkills.includes(skill)) {
                return;
            }

            const suggestion =
                document.createElement("div");

            suggestion.className =
                "skill-suggestion-item";

            suggestion.innerText = skill;

            suggestion.addEventListener("click", function () {

                addSkill(skill);

                skillInput.value = "";

                suggestionsBox.innerHTML = "";

                skillInput.focus();

            });

            suggestionsBox.appendChild(suggestion);

        });

    });


    // Hide suggestions when clicking outside
    document.addEventListener("click", function (event) {

        if (!event.target.closest(".skill-input-wrapper")) {

            suggestionsBox.innerHTML = "";

        }

    });

}


// =====================================================
// ADD SKILL
// =====================================================

function addSkill(skill) {

    if (selectedSkills.includes(skill)) {
        return;
    }

    selectedSkills.push(skill);

    displaySelectedSkills();

    updateSkillsField();

}


// =====================================================
// DISPLAY SELECTED SKILLS
// =====================================================

function displaySelectedSkills() {

    const container =
        document.getElementById("selectedSkills");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    selectedSkills.forEach(function (skill, index) {

        const tag =
            document.createElement("span");

        tag.className = "skill-tag";

        tag.innerHTML =
            skill +
            ' <button type="button" onclick="removeSkill(' +
            index +
            ')">×</button>';

        container.appendChild(tag);

    });

}


// =====================================================
// REMOVE SKILL
// =====================================================

function removeSkill(index) {

    selectedSkills.splice(index, 1);

    displaySelectedSkills();

    updateSkillsField();

}


// =====================================================
// UPDATE HIDDEN SKILLS FIELD
// =====================================================

function updateSkillsField() {

    const skillsField =
        document.getElementById("skills");

    if (!skillsField) {
        return;
    }

    skillsField.value =
        selectedSkills.join(", ");

}


// =====================================================
// GENERATE RESUME
// =====================================================

function generateResume() {

    // Personal information
    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const linkedin =
        document.getElementById("linkedin").value.trim();

    const github =
        document.getElementById("github").value.trim();


    // Other information
    const summary =
        document.getElementById("summary").value.trim();

    const education =
        document.getElementById("education").value.trim();

    const skills =
        document.getElementById("skills").value.trim();

    const projects =
        document.getElementById("projects").value.trim();

    const certifications =
        document.getElementById("certifications").value.trim();

    const achievements =
        document.getElementById("achievements").value.trim();


    // =================================================
    // UPDATE PREVIEW
    // =================================================

    document.getElementById("preview-name").innerText =
        name || "Your Name";


    document.getElementById("preview-contact").innerText =
        [
            email || "Email",
            phone || "Phone",
            location || "Location"
        ].join(" | ");


    document.getElementById("preview-summary").innerText =
        summary ||
        "Your professional summary will appear here.";


    document.getElementById("preview-education").innerText =
        education ||
        "Your education will appear here.";


    // =================================================
    // SKILLS PREVIEW
    // =================================================

    displayPreviewSkills();


    // =================================================
    // LINKEDIN & GITHUB
    // =================================================

    const linkedinPreview =
        document.getElementById("preview-linkedin");

    const githubPreview =
        document.getElementById("preview-github");


    if (linkedinPreview) {

        linkedinPreview.innerText =
            linkedin ? "LinkedIn: " + linkedin : "";

    }


    if (githubPreview) {

        githubPreview.innerText =
            github ? "GitHub: " + github : "";

    }


    // =================================================
    // PROJECTS PREVIEW
    // =================================================

    updateProjectsField();

    document.getElementById("preview-projects").innerHTML =
        projects ||
        "Your projects will appear here.";


    // =================================================
    // CERTIFICATIONS PREVIEW
    // =================================================

    updateCertificationsField();

    document.getElementById("preview-certifications").innerHTML =
        certifications ||
        "Your certifications will appear here.";


    // =================================================
    // ACHIEVEMENTS
    // =================================================

    document.getElementById("preview-achievements").innerText =
        achievements ||
        "Your achievements will appear here.";


    // =================================================
    // SAVE RESUME
    // =================================================

    const resumeData = {

        name: name,
        email: email,
        phone: phone,
        location: location,

        linkedin: linkedin,
        github: github,

        summary: summary,
        education: education,

        skills: skills,
        projects: projects,
        certifications: certifications,

        achievements: achievements

    };


    localStorage.setItem(
        "jobreadyResume",
        JSON.stringify(resumeData)
    );


    // =================================================
    // SAVE SKILLS FOR JOB RECOMMENDATIONS
    // =================================================

    const skillList =
        selectedSkills.length > 0
            ? selectedSkills
            : skills
                .split(",")
                .map(function (skill) {
                    return skill.trim();
                })
                .filter(function (skill) {
                    return skill !== "";
                });


    localStorage.setItem(
        "jobreadyskills",
        JSON.stringify(skillList)
    );


    alert(
        "Resume generated successfully! Your skills have been saved for job recommendations."
    );

}


// =====================================================
// DISPLAY SKILLS IN RESUME PREVIEW
// =====================================================

function displayPreviewSkills() {

    const preview = document.getElementById("preview-skills");

    if (!preview) return;

    preview.innerHTML = "";

    let skills = selectedSkills;

    if (skills.length === 0) {
        const skillsField = document.getElementById("skills");

        if (skillsField && skillsField.value.trim() !== "") {
            skills = skillsField.value
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill !== "");
        }
    }

    if (skills.length === 0) {
        preview.innerText = "Your skills will appear here.";
        return;
    }

    skills.forEach(function(skill) {

        const tag = document.createElement("span");

        tag.className = "preview-skill-tag";

        tag.innerText = skill;

        preview.appendChild(tag);
    });
}

// =====================================================
// PROJECTS
// =====================================================

function addProject() {

    const container =
        document.getElementById("projectsContainer");

    const project =
        document.createElement("div");

    project.className =
        "dynamic-item";

    project.innerHTML = `

        <input
            type="text"
            class="project-name"
            placeholder="Project Name">

        <textarea
            class="project-description"
            rows="3"
            placeholder="Describe your project, your contribution and technologies used..."></textarea>

        <input
            type="text"
            class="project-link"
            placeholder="Project link (optional)">

        <button
            type="button"
            onclick="this.parentElement.remove()">
            Remove
        </button>

    `;

    container.appendChild(project);

}


// =====================================================
// UPDATE PROJECTS FIELD
// =====================================================

function updateProjectsField() {

    const projects =
        document.querySelectorAll(
            "#projectsContainer .dynamic-item"
        );

    const projectData = [];

    projects.forEach(function (project) {

        const name =
            project.querySelector(".project-name")?.value.trim();

        const description =
            project.querySelector(".project-description")?.value.trim();

        const link =
            project.querySelector(".project-link")?.value.trim();


        if (name || description || link) {

            projectData.push(
                [name, description, link]
                    .filter(Boolean)
                    .join(" - ")
            );

        }

    });


    const projectsField =
        document.getElementById("projects");

    if (projectsField) {

        projectsField.value =
            projectData.join("\n");

    }

}


// =====================================================
// CERTIFICATIONS
// =====================================================

function addCertification() {

    const container =
        document.getElementById(
            "certificationsContainer"
        );

    const certification =
        document.createElement("div");

    certification.className =
        "dynamic-item";

    certification.innerHTML = `

        <input
            type="text"
            class="certification-name"
            placeholder="Certificate Name">

        <input
            type="text"
            class="certification-organization"
            placeholder="Organization / Platform">

        <button
            type="button"
            onclick="this.parentElement.remove()">
            Remove
        </button>

    `;

    container.appendChild(certification);

}


// =====================================================
// UPDATE CERTIFICATIONS FIELD
// =====================================================

function updateCertificationsField() {

    const certifications =
        document.querySelectorAll(
            "#certificationsContainer .dynamic-item"
        );

    const certificationData = [];

    certifications.forEach(function (certification) {

        const name =
            certification
                .querySelector(".certification-name")
                ?.value.trim();

        const organization =
            certification
                .querySelector(".certification-organization")
                ?.value.trim();


        if (name || organization) {

            certificationData.push(
                [name, organization]
                    .filter(Boolean)
                    .join(" - ")
            );

        }

    });


    const certificationsField =
        document.getElementById("certifications");

    if (certificationsField) {

        certificationsField.value =
            certificationData.join("\n");

    }

}


// =====================================================
// LOAD SAVED RESUME
// =====================================================

function loadResumeData() {

    const savedData =
        localStorage.getItem("jobreadyResume");


    if (!savedData) {
        return;
    }


    const data =
        JSON.parse(savedData);


    // Personal information
    document.getElementById("name").value =
        data.name || "";

    document.getElementById("email").value =
        data.email || "";

    document.getElementById("phone").value =
        data.phone || "";

    document.getElementById("location").value =
        data.location || "";

    document.getElementById("linkedin").value =
        data.linkedin || "";

    document.getElementById("github").value =
        data.github || "";


    // Other information
    document.getElementById("summary").value =
        data.summary || "";

    document.getElementById("education").value =
        data.education || "";

    document.getElementById("achievements").value =
        data.achievements || "";


    // =================================================
    // LOAD SKILLS
    // =================================================

    selectedSkills = [];

    if (data.skills) {

        selectedSkills =
            data.skills
                .split(",")
                .map(function (skill) {
                    return skill.trim();
                })
                .filter(function (skill) {
                    return skill !== "";
                });

    }


    displaySelectedSkills();

    updateSkillsField();


    // =================================================
    // LOAD PREVIEW
    // =================================================

    updateResumePreview();

}


// =====================================================
// UPDATE PREVIEW WITHOUT ALERT
// =====================================================

function updateResumePreview() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const linkedin =
        document.getElementById("linkedin").value.trim();

    const github =
        document.getElementById("github").value.trim();

    const summary =
        document.getElementById("summary").value.trim();

    const education =
        document.getElementById("education").value.trim();

    const achievements =
        document.getElementById("achievements").value.trim();


    document.getElementById("preview-name").innerText =
        name || "Your Name";


    document.getElementById("preview-contact").innerText =
        [
            email || "Email",
            phone || "Phone",
            location || "Location"
        ].join(" | ");


    document.getElementById("preview-summary").innerText =
        summary ||
        "Your professional summary will appear here.";


    document.getElementById("preview-education").innerText =
        education ||
        "Your education will appear here.";


    document.getElementById("preview-achievements").innerText =
        achievements ||
        "Your achievements will appear here.";


    displayPreviewSkills();



    const linkedinPreview =
        document.getElementById("preview-linkedin");

    const githubPreview =
        document.getElementById("preview-github");


    if (linkedinPreview) {

        linkedinPreview.innerText =
            linkedin ? "LinkedIn: " + linkedin : "";

    }


    if (githubPreview) {

        githubPreview.innerText =
            github ? "GitHub: " + github : "";

    }

}


// =====================================================
// DOWNLOAD RESUME
// =====================================================

function downloadResume() {

    const name =
        document.getElementById("name").value.trim();


    if (name === "") {

        alert(
            "Please enter your name first."
        );

        return;

    }


    // Save latest data before printing
    generateResume();


    setTimeout(function () {

        window.print();

    }, 500);

}


// =====================================================
// LIVE PREVIEW
// =====================================================

function setupLivePreview() {

    const inputs =
        document.querySelectorAll(
            "#name, #email, #phone, #location, #linkedin, #github, #summary, #education, #achievements"
        );


    inputs.forEach(function (input) {

        input.addEventListener(
            "input",
            updateResumePreview
        );

    });

}


// =====================================================
// PAGE LOAD
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
    setupSkillAutocomplete();

    // loadResumeData();

    setupLivePreview();
});


function clearResumeData(){
    localStorage("jobreadyResume");
    localStorage.removeItem("jobreadyskills");
    alert("resume data cleared");
    location.reload();
}