const routeToStep = (steps, route) => {
  const routeToFind = route.toUpperCase();
  const index = steps.findIndex(
    (step) => step.route.toUpperCase() === routeToFind
  );
  return index + 1;
};

const stepToRoute = (steps, step) => {
  return 0 < step && step <= steps.length ? steps[step - 1].route : "";
};

const getFirstRoute = (steps) => {
  return steps[0].route;
};

const getLastRoute = (steps) => {
  return steps[steps.length - 1].route;
};

const getFirstStep = () => {
  return 1;
};

const getLastStep = (steps) => {
  return steps.length;
};

export {
  routeToStep,
  stepToRoute,
  getFirstRoute,
  getLastRoute,
  getFirstStep,
  getLastStep,
};
