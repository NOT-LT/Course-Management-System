/*
  File: board.js
  Requirement: Make the "Discussion Board" page interactive.

  Instructions:
  1. Link this file to `board.html` (or `baord.html`) using:
     <script src="board.js" defer></script>

  
  2. In `board.html`, add an `id="topic-list-container"` to the 'div'
     that holds the list of topic articles.

  3. Implement the TODOs below.
*/

// --- Global Data Store ---
// This will hold the topics loaded from the JSON file.
let topics = [];

// --- Element Selections ---
// TODO: Select the new topic form ('#new-topic-form').
const newTopicForm = document.getElementById('new-topic-form');

// TODO: Select the topic list container ('#topic-list-container').
const topicListContainer = document.getElementById('topic-list-container');

// --- Functions ---

/**
 * TODO: Implement the createTopicArticle function.
 */
function createTopicArticle(topic) {
  const article = document.createElement('article');
  article.innerHTML = `
    <h3>
      <a href="topic.html?id=${topic.id}">${topic.subject}</a>
    </h3>
    <footer>
      <p>Posted by ${topic.author} on ${topic.date}</p>
    </footer>
    <div class="topic-actions">
      <button>Edit</button>
      <button class="delete-btn" data-id="${topic.id}">Delete</button>
    </div>
  `;
  return article;
}

/**
 * TODO: Implement the renderTopics function.
 */
function renderTopics() {
  topicListContainer.innerHTML = '';
  topics.forEach(topic => {
    const article = createTopicArticle(topic);
    topicListContainer.appendChild(article);
  });
}

/**
 * TODO: Implement the handleCreateTopic function.
 */
function handleCreateTopic(event) {
  event.preventDefault();

  const subjectInput = document.getElementById('topic-subject');
  const messageInput = document.getElementById('topic-message');

  const newTopic = {
    id: `topic_${Date.now()}`,
    subject: subjectInput.value,
    message: messageInput.value,
    author: 'Student',
    date: new Date().toISOString().split('T')[0]
  };

  topics.push(newTopic);
  renderTopics();
  newTopicForm.reset();
}

/**
 * TODO: Implement the handleTopicListClick function.
 */
function handleTopicListClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const topicId = event.target.dataset.id;
    topics = topics.filter(topic => topic.id !== topicId);
    renderTopics();
  }
}

/**
 * TODO: Implement the loadAndInitialize function.
 */
async function loadAndInitialize() {
  const response = await fetch('topics.json');
  topics = await response.json();

  renderTopics();
  newTopicForm.addEventListener('submit', handleCreateTopic);
  topicListContainer.addEventListener('click', handleTopicListClick);
}

// --- Initial Page Load ---.
loadAndInitialize();
