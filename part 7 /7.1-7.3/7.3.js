import { useHistory } from 'react-router-dom';

const CreateNew = () => {
  const history = useHistory();

  const addAnecdote = async event => {
    // ...create anecdote functionality...
    history.push('/');
  };

  return (
    <div>
      {/* ...form inputs... */}
      <button onClick={addAnecdote}>Create</button>
    </div>
  );
};

const CreateNew = () => {
  const [notification, setNotification] = useState('');

  const addAnecdote = async event => {
    // ...create anecdote functionality...
    setNotification('Anecdote created successfully');
    setTimeout(() => {
      setNotification('');
    }, 5000);
    history.push('/');
  };

  return (
    <div>
      {notification && <div>{notification}</div>}
      {/* ...form inputs... */}
      <button onClick={addAnecdote}>Create</button>
    </div>
  );
};
