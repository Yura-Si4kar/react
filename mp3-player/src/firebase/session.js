export const startSession = (user) => {
  document.cookie = `email=${user.email};`;
  document.cookie = `accessToken=${user.accessToken}; path=/;`;
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))};`;
};

export const getSession = () => {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((cookie) => cookie.split("=")),
  );
  if (cookies.email && cookies.accessToken && cookies.user) {
    return {
      email: cookies.email,
      accessToken: cookies.accessToken,
      user: JSON.parse(decodeURIComponent(cookies.user)),
    };
  } else {
    return null;
  }
};

export const endSession = () => {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const isLoggedIn = () => {
  return getSession();
};
