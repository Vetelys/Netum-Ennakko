import React, {useState, useEffect, useCallback} from 'react';
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

interface SortParam {
  order: "Asc" | "Desc";
  column: string;
}


const initial_data: Data[] = [
  {user_id: 0, first_name: "Maiju", last_name: "Meikäläinen", age: 27},
  {user_id: 1, first_name: "Joona", last_name: "Nousiainen", age: 24},
  {user_id: 2, first_name: "Jaska", last_name: "Jokunen", age: 25},
  {user_id: 3, first_name: "Maija", last_name: "Mehiläinen", age: 26}
];



function SortableTable() {

  const [sortParam, setSortParams] = useState<SortParam>({order: "Asc", column: "first_name"});
  const [data, setData] = useState<Data[]>(initial_data);

  useEffect(()=>{
    sortItems(); // MUUTTUU ILMAN setData??
  }, [sortParam])

  const sortItems = () => {

    const sortCol = sortParam.column;
    const order = sortParam.order;
    const sortedData = [...data];
    
    sortedData.sort((a, b) =>{
      // sort age by numerical value
      if(sortCol === 'age'){
          if(order === "Asc"){
            return a[sortCol] - b[sortCol] <= 0 ? 1 : -1
          }
          else{
            return a[sortCol] - b[sortCol] > 0 ? 1 : -1
          }
      }
      //sort everything else by lower cased string value
      else{
          if(order === "Asc"){
            return String(a[sortCol]).toLowerCase() < String(b[sortCol]).toLowerCase() ? 1 : -1
          }
          else{
            return String(a[sortCol]).toLowerCase() > String(b[sortCol]).toLowerCase() ? 1 : -1
          }
      }
    });
    setData(sortedData);
  }

  // SORT BY COLUMNS
  const sortByColumn = (event: React.MouseEvent<HTMLHeadingElement>) =>{
    event.preventDefault();
    const sortKey = String(event.currentTarget.getAttribute("sort-key"));
    sortParam.order === "Asc" ? setSortParams({order: "Desc", column: sortKey}) : setSortParams({order: "Asc", column: sortKey});
  }

  //  CREATE
  const submitForm = (event: React.FormEvent<HTMLButtonElement>, userData: Data) =>{
    event.preventDefault();
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
      <div><h2>All Users</h2></div>
      <table className='table-element'>
        <Header sort={sortByColumn}></Header>
        <tbody className='table-body'>
          {data.map((row) => {return <EditableRow data={{...row}} callbacks={{...callbacks}}></EditableRow>})}
        </tbody>
      </table>
    </div>
  );
}

export default SortableTable;
