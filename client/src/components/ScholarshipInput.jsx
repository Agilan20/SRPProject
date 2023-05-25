
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { uploadFileToIPFS } from "../context/pinata"
 
export default function ScholarshipInput() {



    const [idProof, setIdProof] = useState("")
    const [idProofBuffer, setIdProofBuffer] = useState("")
    const handleFileChange = async (e) => {
        setIdProof(e.target.files[0].name)
        const file = await e.target.files[0]
        setIdProofBuffer(file)
        setDetails({
            ...details, idProof: {
                name: e.target.files[0].name
            }
        })
        console.log("Agilan", e.target.files[0].name, e.target.files[0])
    }

    const [details, setDetails] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {

        if (details == null) {
            const getDetails = async () => {
                try {
                    const res = await axios.get("http://localhost:8080/api/scholarshipDetails/scholarship1");
                    const temp = {
                        name: res.data.scholarshipDetails.name ? res.data.scholarshipDetails.name : "",
                        image: res.data.scholarshipDetails.image ? res.data.scholarshipDetails.image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fscholarship-poster&psig=AOvVaw0bhA0NxoPqgNlrGOkDSma_&ust=1683625547111000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIj-m4e45f4CFQAAAAAdAAAAABAE",
                        description: res.data.scholarshipDetails.description ? res.data.scholarshipDetails.description : "",
                        eligilibity: res.data.scholarshipDetails.eligibility ? res.data.scholarshipDetails.eligibility : "",
                        deadline: res.data.scholarshipDetails.deadline ? res.data.scholarshipDetails.deadline : "",
                        price: res.data.scholarshipDetails.price ? res.data.scholarshipDetails.price : "",
                    };

                    return temp
                } catch (error) {
                    console.log("ErrorAgilan", error)
                }
            }
            const temp = getDetails();
            console.log("Hello Agilan", temp)
            setDetails({ ...temp })
        }
    })

    async function scholarshipUpdate(request) {
        try {
            console.log("Agilan", request)
            const { data: { msg }, status } = await axios.post("http://localhost:8080/api/scholarshipUpdate", request);
            if (status === 201) return Promise.resolve(msg)
        } catch (error) {
            return Promise.reject({ error })
        }
    }

    // const uploadFile = async () => {

    //     try {
    //         const response = await uploadFileToIPFS(idProofBuffer, idProof);
    //         if (response.success === true) {

    //             const idProofData = {
    //                 name: idProof,
    //                 url: response.pinataURL
    //             }
    //             setDetails({ ...details, idProof: idProofData })
    //             return Promise.resolve("Uploaded successfully")

    //         }
    //         // if (status === 201) 
    //     } catch (error) {
    //         return Promise.reject({ error })
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Hello")
        console.log("Hello",details)
        // if (idProof != "" && idProofBuffer != "") {
        //     try {
        //         let uploadFilePromise = uploadFile()
        //         await toast.promise(uploadFilePromise, {
        //             loading: 'Uploading documents...',
        //             success: <b>Documents uploaded Successfully...!</b>,
        //             error: <b>Could not uplod.</b>
        //         });
        //     } catch (error) {

        //     }
        // }


        try {
            const request = { ...details, image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fscholarship-poster&psig=AOvVaw0bhA0NxoPqgNlrGOkDSma_&ust=1683625547111000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIj-m4e45f4CFQAAAAAdAAAAABAE" }
            let scholarshipPromise = scholarshipUpdate(request)
            toast.promise(scholarshipPromise, {
                loading: 'Creating...',
                success: <b>Scholarship Created Successfully...!</b>,
                error: <b>Could not Create.</b>
            });
            scholarshipPromise.then(function () { navigate('/scholarship') });
        } catch (error) {

        }

        // const response = await uploadFileToIPFS(idProofBuffer, idProof);
        // if (response.success === true) {

        //     const idProofData = {
        //         name: idProof,
        //         url: response.pinataURL
        //     }
        //     console.log("Agilan", idProofData)
        //     
        // }

    }



    return (
        <>
            {
                details === null ? "Loading" :

                    <>
                        <Toaster position='top-center' reverseOrder={false}></Toaster>

                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"

                                                        value={details.name}
                                                        onChange={(e) => {
                                                            setDetails({ ...details, name: e.target.value })
                                                        }}
                                                        autoComplete="username"
                                                        className="outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Scholarship Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                Description
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows={3}

                                                    value={details.description}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, description: e.target.value })
                                                    }}

                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Photo
                                            </label>
                                            <div className="mt-2 flex items-center gap-x-3">
                                                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />

                                                <label
                                                    htmlFor="file-upload"
                                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    <span>Upload Image</span>
                                                    <input id="file-upload" name="idProof" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                                {/* <span>{idProof !== "" ? idProof : details.idProof[0].name}</span> */}
                                                <span>{idProof}</span>
                                                {/* idProof!=="" ? idProof :  */}
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Eligibility</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Eligibility
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"

                                                    value={details.eligibility}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, eligibility: e.target.value })
                                                    }}

                                                    autoComplete="given-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Fund Amount
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"

                                                    value={details.price}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, price: e.target.value })
                                                    }}

                                                    autoComplete="family-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>



                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Deadline
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="dealine"
                                                    id="dealine"

                                                    value={details.deadline}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, deadline: e.target.value })
                                                    }}

                                                    autoComplete="family-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                    </>
            }
        </>
    )
}
