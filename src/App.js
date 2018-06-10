import React, { Component } from 'react';
import UserForm from './components/UserForm';

class App extends Component {
  render() {
    return <UserForm onSubmit={username => alert(username)} />
  }
}

export default App
