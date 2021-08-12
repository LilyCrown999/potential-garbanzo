
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc Show add page
//@route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
        res.render('stories/add')
})

// @desc Process add form
//@route POST /stories  
router.post('/', ensureAuth,  async (req, res) => {
    try{
        req.body.user = req.user.id 
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch(err){ 
        console.error(err)
        res.render('error/500')
    }
})

//@desc Show all stories
//@route GET /stories/add
router.get('/', ensureAuth, async (req, res) => {
    try{
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({createdAt: -1 })
            .lean()

        res.render('stories/index',{
            stories, 
        })
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

//@ desc Show Stories by Id
//@route GET /stories/{{stories._id}}
// router.get('/:id', ensureAuth , async (req, res) => {
//     try { 

//         // req.body/*.id*/ = req.params.id
//         const stories =  await Story.find(req.body.id)

//         res.render('stories/index',{stories})
//     } catch (err) {
//         console.log(err)
//         res.render('error/500')
//     }
// })

module.exports = router; 