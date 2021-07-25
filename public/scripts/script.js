const dynamicLink = document.getElementById('dynamic-link');

const href = document.location.href;

dynamicLink.setAttribute('href', `${href}/notes`); 