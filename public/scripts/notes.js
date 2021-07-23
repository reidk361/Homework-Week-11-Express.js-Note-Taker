const noteForm = document.getElementById('note-form');
const notesContainer = document.getElementById('note-container');

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
  cardBodyEl.innerHTML = `<h5>${note.date}</h5><p>${note.text}</p>`;

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
    // body: JSON.stringify(data),
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

getNotes().then((data) => data.forEach((note) => createCard(note)));

const handleNoteSubmit = (event) => {
  event.preventDefault();
  console.log('Note submitted.');

  const noteTitle = document.getElementById('note-title').value;
  const noteText = document.getElementById('note-text').value;

  const newNote = {
    title: noteTitle,
    text: noteText,
  };

  postNote(newNote);
};

// Listen for when the form is submitted
noteForm.addEventListener('submit', handleNoteSubmit);