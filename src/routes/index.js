const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
var nodemailer = require('nodemailer')
var nodemailer2 = require('nodemailer')
var jsonParser = bodyParser.json()
const crypto = require("crypto");
var bcrypt = require('bcrypt');
const passport = require('passport');
const { Router } = require('express')
const saltRounds = 10;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('', isLoggedIn(),async(req, res)=>{
    res.render('index')
})

router.get('/welcome',authenticationMiddleware() ,function(req,res){
    res.render('welcome')
})

router.post('/registo', urlencodedParser, function(req, res, next){
     const username = req.body.username_registo
    const password = req.body.password_registo;
    const re_password = req.body.re_password_registo;
    const email = req.body.email_registo;

    const db = require('../../db.js');

    db.query('SELECT id FROM user WHERE email = ?', [email], function(error, results, fields){
        if(results.length > 0){
            res.render('modal_registo', { titulo : 'O registo não efetuado', descricao: 'O seu registo não foi efetuado, pois o email já se encontra em uso!', redirect: '/'})
        }else{
            bcrypt.hash(password, saltRounds, async(err, hash) => {

                let resetToken = crypto.randomBytes(32).toString("hex");
                const uniqueString = await bcrypt.hash(resetToken, Number(saltRounds));
                
                db.query('INSERT INTO user (password, email, isAdmin, token, confirmado) VALUES (?,?,?,?,0)',[hash, email, 0, uniqueString], function(error,results,fields){
                    if(error) throw error;
        
                    db.query('SELECT id FROM user WHERE email = ?', [email], function(error, results, fields){
                        if(error) throw error;
                        var Transport = nodemailer.createTransport({
                            service: "Gmail",
                            auth:{
                                user: "testesrsmachado@gmail.com",
                                pass: ".Axelghn2lgmt213"
                            }
                        });
                    
                        var mailOptions;
                        var sender = "Calculadora de Risco Cardiovascular - SCORE";
                        mailOptions = {
                            from: sender,
                            to: email,
                            subject: "Confirmação Email",
                            html: `Para verificar o seu email, clique <a href=http://localhost:5000/verify/${uniqueString}> aqui </a>.`
                        };
                    
                        Transport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log(error);
                                res.render('modal_registo', { titulo : 'O registo não efetuado', descricao: 'O seu registo não foi efetuado!', redirect: '/'})
                            }else{
                                res.render('modal_registo', { titulo : 'Registado com sucesso', descricao: 'O seu registo foi efetuado com sucesso, verifique o seu email para ativar a conta!', redirect: '/'})
                            }
                        })
                    })
                })
            })
        }
    })


    
});

router.get('/verify/:uniqueString', async(req, res) => {
    const {uniqueString} = req.params
    
    const db = require('../../db.js');

    db.query('UPDATE user SET confirmado = 1 WHERE token = ?', [uniqueString], function(error, results, fields){
        res.render('modal_registo', { titulo : 'Verificado com sucesso', descricao: 'A sua conta foi verificada com sucesso', redirect: '/'})
    })
})

router.get('/loginincorreto',function(req, res){
    res.render('login_incorreto')
})

router.get('/logout', function(req,res){
    req.logout();
    req.session.destroy();
    res.redirect('/')
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/welcome',
    failureRedirect: '/loginincorreto'
}));

router.get('/admin',authenticationMiddlewareAdmin() ,function(req,res){
    const db = require('../../db.js');
    db.query("SELECT email FROM user WHERE isAdmin = 0", function(error, results, fields){
        if(error) throw error;
        results = JSON.stringify(results);
        results = JSON.parse(results);
        res.render('index_admin', {users : results})
    })
})

router.post('/guardar_calculo', authenticationMiddleware,function(req, res, next){
    const db = require('../../db.js');
    const gender = req.body.gender
    const age = req.body.age
    const colestrol_total = req.body.colestrol_total
    const pas = req.body.pas
    const fumador = req.body.fumador
    const colestrol_ldl = req.body.colestrol_ldl
    const peso = req.body.peso
    const altura = req.body.altura
    const resultado_final = req.body.resultado_final

    let d = new Date()
    let mySqlTimestamp = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      (d.getMinutes() + 30), // add 30 minutes
      d.getSeconds(),

      d.getMilliseconds()
    ).toISOString().slice(0, 19).replace('T', ' ')

    db.query('INSERT INTO calculos (idade, genero, colestrol, colestrol_ldl, pas, peso, altura, fumador, resultado, data, id_user) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[age, gender, colestrol_total, colestrol_ldl, pas, peso, altura, fumador, resultado_final, mySqlTimestamp, req.user.user_id],function(error,results,fields){
        if(error) throw error;
        res.render('modal_registo', { titulo : 'Cálculo guardado com sucesso', descricao: 'O seu cálculo foi guardado com sucesso', redirect: '/welcome'})
    })
});

