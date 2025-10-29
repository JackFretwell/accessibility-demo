export const ShowToastEvent = jest.fn().mockImplementation((event) => {
    return {
        type: 'lightning__showtoast',
        detail: event
    };
});