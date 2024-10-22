import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'



// class PrivateRoutes extends React.Component {
//     constructor(props){
//         super(props)    
        
//         this.authorizeUser();
//     }
//         authorizeUser = () =>{
//             const userData = {
//                 username: this.state.username,
//                 password: this.state.password,
//                 name: this.state.name,
//                 email: this.state.email
//             };
        
//             fetch('http://localhost:9091/api/authorizeUser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             })
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.success) {  
//                     let auth = {'token':true}
//                 } else {
//                     let auth = {'token':false}
//                     console.log('Authorization Failed:', data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//         }
        

//     render(){
//         return(
//             auth.token ? (
//                 <Navigate to="/home"/>
//         )   :   (
//                 <Navigate to="/login"/>
//         )
//         );
//     }
// }

const PrivateRoutes = () => {
    let auth = {'token':true} //token = true means that private route will not be blocked
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}


export default PrivateRoutes