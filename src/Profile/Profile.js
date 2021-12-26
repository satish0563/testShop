import React,{useState} from "react";
import Content from "../Dashboard/Content";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
 spacer: {
    flexGrow: "1",
  },
  avatar: {
   width: theme.spacing(13),
    height: theme.spacing(13),
  
  },
  form :{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  field : {
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    },
 
  
 
}));
function Profile() {
  const [inputText,setInputText]=useState({
    email:localStorage.getItem("email"),
    name:localStorage.getItem("name"),
    Description:localStorage.getItem("Description")
    });

    const inputEvent=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
   setInputText((lastValue)=>{
      return{
      ...lastValue,
      [name]:value
      }
      });
      
      }

      const submitForm=(e)=>{
         e.preventDefault();
         if(inputText.email===""){
          alert("Name is required");
        }
        else if(inputText.name==="")
       {
        alert("Name is required");
       }
        else{
          localStorage.setItem("name",inputText.name);
          localStorage.setItem("email",inputText.email);
          localStorage.setItem("Description",inputText.Description);
        alert("form submitted");
        }
        }
  const classes = useStyles();
    return (
      <div>
      <div  style={{ display: 'flex',flexFlow:'column-wrap'}}>
        <Content style={{  width: 300,textAlign: 'left'}}>
        <Avatar
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU"
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
       <div className={classes.spacer} />
       <div className={classes.spacer} />
    <Button  color="primary" variant="contained">Upload Image</Button>
    </Content>
    <form onSubmit={submitForm} style={{  width:200,textAlign: 'left',marginTop:40,marginLeft:60}}>
    <label htmlFor="name">Full Name</label>
    <input  id="name" style={{marginBottom:30}}  type="text"  value={inputText.name} onChange={inputEvent} name="name" maxlength="25"  placeholder="Full Name" required/>
    <label htmlFor="name"> Email Address</label>
    <input id="email"  style={{marginBottom:30}} type="email"  value={inputText.email} onChange={inputEvent} name="email"  maxlength="25"  placeholder="jj@gmail.com" required/>
    <label htmlFor="name"> Description</label>
    <TextareaAutosize
      aria-label="minimum height"
      minRows={4}
      id="Description"
      value={inputText.Description} onChange={inputEvent} 
      name="Description"
      placeholder="Description"
      style={{ width: 200 }}
    />
   <Button  type="submit" style={{ height: 28 ,float: 'right',marginTop: 30}} color="primary" variant="contained">Save</Button>
  
   </form>
   </div>
  </div>
    )
}

export default Profile