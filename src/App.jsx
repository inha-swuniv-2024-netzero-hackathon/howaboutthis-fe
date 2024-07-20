import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import './App.css';

import Detail from './components/Detail/Detail.jsx';
import Upload from './components/Upload/Upload.jsx';
import List from './components/List/List.jsx';

function App() {
  return (
    <div className='total-container'>
      <div className='app-container'>
        <Routes>
          <Route exact path='/' element={<List />} />
          <Route path='/detail/:author_slack_id/:unixTime' element={<Detail />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
