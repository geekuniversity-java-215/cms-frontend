import React from 'react';

import './App.css';
import {Route} from "react-router-dom";
import Registration from "./components/registrationForm/RegistrationForm";


function App() {
    return (
        <div>
            <Route path='/main'
                   render={() => <div>
                       <span>Main page</span>
                       <a href={"/registration"}>Регистрация</a>
                   </div>}/>
            <Route path='/registration'
                   render={() => <Registration/>}/>
        </div>
    );
}

export default App;
