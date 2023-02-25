//CALLING THE DIFFERENT REQUIRE MODULES
const Joi = require('joi')
const exp = require('express')
const express = exp()

express.use(exp.json())

//CREATING COURSES TO CALL FROM BROWSER WHEN REQUEST IS SENT
const courses = [
    {id:1, name: 'nodejs'},
    {id:2, name: 'mongodb'},
    {id:3, name: 'express'},
    {id:3, name: 'api'}
]

//SETTING THE GET REQUEST AND THE RESPONSE
//GET REQUEST == READING
express.get('/', (req,res) => {
    res.send('Hello world!!!')
})

//SETTING THE GET DETAILED REQUEST AND THE RESPONSE 
express.get('/api/courses', (req, res) => {
    res.send(courses)
})

express.get('/api/courses/:id', (req, res) => {
    const list = courses.find(c => c.id === parseInt(req.params.id))
    if (!list) return res.status(404).send('The course with given id was not found')
    res.send(list)
}) 

///POST REQUEST === UPDATING
express.post('/api/courses', (req, res) => {
    const { error } = validatecourse(req.body)
    if (error){
        return res.status(400).send(validate.error.details[0].message)
    }
    const list = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(list)
    res.send(list)
})

//LOOK UP COURSE, VALIDATE, RETURN ERROR  WHEN NECESSARY, UPDATE 
//PUT REQUEST === CREATING
express.put('/api/courses/:id', (req, res) => {
    
    const list = courses.find(c => c.id === parseInt(req.params.id))
    if (!list) return res.status(404).send('The course with given id was not found')
    
    const schema = {
        name: Joi.string().min(3).required()
    }
    const { error } = validatecourse(req.body)
    if (error){
       return res.status(400).send(validate.error.details[0].message)
    }
    list.name = req.body.name;
    res.send(list)
})

function validatecourse(list){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(list, schema)
}

//DELETE REQUEST === DELETING
express.delete('/api/courses/:id', (req, res) => {
    const list = courses.find(c => c.id === parseInt(req.params.id))
    if (!list) return res.status(404).send('The course with given id was not found')

    //delete
    const index = courses.indexOf(list)
    courses.splice(index, 1)
    
    res.send(list)
})

//PORT
const port = process.env.PORT || 1080
express.listen(port, () => console.log(`Listening on port ${port}...`))