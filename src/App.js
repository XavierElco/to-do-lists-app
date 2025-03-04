import Header from './Components/TodoComponents/Header.jsx';
import './Components/CSS/App.css';
import './Components/CSS/Lists.css';
import Lists from './Components/TodoComponents/Lists.jsx';

function App() {
  return (
    <div className="main">
      <Header></Header>
      <Lists/>
    </div>
  );
}

export default App;
