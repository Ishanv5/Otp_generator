import {useState} from "react";
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import 'firebase/compat/auth';
import {set,ref} from "firebase/database";
import firebase from "firebase/compat/app";


const firebaseConfig = {
  apiKey: "AIzaSyDi67nolJXRvtzhCK1MUFnjKBurntJvn-0",
  authDomain: "otp-generator-14949.firebaseapp.com",
  databaseURL: "https://otp-generator-14949-default-rtdb.firebaseio.com",
  projectId: "otp-generator-14949",
  storageBucket: "otp-generator-14949.appspot.com",
  messagingSenderId: "467964611378",
  appId: "1:467964611378:web:88c646916969a9177fe52b"
};


const app = firebase.initializeApp(firebaseConfig);
const db=getDatabase(app);
function EnApp(){
const[name,setName]=useState("");
const[query,setQuery]=useState("");
const[phone,setPhone]=useState("");
const[otp,setOtp]=useState("");
const[final,setFinal]=useState("");

const hName=(event)=>{setName(event.target.value);}
const hQuery=(event)=>{setQuery(event.target.value);}
const hPhone=(event)=>{setPhone(event.target.value);}
const hOtp=(event)=>{setOtp(event.target.value);}
const hFinal=(event)=>{setFinal(event.target.value);}

const configureCaptcha=()=>{
window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('sign-in-button',{
'size':'invisible',
'callback':(response)=>{
  sendOtp();
console.log("Recaptca varified")
},
defaultCountry:"IN"
});
}
const sendOtp=(event)=>{
event.preventDefault();
configureCaptcha();
let pn="+91"+phone;
let av=window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(pn,av)
.then(res=>{
  setFinal(res);
  console.log(res);
  console.log("OTP sent");
  alert("OTP sent");
})
.catch(err=>{
console.log(err);
})
}
const submitOtp=(event)=>{
event.preventDefault();
final.confirm(otp)
.then(res=>{
const d=new Date().toString();
const n=name + " --> " + d;
const data={name,phone,query,d}
set(ref(db,"visitors/" + n),data)
.then(res=>{
  console.log(res);
alert("We will call u in 2 hrs ");
window.location.reload()
})
.catch(err=>console.log(err))
})
.catch(err=>{
console.log(err);
alert("Invalid OTP");
window.location.reload()
})
}
return(
<>
<center>
<h1>Fill the Enquiry Form</h1>
<form onSubmit={sendOtp}>
<div id="sign-in-button"></div>
<input type="text" placeholder="Enter ur name " onChange={hName} value={name}/>
<br/><br/>
<textarea placeholder="Enter ur query" row={5} cols={22} onChange={hQuery} value={query}></textarea>
<br/><br/>
<input type="number" placeholder="Enter ur phone nos " onChange={hPhone} value={phone}/>
<br/><br/>
<input type="submit" value="Generate OTP"/>
<br/><br/>
</form>
<form onSubmit={submitOtp}>


<input type="number" placeholder="Enter ur OTP " onChange={hOtp} value={otp}/>
<br/><br/>
<input type="submit"/>
<br/><br/>
</form>
</center>
</>
);
}
export default EnApp;