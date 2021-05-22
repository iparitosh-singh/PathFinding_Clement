import './App.css';
import Board from './components/Board'

function App() {
  const HEIGHT = 30, WIDTH = 40
  return (
    <div className="App">
      <Board 
        height={HEIGHT}
        width={WIDTH}
      />
    </div>
  );
}

export default App;
