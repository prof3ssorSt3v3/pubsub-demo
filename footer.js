import { pubsub } from './pubsub.js';

export const footer = {
  render: function(container) {
    //if we wanted html stuff
    pubsub.subscribe('actorAdded', footer.itemsUpdated);
    console.log('STATS: listening for actorAdded events');

    pubsub.subscribe('movieAdded', footer.itemsUpdated);
    console.log('STATS: listening for movieAdded events');
  },
  itemsUpdated: function(item) {
    let ol = document.querySelector('footer ol');
    let li = document.createElement('li');
    li.textContent = item;
    ol.appendChild(li);
    if (ol.children.length > 6) {
      pubsub.unsubscribe('actorAdded', footer.itemsUpdated);
    }
  }
};
