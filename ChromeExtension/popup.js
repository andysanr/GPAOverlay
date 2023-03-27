const loginButton = document.querySelector('.button[href="https://my.fiu.edu/"]');
const githubButton = document.querySelector('.button[href="https://www.github.com/andysantanar"]');
const linkedinButton = document.querySelector('.button[href="https://www.linkedin.com/in/andysantana/"]');

loginButton.addEventListener('click', () => {
    window.open(loginButton.href, '_blank');
});

githubButton.addEventListener('click', () => {
    window.open(githubButton.href, '_blank');
});

linkedinButton.addEventListener('click', () => {
    window.open(linkedinButton.href, '_blank');
});