import React, {useState} from 'react';

interface Data {
    //user_id: number;
    first_name: string;
    last_name: string;
    age: number;
    [key: string]: string | number;
  }

function EditableRow(data : Data){
    const [editable, setEditable] = useState<boolean>(false)

    const setEditState = () =>{
        setEditable(true);
    }

    if(editable){
        return(
        <div>
            <tr>
                <td><input>{data.first_name}</input></td>
                <td><input>{data.last_name}</input></td>
                <td><input>{data.age}</input></td>
                <td>
                    <button>Save</button>
                    <button>Cancel</button>
                </td>
            </tr>
        </div>)
    }
    else{
        return(
            <div>
                <tr>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.age}</td>
                    <td>
                    <button onClick={setEditState}>Edit</button>
                    <button>Delete</button>
                    </td>
                </tr>
            </div>
        )
    }
}

export default EditableRow;