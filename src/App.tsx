import { ChangeEvent, useState } from 'react'
import { usePeopleList } from './reducers/PeopleList';

function App() {

  const [list, dispatch] = usePeopleList();
  const [nameInput, setNameInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  }

  const handleAddButton = () => {
    if (nameInput) {
      dispatch({
        type: 'ADD',
        payload: {
          name: nameInput
        }
      });

      setNameInput('');
    }
  }

  const handleDeleteButton = (id: string) => {
    dispatch(
      {
        type: 'DEL',
        payload: { id: id }
      })
  }

  const orderButton = () => {
    dispatch({ type: 'ORDER' });
  }

  return (
    <div>

      <input type="text" value={nameInput} onChange={handleInputChange} />
      <button onClick={handleAddButton}>Adicionar</button>

      <hr />

      Lista de pessoas:
      <ul>
        {list.map((item, index) => {
          return (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleDeleteButton(item.id)}>Deletar</button>
            </li>
          )
        })}
      </ul>
      <button onClick={orderButton}> Ordenar </button>
    </div >
  )
}

export default App
