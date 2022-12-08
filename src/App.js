import LeftDrawer from './Drawer';
import Contexts from './Contexts';
import SquareGrid from './SquareGrid';
import MyVerticallyCenteredModal from './OptionsDialogBox';


function App() {
  return (
    <div className="App">
      <Contexts>
        <LeftDrawer/>
        <br/>
        <MyVerticallyCenteredModal/>
        <SquareGrid/>
      </Contexts>
    </div>
  );
}
export default App;
