import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import AlbumList from './components/AlbumList'
import CreateAlbum from './components/CreateAlbum'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/albums" exact component={AlbumList}/>
        <Route path="/albums/edit/:id" component={CreateAlbum}/>
        <Route path="/albums/create" component={CreateAlbum}/>
      </div>
    </Router>
  );
}

export default App;
