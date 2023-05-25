import { Router } from "express";
const router = Router();
import UserModel from '../model/User.model.js'
import ScholarshipModel from "../model/Scholarship.model.js";

router.route('/getScholaships').get(async (req, res) => {
    try {

        const { scholarship } = req.params;
        console.log(scholarship)

        // check the user existance
        let exist = await ScholarshipModel.find();
        console.log(exist)
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        return res.status(201).send({ scholarships: exist });

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
});

router.route('/').post(async (req, res) => {
    console.log("Hello agilan", req.body);
    try {

        // check the user existance
        // let exist = await UserModel.findOne({ name });
        // if (!exist) return res.status(404).send({ error: "Can't find User!" });

        // await ScholarshipModel.updateOne({ username: username }, req.body).then(
        //     function (data, err) {
        //         if (err) throw err;
        //         return res.status(201).send({ msg: "Record Updated...!" });
        //     }
        // ).catch(error => res.status(500).send({ error }))

        const scholarship = new ScholarshipModel({
            ...req.body
        });

        console.log("Hello", scholarship)
        // return save result as a response
        scholarship.save()
            .then(result => res.status(201).send({ msg: "Schoalrship Created Successfully" }))
            .catch(error => res.status(500).send({ error }))

    } catch (error) {
        console.log(error)
        return res.status(404).send({ error: "Authentication Error" });
    }
});

export default router;