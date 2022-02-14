import React, {useState} from 'react';

interface Props{
    submitForm: (event: React.FormEvent<HTMLButtonElement>, data: Data) => void;
}

interface Data {
    //user_id: number;
    first_name: string;
    last_name: string;
    age: number;
    [key: string]: string | number;
  }


function AddUserForm(props: Props){

    const [formData, setFormData] = useState<Data>({
        first_name: '',
        last_name: '',
        age: NaN
      })

    const addFormData = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const field = String(event.currentTarget.getAttribute("name"));
        const value = event.currentTarget.value;
        const updatedData = {...formData};
        updatedData[field] = value;
        setFormData(updatedData);
        console.log(updatedData);
      }

    const Submit = (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        if(formData.first_name !== '' && formData.last_name !== '' && formData.age){
            props.submitForm(event, formData);
            setFormData({first_name: '', last_name: '', age: NaN})
        }
        else{
            console.log("bad input")
        }
    }

    return(
        <div>
            <h2>Add new user</h2>
            <form  className='add-user-form'>
                <input type="text" name="first_name" onChange={addFormData} value={formData.first_name} required placeholder="Enter First Name"></input>
                <input type="text" name="last_name" onChange={addFormData} value={formData.last_name} required placeholder="Enter Last Name"></input>
                <input type="number" min="0" name="age" onChange={addFormData} value={String(formData.age)} required placeholder="Enter Age"></input>
                <button className='submit-form-button' onClick={Submit}>Submit</button>
            </form>
        </div>
    )

}
export default AddUserForm;