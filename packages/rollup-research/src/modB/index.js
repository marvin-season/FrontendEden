export const modBFunc = () => {
  let b = 'b'; // This line will be treeshaken on the final bundle
  console.log("modB");
};