router.get('/historico',authenticationMiddleware() ,function(req,res){
    const db = require('../../db.js');
    db.query("SELECT * FROM calculos WHERE id_user = ?",[req.user.user_id], function(error, results, fields){
        if(error) throw error;
        results = JSON.stringify(results);
        results = JSON.parse(results);
        res.render('historico', {calculos : results})
    })
})

router.get('/muda_password',authenticationMiddleware() ,function(req,res){
    res.render('muda_password')
})

router.post('/muda_password',authenticationMiddleware() ,function(req,res){
    var password_antiga = req.body.password_antiga
    var password_nova = req.body.password_nova
    var re_password_nova = req.body.re_password_nova

    if(password_nova == re_password_nova){
        const db = require('../../db.js');
        db.query("SELECT email,password FROM user WHERE id=?",[req.user.user_id], function(error, results, fields){
            if(error) throw error;
            var aux = results[0]
            bcrypt.compare(password_antiga, aux.password.toString(), function(err, response){
                if(response === true){
                    bcrypt.hash(password_nova, saltRounds, function(err, hash){
                        db.query('UPDATE user SET password = ? WHERE id = ?',[hash, req.user.user_id],function(error,results,fields){
                            if(error) throw error;
                            res.render('modal_registo', { titulo : 'Mudança de password efetuada!', descricao: 'A password foi atualizada com sucesso!', redirect: '/welcome'})
                        })
                    })   
                }else{
                    res.render('modal_registo', { titulo : 'Mudança de password não efetuada!', descricao: 'A password introduzida não está correta!', redirect: '/muda_password'})
                }
            })
        })
    }else{
        res.render('modal_registo', { titulo : 'Mudança de password não efetuada!', descricao: 'A passwords introduzidas não correspondem!', redirect: '/muda_password'})
    }  
})


router.get('/adicionar_administrador',authenticationMiddlewareAdmin() ,function(req,res){
    res.render('adicionar_administrador')
})

router.post('/adicionar_administrador',authenticationMiddlewareAdmin() ,function(req,res){
    const db = require('../../db.js');

    var email = req.body.email_registo_admin;
    var password = req.body.password_registo_admin;
    var re_password = req.body.re_password_registo_admin;

    if(password == re_password){
        db.query('SELECT email FROM user WHERE email=?',[email],function(error,results,fields){
                if(error) throw error;
                
                if(results.length == 0){
                    
                    bcrypt.hash(password, saltRounds, function(err, hash){
                        db.query('INSERT INTO user (password, email, isAdmin) VALUES (?,?,?)',[hash, email, 1],function(error,results,fields){
                            if(error) throw error;
                
                            db.query('SELECT id FROM user WHERE email = ?', [email], function(error, results, fields){
                                if(error) throw error;
                                if(results.length >0){
                                    res.render('modal_registo', { titulo : 'Registado com sucesso', descricao: 'Foi adicionado um administrador com sucesso!', redirect: '/admin'})
                                }
                            })
                        })
                    })
                }else{
                    res.render('modal_registo', { titulo : 'Registo não efetuado.', descricao: 'O email inserido já se encontra em uso.', redirect: '/adicionar_administrador'})
                }
            })
    }else{
        res.render('modal_registo', { titulo : 'Registo não efetuado.', descricao: 'As passwords não correspondem.', redirect: '/adicionar_administrador'})
    } 
})

router.get('/listar_calculos',authenticationMiddlewareAdmin() ,function(req,res){
    const db = require('../../db.js');
    db.query("SELECT * FROM calculos", function(error, results, fields){
        if(error) throw error;
        results1 = JSON.stringify(results);
        results1 = JSON.parse(results1);
        db.query("SELECT id,email FROM user WHERE isAdmin = 0", function(error, results, fields){
            if(error) throw error;
            results2 = JSON.stringify(results);
            results2 = JSON.parse(results2);
            console.log({calculos : results, users : results2})
            res.render('listar_calculos', {calculos : results1, users : results2})
        })
    })
})

