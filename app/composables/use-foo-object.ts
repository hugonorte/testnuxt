export const useTestObject = () => {
  const barObject = useState('qualquer_nome_aqui_isso_não_aparece', () => "teste de objeto")
  return {
    barObject,
    foo: "bar",
    bla: 11111111111111
  }
}

// Errado: Estado local, não compartilhado
//const state = useState(() => 0)

// Correto: Estado compartilhado (global)
//const state = useState('myState', () => 0)