import { pubsub } from './pubsub.js';

export const actorForm = {
  render: container => {
    //build form to add movie
    let template = document.getElementById('actorFormTemplate');
    let form = template.content.cloneNode(true);
    form.querySelector('button').addEventListener('click', actorForm.add);
    container.appendChild(form);
  },
  add: ev => {
    ev.preventDefault();
    let input = document.querySelector('.actor-form input');
    let name = input.value;
    input.value = ''; //clear the form

    //tell people an actor was added
    console.log(`ACTOR FORM: just actorAdded ${name}`);
    pubsub.publish('actorAdded', name);
  }
};
