const noteForm = document.getElementById('note-form');
const notesContainer = document.getElementById('note-container');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');

function getDate() {
  let newDate = new Date(Date.now());
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let date = newDate.getDate();
  let hour = newDate.getHours();
  //Places 0 in front of all hours less than 10. (i.e. 06:00 vice 6:00).
  if (hour<10){
    hour = `0${newDate.getHours()}`;
  } else {
    hour = newDate.getHours();
  }
  let min = newDate.getMinutes();
  //Places 0 in front of all minutes less than 10. (i.e. 06:00 vice 06:0).
  if (min<10){
    min = `0${newDate.getMinutes()}`;
  } else {
    min = newDate.getMinutes();
  }
  let time = `${date} ${month} ${year} ${hour}:${min}`;
  return time;
}

const createCard = (note) => {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3');
  cardEl.setAttribute('key', note.note_id);

  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );
  cardHeaderEl.innerHTML = `${note.title} </br>`;

  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<h5>${note.date}</h5><hr><p>${note.text}</p>`;

  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  notesContainer.appendChild(cardEl);
};

const getNotes = () =>
  fetch('http://localhost:8080/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    }
  )
;


const postNote = (note) =>
  fetch('http://localhost:8080/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(note);
    })
    .catch((error) => {
      console.error('Error:', error);
    }
  )
;

getNotes().then((data) => {
  console.log(data);
  data.forEach((note) => createCard(note))
});

const handleNoteSubmit = (event) => {
  event.preventDefault();
  console.log('Note submitted.');

  const newNote = {
    title: noteTitle.value,
    date: getDate(),
    text: noteText.value,
  };

  postNote(newNote);
  noteTitle.value = "";
  noteText.value = "";
};

// Listen for when the form is submitted
noteForm.addEventListener('submit', handleNoteSubmit);