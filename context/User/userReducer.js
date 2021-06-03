export const userInitialState = {
  user: null,
};

const userReducer = (state, action) => {
  console.log("userReducer => ", { action });

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default userReducer;
