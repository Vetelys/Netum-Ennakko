import React, {useState} from 'react';

interface Data {
    //user_id: number;
    first_name: string;
    last_name: string;
    age: number;
    [key: string]: string | number;
  }

interface CallBacks {
    delete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    save: (event: React.MouseEvent<HTMLButtonElement>, userData: Data) => void;
}

interface Props {
    data: Data;
    callbacks: CallBacks;
}



function EditableRow(props : Props){

    const [formData, setFormData] = useState<Data>({
        first_name: props.data.first_name,
        last_name: props.data.last_name,
        age: props.data.age
      })


    const [editable, setEditable] = useState<boolean>(false)

    const setEditState = (status: boolean) =>{
        setEditable(status);
    }

    const saveNewData = (event: React.MouseEvent<HTMLButtonElement>) =>{
        props.callbacks.save(event, formData);
        setEditable(false);

    }

    const addFormData = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const field = String(event.currentTarget.getAttribute("name"));
        const value = event.currentTarget.value;
        const updatedData = {...formData};
        updatedData[field] = value;
        setFormData(updatedData);
        console.log(updatedData);
      }

    if(editable){
        return(
        <tr>
            <td><input type="text" name="first_name" onChange={addFormData} placeholder={props.data.first_name}></input></td>
            <td><input type="text" name="last_name" onChange={addFormData} placeholder={props.data.last_name}></input></td>
            <td><input type="number" name="age" onChange={addFormData} placeholder={String(props.data.age)}></input></td>
            <td className='button-column'>
                <button onClick={saveNewData}>Save</button>
                <button onClick={() => setEditState(false)}>Cancel</button>
            </td>
        </tr>)
    }
    else{
        return(
        <tr>
            <td>{props.data.first_name}</td>
            <td>{props.data.last_name}</td>
            <td>{props.data.age}</td>
            <td className='button-column'>
                <button onClick={() => setEditState(true)}>Edit</button>
                <button onClick={props.callbacks.delete}>Delete</button>
            </td>
        </tr>
        )
    }
}

export default EditableRow;