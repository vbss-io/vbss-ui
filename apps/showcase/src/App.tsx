import { Chip } from "@vbss-ui/chip";
import { Chips } from "@vbss-ui/chips";

function App() {
  return (
    <div>
      <div>
        <Chip>Chip</Chip>
      </div>
      <div>
        <Chips chips={["Chip", "Chip", "Chip"]}/>
      </div>
    </div>
  );
}

export default App;
