import Board from './components/Board'
import './App.scss'

const App = () => {
  // ratio = 5 /12
  const HEIGHT = 20, WIDTH = 48 
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
