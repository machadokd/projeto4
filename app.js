const express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var bcrypt = require('bcrypt');

require('dotenv').config()


const app = express()
const port = 5000

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/imagens', express.static(__dirname + 'public/imagens'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'asdeaffcaspprpqwioeafax',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie:{expires:300000}
}));
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },function(email, password, done) {
        console.log(email);
        console.log(password);

        const db = require('./db.js');

        db.query('SELECT id,password,isAdmin,confirmado FROM user WHERE email = ?', [email], function(err, results, fields){
            if (err) {done(err)};

            console.log(results)

            if(results[0].confirmado == 0){
                return done(null, false)
            }else{
                if(results.length == 0){
                    return done(null, false);
                }else{
                    const hash = results[0].password.toString();

                    bcrypt.compare(password, hash, function(err, response){
                        if(response === true){
                            return done(null, {user_id: results[0].id , isAdmin: results[0].isAdmin})
                        }else{
                            return done(null, false)
                        }
                    })
                }
            }
            
        })  
    }
  ));


const router = require('./src/routes/index')

app.use('/', router)

app.listen(port, ()=> console.log(`Listening on port ${port}`))