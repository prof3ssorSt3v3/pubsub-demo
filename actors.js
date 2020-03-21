import { pubsub } from './pubsub.js';

export const actors = {
  list: [],
  render: container => {
    let template = document.getElementById('actorListTemplate');
    let div = template.content.cloneNode(true);
    container.appendChild(div);
    let ul = document.querySelector('.actor-container ul');
    ul.addEventListener('click', actors.actorDeleted);

    //tell the pubsub controller that we want to know about any actorAdded event
    console.log('ACTORS: want to know if an actor is added');
    pubsub.subscribe('actorAdded', actors.actorAdded);
  },
  actorAdded: name => {
    //actorAdded event was published
    console.log(`ACTORS: I hear that ${name} was added`);
    let list = new Set(actors.list);
    list.add(name);
    actors.list = Array.from(list).sort();

    //tell everyone that an actor has been added to the list
    console.log('ACTORS: actorsUpdated the list');
    pubsub.publish('actorsUpdated', actors.list);

    //then the ui stuff for a new actor list
    let ul = document.querySelector('.actor-container ul');
    ul.innerHTML = '';
    let df = document.createDocumentFragment();
    actors.list.forEach(name => {
      let li = document.createElement('li');
      li.innerText = name;
      df.appendChild(li);
    });
    ul.appendChild(df);
  },
  actorDeleted: ev => {
    let item = ev.target.closest('li');
    let name = item.textContent;
    actors.list = actors.list.filter(nm => nm !== name);
    item.parentElement.removeChild(item);
    console.log(`ACTORS: actorDeleted the ${name}`);
    pubsub.publish('actorDeleted', actors.list);
  }
};
