const click = () => ({
    type: 'click-counter/click',
})

const reducer = (state = 0, { type } = {}) => {
    switch (type) {
        case click().type: return state + 1;
        default: return state;
    }
}

export { reducer, click };
