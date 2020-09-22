import React from 'react';
import ReactDOM from 'react-dom';
import Loginform from './Components/loginform';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatRoom from './Components/chatroom';

/*Element to be rendered*/
let element = <BrowserRouter basename={process.env.PUBLIC_URL}>
              <main>
                <Switch>
                  <Route path="/" component={Loginform} exact />
                  <Route path="/chat" component={ChatRoom} />
                  <Route component={<div>404 Page not found</div>}/>
                </Switch>
              </main>
            </BrowserRouter>
ReactDOM.render(
  element,
  document.getElementById('root')
);

