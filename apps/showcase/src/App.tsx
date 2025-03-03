import { Chip } from "vbss-ui-chip";

function App() {
  return (
    <div style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
      <Chip as={'div'} variant={'primary'} size={'sm'}>Oi</Chip>
      <Chip variant={'secondary'} size={'md'}>Oi</Chip>
      <Chip variant={'outline'} size={'lg'}>Oi</Chip>
    </div>
  );
}

export default App;
