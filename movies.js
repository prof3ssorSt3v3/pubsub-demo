import { pubsub } from './pubsub.js';

export const movies = {
  list: [],
  render: container => {
    let template = document.getElementById('movieListTemplate');
    let div = template.content.cloneNode(true);
    container.appendChild(div);

    //listen for movieAdded messages
    console.log('MOVIES: want to know if a movie is added');
    pubsub.subscribe('movieAdded', movies.movieAdded);
  },
  movieAdded: title => {
    //use Set to prevent duplicates
    console.log(`MOVIES: I hear that ${title} was added`);
    let list = new Set(movies.list);
    list.add(title);
    movies.list = Array.from(list).sort();

    //tell anyone who is listening that the movie list was updated
    console.log(`MOVIES: just updated the list`);
    pubsub.publish('moviesUpdated', movies.list);

    //then update the ui with the new list
    let ul = document.querySelector('.movie-container ul');
    ul.innerHTML = '';
    let df = document.createDocumentFragment();
    movies.list.forEach(title => {
      let li = document.createElement('li');
      li.innerText = title;
      df.appendChild(li);
    });
    ul.appendChild(df);
  }
};
