import React, {useState} from 'react';
import '../App.css';
import EditableRow from './EditableRow'

interface Data {
  //user_id: number;
  first_name: string;
  last_name: string;
  age: number;
  [key: string]: string | number;
}


const initial_data: Data[] = [
  {user_id: 0, first_name: "Maiju", last_name: "Meikäläinen", age: 27},
  {user_id: 1, first_name: "Joona", last_name: "Nousiainen", age: 24},
  {user_id: 2, first_name: "Jaska", last_name: "Jokunen", age: 25},
  {user_id: 3, first_name: "Maija", last_name: "Mehiläinen", age: 26}
];

const headers = [
  {key: "header-1", sort_key: "first_name", title: "First Name"},
  {key: "header-2", sort_key: "last_name", title: "Last Name"},
  {key: "header-3", sort_key: "age", title: "Age"} 
];



function SortableTable() {

  const [data, setData] = useState(initial_data);
  const [order, setOrder] = useState("Asc");
  const [formData, setFormData] = useState<Data>({
    first_name: '',
    last_name: '',
    age: -1
  })

  const addFormData = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const field = String(event.currentTarget.getAttribute("name"));
    const value = event.currentTarget.value;
    const updatedData = {...formData};
    updatedData[field] = value;
    setFormData(updatedData);
  }

  const submitForm = (event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    //tietokantaan tallentaessa palautetaan id, joka laitetaan dataan mukaan.
    const newData = [...data];
    newData.push(formData);
    console.log(newData);
    setData(newData);
    
  }

  const sortByColumn = (event: React.MouseEvent<HTMLHeadingElement>) =>{
    event.preventDefault();
    order === "Asc" ? setOrder("Desc") : setOrder("Asc");
    const headerKey = String(event.currentTarget.getAttribute("sort-key"));

      const sortedData = (data: Data[]) => data.sort((a, b) =>{
        if(order === "Asc"){
          return a[headerKey] < b[headerKey] ? 1 : -1
        }
        else{
          return a[headerKey] > b[headerKey] ? 1 : -1
        }
      });

    setData(sortedData);
  }

  const deleteRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const index = event.currentTarget.closest('tr')?.rowIndex;
    if(typeof(index) === 'number'){
      const newData = [...data];
      newData.splice(index-1, 1);
      setData(newData);
    }
  }

  const editRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  return (
    <div className="Sortable-table">
      <h2>Add new user</h2>
      <form>
        <input type="text" name="first_name" onChange={addFormData} required placeholder="Enter First Name"></input>
        <input type="text" name="last_name" onChange={addFormData} required placeholder="Enter Last Name"></input>
        <input type="number" name="age" onChange={addFormData} required placeholder="Enter Age"></input>
        <button className='submit-form-button' onClick={submitForm}>Submit</button>
      </form>
      <table className='table-element'>
        <thead className='table-headers'>
          <tr>
            {headers.map((row) => {
              // return <th onClick={sortByColumn} key={row.key} sort-key={row.sort_key}>{row.title}</th>})}
              return <th onClick={sortByColumn} sort-key={row.sort_key}>{row.title}</th>})}
          </tr>
        </thead>
        <tbody className='table-body'>
          {data.map((row) => {
            return <tr key={row.user_id}>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.age}</td>
            <td>
              <button onClick={editRow}>Edit</button>
              <button onClick={deleteRow}>Delete</button>
            </td>
            </tr>})
            }
        </tbody>
      </table>
    </div>
  );
}

export default SortableTable;
