const login = (req, res) => {
    res.render('login')
}

const logout = (req, res) => {
    req.logout(() => {
      req.session.destroy((err) => {
        res.redirect('/');
        console.log('Se ah cerrado sesion');
      });
    });
  }

module.exports = {
    login,
    logout 
};