export const blankState = {
  user: {
    id: '',
    username: '',
    position: '',
  },
};

let initialState = blankState;
const storedState = localStorage.getItem('state');
if (storedState) {
  initialState = JSON.parse(storedState);
}

export default initialState;
