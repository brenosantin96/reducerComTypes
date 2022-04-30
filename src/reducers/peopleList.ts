import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'

type Person = {
    id: string,
    name: string
}

//Ao criar o actionTYPE, o atributo payload é o que podemos enviar para fazer determinada acao!
type ActionType = {
    type: string;
    payload?: {
        name?: string;
        id?: string;
    }
}

//Pode colocar o TYPE ASSIM:
//type reducerState = Person[];

// ou entao assim:
const initialState: Person[] = []; //Como é uma lista de pessoas, colocamos como um array, temos que tipar ainda!

const reducer = (state: Person[], action: ActionType) => {

    switch (action.type) {
        case 'ADD':
            if (action.payload?.name) {
                const newState = [...state];
                newState.push({
                    id: uuidv4(),
                    name: action.payload?.name
                });
                return newState;
            }
            break;

        case 'DEL':
            if (action.payload?.id) {
                let newState = [...state];
                newState = newState.filter((item) => item.id !== action.payload?.id); //com o filter estamos criando um novo array onde todos são diferentes do que enviamos no payload. ou seja vai esr um novo array, sem o que queremos remover.
                return newState;
            }

            break;

        case 'ORDER':
            let newState = [...state];
            newState = newState.sort((a, b) => (a.name > b.name) ? 1 : -1); //funcao nativa js para ordenar.
            return newState;
            break;
    }

    return state;

}

export const usePeopleList = () => {
    return useReducer(reducer, initialState);
}