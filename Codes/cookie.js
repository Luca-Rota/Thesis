useEffect(() => {
  const cookies = document.cookie.split(';');
  const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
  if (authTokenCookie) {
    const authToken = authTokenCookie.split('=')[1];
    const { payload: { publicAddress, name, surname, email, profession, country, region } } = jwtDecode(authToken);
    setAuthState({ publicAddress, name, surname, email, profession, country, region });
  }
}, []);

const handleLoggedIn = (auth, publicAddress, credentials) => {
  document.cookie = 'authToken=${JSON.stringify(auth)}; path=/; samesite=None; secure';
  setAuthState({ publicAddress, name: credentials.name, surname: credentials.surname, email: credentials.email, profession: credentials.profession, country: credentials.country, region: credentials.region});
  navigate('/');
};
