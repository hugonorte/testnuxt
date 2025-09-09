export const useTestString = () => {
  const bar = useState('foo', () => "teste")
  return bar
}

// Errado: Estado local, não compartilhado
//const state = useState(() => 0)

// Correto: Estado compartilhado
//const state = useState('myState', () => 0)