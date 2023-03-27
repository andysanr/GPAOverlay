function fetchGPAOverlay() {
  return fetch('https://guarded-meadow-19462.herokuapp.com/read/GPAOverlay')
    .then(response => response.json())
}

function findminGpaBycourse(course, data) {
  const match = data.find(item => item.item.course === course)
  return match ? match.item.minGpa : null
}

function findmaxGpaBycourse(course, data) {
  const match = data.find(item => item.item.course === course)
  return match ? match.item.maxGpa : null
}

function addEstimatedGPA(course, data) {
  const instructors = document.querySelectorAll('[id^="SSR_CLSRCH_F_WK_SSR_INSTR_LONG_1$86$$"]')
  for (let i = 0; i < instructors.length; i++) {
    const instructorName = instructors[i].textContent.trim()
    const instructorMatch = data.find(item => item.item.course === course && item.item.instructorName === instructorName)
    if (instructorMatch) {
      const sessionElements = document.querySelectorAll(`[id^="SSR_DER_CS_GRP_SESSION_CODE$215$$${i}"]`)
      for (let j = 0; j < sessionElements.length; j++) {
        const gpaElement = document.createElement('div')
        const minGpaElement = document.createElement('span');
        const maxGpaElement = document.createElement('span');
        
        minGpaElement.textContent = instructorMatch.item.minGpa;
        maxGpaElement.textContent = instructorMatch.item.maxGpa;
        
        gpaElement.appendChild(document.createTextNode("Estimated GPA: "));
        gpaElement.classList.add("boldletters")
        gpaElement.appendChild(minGpaElement);
        gpaElement.appendChild(document.createTextNode(" - "));
        gpaElement.appendChild(maxGpaElement);

        if (instructorMatch.item.minGpa >= 3.50) {
          minGpaElement.classList.add("gpa-estimate-A");  
        }
        else if (instructorMatch.item.minGpa >= 2.50 && instructorMatch.item.minGpa <= 3.49) {
          minGpaElement.classList.add("gpa-estimate-B"); 
        }
        else if (instructorMatch.item.minGpa >= 1.50 && instructorMatch.item.minGpa <= 2.49) {
          minGpaElement.classList.add("gpa-estimate-C"); 
        }
        else if (instructorMatch.item.minGpa >= 1.00 && instructorMatch.item.minGpa <= 1.49) {
          minGpaElement.classList.add("gpa-estimate-D"); 
        }
        else if (instructorMatch.item.minGpa <= 0.99) {
          minGpaElement.classList.add("gpa-estimate-F"); 
        }

        if (instructorMatch.item.maxGpa >= 3.50) {
          maxGpaElement.classList.add("gpa-estimate-A");
        } 
        else if (instructorMatch.item.maxGpa >= 2.50 && instructorMatch.item.maxGpa <= 3.49) {
          maxGpaElement.classList.add("gpa-estimate-B"); 
        }
        else if (instructorMatch.item.maxGpa >= 1.50 && instructorMatch.item.maxGpa <= 2.49) {
          maxGpaElement.classList.add("gpa-estimate-C"); 
        }
        else if (instructorMatch.item.maxGpa >= 1.00 && instructorMatch.item.maxGpa <= 1.49) {
          maxGpaElement.classList.add("gpa-estimate-D"); 
        }
        else if (instructorMatch.item.maxGpa <= 0.99) {
          maxGpaElement.classList.add("gpa-estimate-F"); 
        }

        sessionElements[j].insertAdjacentElement('afterend', gpaElement)
      }
    }
  }
}



// Wait for the target element to appear
const intervalId = setInterval(() => {
  const courseElement = document.getElementById('SSR_CRSE_INFO_V_SSS_SUBJ_CATLG')
  if (courseElement) {
    clearInterval(intervalId) // Stop checking for the element

    const course = courseElement.textContent.trim()
    fetchGPAOverlay()
      .then(data => addEstimatedGPA(course, data))
      .catch(error => console.error(error))
  }
}, 100)
