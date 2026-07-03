import React from 'react';
import Desktop from './components/Desktop';
import { ThemeProvider } from './ThemeContext';
import { CaseProvider } from './case/CaseContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CaseProvider>
        <div className="App">
          <Desktop />
        </div>
      </CaseProvider>
    </ThemeProvider>
  );
}

export default App;
