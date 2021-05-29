import './App.css';
import Board from './components/Board'

const App = () => {
  const HEIGHT = 20, WIDTH = 40
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
