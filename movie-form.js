import { pubsub } from './pubsub.js';

export const movieForm = {
  render: container => {
    //build form to add movie
    let template = document.getElementById('movieFormTemplate');
    let form = template.content.cloneNode(true);
    form.querySelector('button').addEventListener('click', movieForm.add);
    container.appendChild(form);
  },
  add: ev => {
    ev.preventDefault();
    let input = document.querySelector('.movie-form input');
    let title = input.value;
    input.value = ''; //clear the form

    //tell anyone who is listening that a movie was added
    console.log(`MOVIE FORM: just movieAdded "${title}"`);
    pubsub.publish('movieAdded', title);
  }
};
