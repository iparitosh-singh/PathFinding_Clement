import Board from './components/Board'
import './App.scss'

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
