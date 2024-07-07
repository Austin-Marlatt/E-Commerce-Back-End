// Acts as middleman for server request, firt point of contact
// Normally we could use this first stop in a request to render a home page and automatically populate it with a server request that happens on page load
// As this challenge does not have a front end, instead just routes to the backend api and renders "Wrong Route!" to the page

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;