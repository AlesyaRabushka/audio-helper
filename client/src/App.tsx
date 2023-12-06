import React from 'react';
import './App.css';
import { ChatComponent } from './components/chatComponent/chatComponent';
import { StartViewComponent } from './components/startViewComponent/startViewComponent';
import { Layout } from './components/layout/layoutComponent';

function App() {
  return (
    <div className="App">
      <Layout>
        <StartViewComponent/>
      </Layout>
    </div>
  );
}

export default App;
