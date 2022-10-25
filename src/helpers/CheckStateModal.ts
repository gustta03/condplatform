export let IsOpen: boolean;

const CheckModalTrueOrFalse = (error: boolean) => {

  if (!error) {
    return IsOpen = true;
  } else {
    return IsOpen = false;
  }
};

// this fn set modal to don't open when click in other screens

const StateModalDefaltMainApp = (state: boolean) => {
  return IsOpen = state
};

export { CheckModalTrueOrFalse, StateModalDefaltMainApp };
