export const PLAYX = 'playx'
export const PLAYO = 'playo'
export const RESTART = 'restart'

export const reducer = (state, action) => {
    switch (action.type) {
        case PLAYX:
            const { i, j } = action.payload
            state[i][j] = 'x'
            return [...state]

        case PLAYO:
            const { k, l } = action.payload
            state[k][l] = 'o'
            return [...state]

        case RESTART:
            state = action.payload
            return state
    }
}