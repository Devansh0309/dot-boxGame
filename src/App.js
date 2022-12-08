import LeftDrawer from './Drawer';
import Contexts from './Contexts';
import SquareGrid from './SquareGrid';


function App() {
  return (
    <div className="App">
      <Contexts>
        <LeftDrawer/>
        <br/>
        {/* <Modal/> */}
        <SquareGrid/>
      </Contexts>
    </div>
  );
}
export default App;
