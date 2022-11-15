 
import React,{useState,useEffect} from 'react'
import { db  } from './FirebaseConfig' 
import {v4 as uuidv4} from "uuid"
import "./App.css"
 import {
collection,
  query,
  onSnapshot,
   addDoc,doc,updateDoc

} from "firebase/firestore"; 
import List from './components/ListContainer';

const Register = () => {
  const collectionRef=collection(db,"users")
  const [data1,setData1]=useState([])
  const [edit,setEdit]=useState('')
   
   
   
    const [data,setData]=useState({
        username:'',
        Account:'',
        BankName:'',
        AddressLine1:'',
        AddressLine2:'',
        City:'',
        Country:'',
        ZipCode:''
    })
    const{username,Account,BankName,AddressLine1,AddressLine2,City,Country,ZipCode }=data
const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}
useEffect(()=>{
    const q=query(collection(db,"users"));
    const unsub=onSnapshot(q,(querySnapshot)=>{
        let ListArray=[]
         
        querySnapshot.forEach((doc)=>{
             ListArray.push({...doc.data(),id:doc.id})
        })
         
        setData1(ListArray)
    })
    return ()=>unsub();
},[])
 
 

const submitHandler=(e)=>{
e.preventDefault();

if(edit){
    
   updateData()
   return setEdit('')
    
}




if ((data.username==='') ||(data.Account==='') ||(data.BankName==='')){

  return alert("please fill Required Details")
}
if(data.Account.length<=9){
  return alert("Enter 10-digits")
}
 addDoc(collectionRef,{
  id:uuidv4(),
    username:data.username,
        Account:data.Account,
        BankName:data.BankName,
        AddressLine1:data.AddressLine1,
        AddressLine2:data.AddressLine2,
        City:data.City,
        Country:data.Country,
        ZipCode:data.ZipCode
  }).then(()=>{
    alert("Data added")
  }).catch((e)=>{
    console.log(e.message)
  })
  setData({
        username:'',
        Account:'',
        BankName:'',
        AddressLine1:'',
        AddressLine2:'',
        City:'',
        Country:'',
        ZipCode:''
    })

}
     
  const updateData=()=>{
 const dataToUpdate=doc(db,"users",edit);
  
 updateDoc(dataToUpdate,{
     username:data.username,
        Account:data.Account,
        BankName:data.BankName,
        AddressLine1:data.AddressLine1,
        AddressLine2:data.AddressLine2,
        City:data.City,
        Country:data.Country,
        ZipCode:data.ZipCode
 }).then(()=>{
    alert("updateDone")
 }).catch((e)=>{
    alert(e.message)
 })
  setData({
        username:'',
        Account:'',
        BankName:'',
        AddressLine1:'',
        AddressLine2:'',
        City:'',
        Country:'',
        ZipCode:''
    })
 }
 const update=async(id)=>{
    
    
   const ans= await data1.filter((each)=>(each.id===id))
    setData({
    username:ans[0].username,
        Account:ans[0].Account,
        BankName:ans[0].BankName,
        AddressLine1:ans[0].AddressLine1,
        AddressLine2:ans[0].AddressLine2,
        City:ans[0].City,
        Country:ans[0].Country,
        ZipCode:ans[0].ZipCode
   })


   setEdit(id)
     
    


 }

  return (
    <div>
        <center> 
        <form onSubmit={submitHandler}>
            <h3>Bank Details Form</h3>
            <input type="text" name="username" placeholder='Vendor Name*' 
            value={username} onChange={changeHandler}/><br/>

            <input type="number" name="Account" placeholder='Bank Account No*'
             value={Account} onChange={changeHandler}/><br/>

              

            <input type="text" name="BankName" placeholder='Bank Name*'
             value={BankName} onChange={changeHandler}/><br/>

             <input type="text" name="AddressLine1" placeholder='Address Line 1' 
            value={AddressLine1} onChange={changeHandler}/><br/>
            
             <input type="text" name="AddressLine2" placeholder='Address Line 2' 
            value={AddressLine2} onChange={changeHandler}/><br/>

            <input type="text" name="City" placeholder='City' 
            value={City} onChange={changeHandler}/><br/>

            <input type="text" name="Country" placeholder='Country ' 
            value={Country} onChange={changeHandler}/><br/>

            

            <input type="password" name="ZipCode" placeholder='Zip Code' 
            value={ZipCode}onChange={changeHandler}/><br/>

            <button  className='btn' type="submit">{edit?"update":"Register"}  </button><br/>
            
        </form>
         <List each={data1} editTodo={update} />
        </center>
    </div>
  )
}

export default Register
