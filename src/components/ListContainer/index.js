import React from 'react'
import "./index.css"
import { db } from '../../FirebaseConfig'
import DeleteIcon from '@mui/icons-material/Delete';
import {
 
  doc,
deleteDoc,

} from "firebase/firestore"

const List = (props) => {
    const{each,editTodo}=props
     
const DeleteHandler= async (id) => {
    await deleteDoc(doc(db, "users", id));
  };
  
  
    
  return (
    <div className='listcon'>
      <h1>Users List</h1>
      {each!=='' &&<table> 
        <thead> 
         <tr>
          <th>username</th>
          <th>Account No</th>
          <th>Bank No.</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
        </thead>
        <tbody> 
        {each.map((e)=><tr key={e.id}>   
          <td>{e.username}</td>
          <td>{e.Account}</td>
          <td>{e.BankName}</td>
            <td><button onClick={()=>DeleteHandler(e.id)}
            className='btn12' ><DeleteIcon/></button></td> 
          <td><button onClick={()=>editTodo(e.id)}
          className="update">Update</button></td>
         <hr/>
          </tr>
           )
          }
          </tbody>
           
          </table>}

    </div>
  )
}

export default List
