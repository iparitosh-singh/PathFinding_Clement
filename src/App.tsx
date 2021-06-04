import Board from './components/Board'
import './App.scss'

const App = () => {
  // ratio = 5 /12
  const HEIGHT = 30, WIDTH = 72 
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
