import reducer, { initialUserState, clearLoginStatus, setUserObj } from '../store/userSlice';

it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialUserState)
})

it("should set the user", () => {
    expect(reducer(initialUserState, setUserObj({ username: "yoshitha" }))).toEqual({
        userObj: { username: "yoshitha" }, isSuccess: true,invalidLoginMessage:'',
        isLoading: false,
        isError: false, allUsers: []
    })
})

it("should reset the user", () => {
    expect(reducer({
        userObj: { name: "testUser", email: "test@test.com" }, isSuccess: true,
        isLoading: false,
        isError: "", allUsers: []
    }, clearLoginStatus())).toEqual(initialUserState)
})