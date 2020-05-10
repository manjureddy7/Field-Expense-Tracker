export const checkPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return false;
  return true;
};
