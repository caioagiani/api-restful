/*
 * @author @Caio Agiani
 * @description API RESTful - NoSQL MongoDB
 * @website https://www.linkedin.com/in/caioagiani/
 */

const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
  console.log({ status: 'on', company: 'Sky', banco: 'mongodb' });
});
