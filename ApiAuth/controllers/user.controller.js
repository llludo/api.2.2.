const UserModel = require ('../models/user.model');
const objectID = require('mongoose').Types.ObjectId;

// ALL USER {GET}
module.exports.getAllusers = async(req,res)=>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

// voir un utilisateur grace a l'id{GET}
module.exports.userInfo = (req, res) => {
    if (!objectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
};

//modifier un user{PUT}
module.exports.updateUser = async(req,res)=>{
    if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio,
                    pseudo : req.body.pseudo
                }
            },
            {new: true , upsert:true ,setDefaultsOnInsert:true},
            (err,docs)=>{
                if(!err) return res.send(docs);
                if(err) return res.status(500).send({message: err});
            }
        )
    } catch (err) {
        return res.status(500).json({message: err});
    }
};

//supprimer un user {DELETE}
module.exports.deleteUser = async (req,res)=>{
    if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: "success remove"});
    } catch (err) {
        return res.status(500).json({message: err});
    }
};


/***********FOLLOW-AND-UNFOLLOW*************/

module.exports.follow = async (req,res)=>{
    if (!objectID.isValid(req.params.id) || !objectID.isValid(req.body.idToFollow))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        //ajout dans la list des followers
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            {new : true , upsert : true},
            (err,docs)=>{
                if(!err)res.status(201).json(docs);
                else return res.status(400).jsos(err);
            }
        );
        //ajout a la list des following
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: { followers : req.params.id}},
            {new: true , upsert: true},
            (err,docs)=>{
                if(err) return res.status(400).jsos(err)
            }
        );
    } catch (error) {
        return res.status(500).json({message: err});
    }
};

module.exports.unfollow = async (req,res)=>{
    if (!objectID.isValid(req.params.id)|| !objectID.isValid(req.body.idToUnfollow))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        //suppression de la list des followers
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {following: req.body.idToUnfollow}},
            {new : true , upsert : true},
            (err,docs)=>{
                if(!err)res.status(201).json(docs);
                else return res.status(400).jsos(err);
            }
        );
        //suppression de la list des following
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull: {followers : req.params.id}},
            {new: true , upsert: true},
            (err,docs)=>{
                if(err) return res.status(400).jsos(err)
            }
        )
    } catch (error) {
        return res.status(500).json({message: err});
    }
};
/*****************************************************************************/



  