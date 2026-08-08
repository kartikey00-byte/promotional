import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import LanguageModal from './components/LanguageModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} language={language} />;
      case 'about':
        return <About onNavigate={setCurrentPage} language={language} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} language={language} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'contact':
        return <Contact language={language} />;
      default:
        return <Home onNavigate={setCurrentPage} language={language} />;
    }
  };

  return (
    <>
      <LanguageModal setLanguage={setLanguage} />
      
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        language={language}
        setLanguage={setLanguage}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer 
        setCurrentPage={setCurrentPage} 
        language={language}
      />
    </>
  );
}

export default App;
