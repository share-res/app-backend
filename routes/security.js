exports.addRoutes = function(app, security) {

app.post('/register', security.register)


app.post('/login',  security.login);
app.post('/logout', security.logout);

app.get('/current-user', security.sendCurrentUser);


};
