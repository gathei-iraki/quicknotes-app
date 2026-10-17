const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes-notes";

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (!savedNotes) {
    return [];
  }

  try {
    const parsedNotes = JSON.parse(savedNotes);
    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    console.warn("Saved notes could not be loaded.", error);
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

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
  const searchWords = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchWords),
  );

  notesList.replaceChildren();

  visibleNotes.forEach((note) => {
    notesList.append(createNoteCard(note));
  });

  if (searchWords && visibleNotes.length === 0) {
    const noResults = document.createElement("li");
    noResults.classList.add("empty-state");
    noResults.textContent = "No notes match your search.";
    notesList.append(noResults);
  }

  updateNoteCount();
}

function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  const note = {
    id: crypto.randomUUID(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  errorMessage.textContent = "";
  render();
  noteInput.value = "";
  noteInput.focus();
}

function deleteNote(event) {
  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) {
    return;
  }

  notes = notes.filter((note) => note.id !== deleteButton.dataset.noteId);
  saveNotes();
  render();
}

function clearAllNotes() {
  if (!confirm("Delete all notes?")) {
    return;
  }

  notes = [];
  saveNotes();
  render();
}

noteForm.addEventListener("submit", addNote);
notesList.addEventListener("click", deleteNote);
searchInput.addEventListener("input", render);
clearAllButton.addEventListener("click", clearAllNotes);
render();
