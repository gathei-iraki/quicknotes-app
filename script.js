const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

const notes = [];

function createNoteCard(note) {
  const listItem = document.createElement("li");
  listItem.classList.add("note-card", `category-${note.category}`);

  const category = document.createElement("p");
  category.classList.add("note-card__category");
  category.textContent = note.category;

  const text = document.createElement("p");
  text.classList.add("note-card__text");
  text.textContent = note.text;

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("note-card__footer");

  const createdAt = document.createElement("time");
  createdAt.textContent = note.createdAt;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.type = "button";
  deleteButton.dataset.noteId = note.id;
  deleteButton.textContent = "Delete";

  cardFooter.append(createdAt, deleteButton);
  listItem.append(category, text, cardFooter);

  return listItem;
}

function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    notesList.append(createNoteCard(note));
  });
}

function addNote(event) {
  event.preventDefault();

  const note = {
    id: crypto.randomUUID(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  render();
  noteInput.value = "";
  noteInput.focus();
}

noteForm.addEventListener("submit", addNote);
render();
