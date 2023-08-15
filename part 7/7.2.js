import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(a => a.id === id);

  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  );

};

<Route path="/anecdotes/:id">
  <Anecdote anecdotes={anecdotes} />
</Route>

{anecdotes.map(anecdote => (
  <div key={anecdote.id}>
    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  </div>
))}
