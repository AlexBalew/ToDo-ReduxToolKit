import {appReducer, InitialStateType, setAppStatusAC, setAppErrorAC} from "../app-reducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('exact error should be set', () => {

    const finalState = appReducer(startState, setAppErrorAC('someError'))

    expect(finalState.error).toBe('someError')

})

test('correct status should be set', () => {

    const finalState = appReducer(startState, setAppStatusAC('succeeded'))

    expect(finalState.status).toBe('succeeded')

})