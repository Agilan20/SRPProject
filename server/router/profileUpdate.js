import { Router } from "express";
const router = Router();
import UserModel from '../model/User.model.js'

router.route('/:username').get(async (req, res) => {
    try {

        const { username } = req.params;
        console.log(username)

        // check the user existance
        let exist = await UserModel.findOne({ username:username });
        console.log("Agilan",exist)
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        return res.status(201).send({ userDetails: exist });

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
});

router.route('/').post(async (req, res) => {
    console.log("Hello agilan", req.body);
    try {

        const { username } = req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });

        console.log("Hello user")
        await UserModel.updateOne({ username: username }, req.body).then(
            function (data, err) {
                if (err) throw err;
                return res.status(201).send({ msg: "Record Updated...!" });
            }
        ).catch(error => res.status(500).send({ error }))

    } catch (error) {
        console.log(error)
        return res.status(404).send({ error: "Authentication Error" });
    }
});

router.route('/document').post(async (req, res) => {
    try {

        const { username } = req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });

        if(exist.documents==null){
            let temp = {};
            Object.keys(req.body.documents).map((key) => {
                temp[key] = req.body.documents[key]
            })
            
            exist["documents"] = temp;
            console.log(exist)
        }else{
            console.log("Agilan1234")
            let temp = exist["documents"];
            console.log(temp)
            Object.keys(req.body.documents).map((key) => {
                temp[key] = req.body.documents[key]
            })
            exist["documents"] = temp;
            console.log(temp)
        }
        await UserModel.updateOne({ username: username }, exist).then(
            function (data, err) {
                if (err) throw err;
                return res.status(201).send({ msg: "Record Updated...!" });
            }
        ).catch(error => res.status(500).send({ error }))

    } catch (error) {
        console.log(error)
        return res.status(404).send({ error: "Authentication Error" });
    }
});

export default router;