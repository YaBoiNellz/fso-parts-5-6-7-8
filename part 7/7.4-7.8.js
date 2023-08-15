// hooks/index.js
export const useField = (type) => {
    const [value, setValue] = useState('');
  
    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const reset = () => {
      setValue('');
    };
  
    return {
      type,
      value,
      onChange,
      reset,
    };
  };
  
  // CreateNew.js
  const CreateNew = () => {
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');
  
    const addAnecdote = (event) => {
      event.preventDefault();
      anecdoteService.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0,
      });
      // ...
    };
  };
  
  // CreateNew.js
const CreateNew = () => {
    // ...
  
    const handleReset = () => {
      content.reset();
      author.reset();
      info.reset();
    };
  
    return (
      <div>
        {/* ...form inputs... */}
        <button onClick={addAnecdote}>Create</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  };
  
  // hooks/index.js
export const useField = (type) => {
    const [value, setValue] = useState('');
  
    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const reset = () => {
      setValue('');
    };
  
    return {
      type,
      value,
      onChange,
      reset,
    };
  };
  
  // hooks/index.js
export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
      const fetchCountry = async () => {
        try {
          const response = await axios.get
      
          setCountry(response.data[0]);
        } catch (error) {
          setCountry(null);
        }
      };
  
      fetchCountry();
    }, [name]);
  
    return country;
  };

  // hooks/index.js
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
  
    const getAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
  
    const create = async (newObject) => {
      const response = await axios.post(baseUrl, newObject);
      setResources([...resources, response.data]);
    };
  
    return [resources, { getAll, create }];
  };
  
  // App.js
  const App = () => {
    // ...
    const [notes, noteService] = useResource('http://localhost:3005/notes');
    const [persons, personService] = useResource('http://localhost:3005/persons');
    
    // ...
  };
  
  