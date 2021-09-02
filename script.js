'use strict';
// QUERY SELECTORS
// CONTAINER
const modalContainer = document.querySelector('.modal-box');
// FORM
const form = document.querySelector('.modal-form');
const formText = document.getElementById('text');
const formTime = document.getElementById('time');
// ADD BUTTTON
const addButton = document.querySelector('.btn-add');
//DELETE BUTTON
const deleteBtn = document.querySelector('.btn-delete');
// ERROR MESSAGE DISPLAY
const errorMessage = document.querySelector('.error');

// CURRENT DATA
const currentTime = new Date();
const formTimeHour = `${currentTime.getHours()}`.padStart(2, '0');
const formTimeMinute = `${currentTime.getMinutes()}`.padStart(2, '0');
//  CLEAR INPUT ON CLICK
const clearInput = item => (item.value = '');
formText.addEventListener('click', () => clearInput(formText));
formTime.addEventListener('click', () => clearInput(formTime));

// SET DEFAULT DATA
formTime.value = `${formTimeHour}:${formTimeMinute}`;
formText.value = 'Enter Task';

// EMPTY ARRAY FOR STORING NODE LIST
let inputDataArray = [];

// FORM SUBMIT
const showErrorMessage = message => (errorMessage.textContent = message);

form.addEventListener('submit', e => {
  // Prevent Default Behaviour on Submit
  e.preventDefault();

  // Get Data.Values
  const textData = formText.value;
  const numberData = formTime.value;
  // Check for Data Input
  if (textData.trim().toLowerCase() === 'enter task') return;

  if (textData === '' || textData === null) {
    showErrorMessage('Valid task required');
    return;
  }
  if (numberData === '') {
    showErrorMessage('Valid time required');
    return;
  }
  if (textData.length <= 3) {
    showErrorMessage("Three letter's task?");
    return;
  }
  //    CREATE ELEMENT
  const divEl = document.createElement('div');
  // ADD ELEMENT STYLE
  divEl.classList.add('box');
  //create element children
  divEl.innerHTML = ` 
    <span class="task-time">${numberData}</span>
    <span class="task-text">${textData}</span>
    `;
  //Append data
  inputDataArray.push(divEl);
  // APPEND CHILD
  modalContainer.appendChild(divEl);

  //  RESTART TEXT VALUE
  formText.value = '';

  // ADD DATA TO ARRAY
});

deleteBtn.addEventListener('click', () => {
  inputDataArray.forEach((item, index) => {
    if (index < 0) return;
    item.classList.add('box-shake');
  });
  //
  let required = true;
  inputDataArray.forEach(item => {
    item.addEventListener('click', () => {
      if (required === true) {
        modalContainer.removeChild(item);
      }

      inputDataArray.forEach((item, index) => {
        if (index < 0) return;
        item.classList.remove('box-shake');
      });
      return (required = false);
    });
  });
});

//  Created by coding-cat
