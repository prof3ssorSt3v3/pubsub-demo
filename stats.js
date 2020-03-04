import { pubsub } from './pubsub.js';

export const stats = {
  render: container => {
    let d = document.createElement('div');
    d.className = 'stats-container';
    container.appendChild(d);

    //build stats for movies
    pubsub.subscribe('moviesUpdated', stats.moviesUpdated);
    console.log('STATS: listening for moviesUpdated events');

    let pm = document.createElement('p');
    pm.className = 'movie-count';
    pm.innerHTML = `0 movies in list`;
    d.appendChild(pm);

    //build stats for actors
    pubsub.subscribe('actorsUpdated', stats.actorsUpdated);
    console.log('STATS: listening for actorsUpdated events');

    let pa = document.createElement('p');
    pa.className = 'actor-count';
    pa.innerHTML = `0 actors in list`;
    d.appendChild(pa);
  },
  moviesUpdated: list => {
    //the list of movies was just published as updated
    console.log(
      `STATS: I hear that the movie list now has ${list.length} titles.`
    );
    document.querySelector(
      '.movie-count'
    ).innerText = `${list.length} movies in list`;
  },
  actorsUpdated: list => {
    console.log(
      `STATS: I hear that the actor list now has ${list.length} names.`
    );
    document.querySelector(
      '.actor-count'
    ).innerText = `${list.length} actors in list`;
  }
};
