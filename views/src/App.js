import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import './App.css';
import Api from './routes/api.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <div className='App'>
      <GeistProvider>
        <CssBaseline />
        <Router>
          <div className='main'>
            <Header />
            <Routes>
            
              <Route path="/" element={<Api/>} />

            </Routes>
            
          </div>
          <Footer />
        </Router>
      </GeistProvider>
    </div>
  );
}

export default App;
