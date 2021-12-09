import {InitialStateType, setAppStatusAC, setAppErrorAC} from "../app-reducer";
import { appReducer } from "../reducer/all-reducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isAppInitialized: true,
    }
})

test('exact error should be set', () => {

    const finalState = appReducer(startState, setAppErrorAC({error: 'someError'}))

    expect(finalState.error).toBe('someError')

})

test('correct status should be set', () => {

    const finalState = appReducer(startState, setAppStatusAC({status: 'succeeded'}))

    expect(finalState.status).toBe('succeeded')

})