import React, {useState} from 'react';
import '../App.css';
import EditableRow from './EditableRow'
import Header from './Header'
import AddUserForm from './AddUserForm'

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


function SortableTable() {

  const [data, setData] = useState(initial_data);
  const [order, setOrder] = useState("Asc");

    // SORT BY COLUMNS
    const sortByColumn = (event: React.MouseEvent<HTMLHeadingElement>) =>{
      event.preventDefault();
      order === "Asc" ? setOrder("Desc") : setOrder("Asc");
      const headerKey = String(event.currentTarget.getAttribute("sort-key"));
  
        const sortedData = (data: Data[]) => data.sort((a, b) =>{
          if(order === "Asc"){
              return String(a[headerKey]).toLowerCase() < String(b[headerKey]).toLowerCase() ? 1 : -1
          }
          else{
            return String(a[headerKey]).toLowerCase() > String(b[headerKey]).toLowerCase() ? 1 : -1
          }
        });
      setData(sortedData);
    }

  //  CREATE
  const submitForm = (event: React.FormEvent<HTMLButtonElement>, userData: Data) =>{
    event.preventDefault();
    //tietokantaan tallentaessa palautetaan id, joka laitetaan dataan mukaan.
    const newData = [...data];
    newData.push(userData);
    setData(newData);
  }


  // DELETE
  const deleteRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const index = event.currentTarget.closest('tr')?.rowIndex;
    if(typeof(index) === 'number'){
      const newData = [...data];
      newData.splice(index-1, 1);
      setData(newData);
    }
  }

  // UPDATE
  const saveRow = (event: React.MouseEvent<HTMLButtonElement>, userData: Data) => {
    event.preventDefault();
    const index = event.currentTarget.closest('tr')?.rowIndex;
    if(typeof(index)==='number'){
      const newData = [...data];
      newData[index-1] = userData;
      setData(newData);
    }
  }

  // Delete and Edit callbacks for <EditableRow>
  const callbacks = {
    delete: deleteRow,
    save: saveRow
  }

  return (
    <div className="Sortable-table">
      <AddUserForm submitForm={submitForm}></AddUserForm>
      <table className='table-element'>
        <Header sort={sortByColumn}></Header>
        <tbody className='table-body'>
          {data.map((row) => {
            return <EditableRow data={{...row}} callbacks={{...callbacks}}></EditableRow>})
          }
        </tbody>
      </table>
    </div>
  );
}

export default SortableTable;