router.post('/recupera_password',function(req,res){
    var email = req.body.email_recuperacao

    const db = require('../../db.js');

    let token = crypto.randomBytes(32).toString("hex");
    
    db.query('SELECT * FROM pwd_reset WHERE email = ?', [email], function(error, results, fields){
        if(error) throw error;

        if(results.length > 0){
            db.query('DELETE FROM pwd_reset WHERE email = ?', [email], function(error, results, fields){
                if(error) throw error;
            })
            db.query('INSERT INTO pwd_reset (token, createdAt, expires, email) VALUES (?,now(),date_add(now(),interval 10 minute),?)', [token, email], function(error, results, fields){
                if(error) throw error;
                var Transport = nodemailer2.createTransport({
                    service: "Gmail",
                    auth:{
                        user: "testesrsmachado@gmail.com",
                        pass: ".Axelghn2lgmt213"
                    }
                });
            
                var mailOptions;
                var sender = "Calculadora de Risco Cardiovascular - SCORE";
                mailOptions = {
                    from: sender,
                    to: email,
                    subject: "Recuperação password",
                    html: `Para mudar a password , clique <a href=http://localhost:5000/nova_password/${token}> aqui </a>.`
                };
            
                Transport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.render('modal_registo', { titulo : 'Email não enviado!', descricao: 'Por algum motivo o email não foi enviado', redirect: '/'})
            
                    }else{
                        console.log("EMAIL ENVIADO")
                        res.render('modal_registo', { titulo : 'Email enviado com sucesso!', descricao: 'Por favor, verifique o seu email.', redirect: '/'})
                    }
                })
            })
        }else{
            db.query('INSERT INTO pwd_reset (token, createdAt, expires, email) VALUES (?,now(),date_add(now(),interval 10 minute),?)', [token, email], function(error, results, fields){
                if(error) throw error;
                var Transport = nodemailer2.createTransport({
                    service: "Gmail",
                    auth:{
                        user: "testesrsmachado@gmail.com",
                        pass: ".Axelghn2lgmt213"
                    }
                });
            
                var mailOptions;
                var sender = "Calculadora de Risco Cardiovascular - SCORE";
                mailOptions = {
                    from: sender,
                    to: email,
                    subject: "Recuperação password",
                    html: `Para mudar a password , clique <a href=http://localhost:5000/nova_password/${token}> aqui </a>.`
                };
            
                Transport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.render('modal_registo', { titulo : 'Email não enviado!', descricao: 'Por algum motivo o email não foi enviado', redirect: '/'})
            
                    }else{
                        console.log("EMAIL ENVIADO")
                        res.render('modal_registo', { titulo : 'Email enviado com sucesso!', descricao: 'Por favor, verifique o seu email.', redirect: '/'})
                    }
                })
            })
        }
    })
})

router.get('/nova_password/:token',function(req, res){
    res.render('nova_password')
})

router.post('/nova_password/:token',function(req, res){
    const {token} = req.params
    const password = req.body.nova_password;
    const re_password = req.body.re_nova_password;

    if(password == re_password){
        const db = require('../../db.js');

        db.query('SELECT * FROM pwd_reset WHERE token = ? AND expires >= now()', [token], function(error, results, fields){
            if(error) throw error;
            if(results.length > 0){
                var email = results[0].email
                console.log(email)
                 bcrypt.hash(password, saltRounds, function(err, hash){
                    db.query('UPDATE user SET password = ? WHERE email = ?', [hash, email], function(error, results, fields){
                        if(error) throw error;
                        db.query('DELETE FROM pwd_reset WHERE email = ?', [email], function(error, results, fields){
                            if(error) throw error;
                            res.render('modal_registo', { titulo : 'Mudança efetuada!', descricao: 'A sua password foi alterada com sucesso!', redirect: '/'})
                        })
                    })
                })
            }else(
                res.render('modal_registo', { titulo : 'Mudança não efetuada!', descricao: 'O pedido já expirou, submeta novo pedido de recuperação de password!', redirect: '/'})
            )
        })
    }else{
        res.render('modal_registo', { titulo : 'Mudança não efetuada!', descricao: 'As passwords são diferentes!', redirect: '/'})
    }
})

router.get('/delete_row_historico/:id',function(req, res){
    const {id} = req.params
    const db = require('../../db.js');
    
    db.query('DELETE FROM calculos WHERE id = ?', [id], function(error, results, fields){
        if(error) throw error;
        res.render('modal_registo', { titulo : 'Apagado com sucesseo!', descricao: 'O seu cálculo foi apagado com sucesso!', redirect: '/historico'})
    })
})


passport.serializeUser(function(user_id, done){
    done(null, user_id);
})
passport.deserializeUser(function(user_id, done){
    done(null, user_id);
})

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated() && req.session.passport.user.isAdmin == 0) return next();

        if (req.isAuthenticated() && req.session.passport.user.isAdmin == 1){
            res.redirect('/admin')
        }; 
	    res.redirect('/')
	}
}

function authenticationMiddlewareAdmin () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated() && req.session.passport.user.isAdmin == 1) return next();

        if (req.isAuthenticated() && req.session.passport.user.isAdmin == 0){
            res.redirect('/welcome')
        }; 
	    res.redirect('/')
	}
}

function isLoggedIn () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if(!req.user){
            return next()
        } else if (req.isAuthenticated() && req.session.passport.user.isAdmin == 0){
            res.redirect('/welcome')
        } else if (req.isAuthenticated() && req.session.passport.user.isAdmin == 1){
            res.redirect('/admin')
        }; 
	    res.redirect('/')
	}
}


module.exports = router