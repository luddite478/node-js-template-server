const express            =          require('express');
const router             =          require('express').Router();
const passport           =          require('passport');

const getThings          =          require('./getThings');
const addThing           =          require('./addThing');
const deleteThings       =          require('./deleteThings');
const updateThing        =          require('./updateThing');

router.get('/', (req, res)  => {
  res.render('index');
});
router.get('/login', (req, res)  => {
  res.render('login');
});
router.get('/protected', ensureAuthenticated, (req, res)  => {
  res.render('protected');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
});

router.get('/favicon.ico', (req, res) => res.status(204));
router.get('/things', getThings);
router.post('/things', addThing);
router.delete('/things', deleteThings);
router.put('/things', updateThing);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
     return next();
  } else {
    req.session.returnTo = req.path;
    res.redirect('/login');
  }
}

module.exports = router;
