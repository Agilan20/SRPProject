/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios'
import { uploadFileToIPFS } from "../context/pinata"

export default function ProfileUpdateChild() {



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

    

    useEffect(() => {
        
        if (details == null) {
            const getDetails = async () => {
                try {
                    const res = await axios.get("http://localhost:8080/api/profileUpdate/Agilan20");
                    const temp = {
                        username: res.data.userDetails.username ? res.data.userDetails.username : "",
                        email: res.data.userDetails.email ? res.data.userDetails.email : "",
                        about: res.data.userDetails.about ? res.data.userDetails.about : "",
                        firstName: res.data.userDetails.firstName ? res.data.userDetails.firstName : "",
                        lastName: res.data.userDetails.lastName ? res.data.userDetails.lastName : "",
                        idProof: res.data.userDetails.idProof ? res.data.userDetails.idProof : {
                            name: "",
                            url: ""
                        },
                        citizenship: res.data.userDetails.citizenship ? res.data.userDetails.citizenship : "Indian",
                        address: res.data.userDetails.address ? res.data.userDetails.address : "",
                        city: res.data.userDetails.city ? res.data.userDetails.city : "",
                        state: res.data.userDetails.state ? res.data.userDetails.state : "",
                        zipCode: res.data.userDetails.zipCode ? res.data.userDetails.zipCode : ""
                    };
                    setDetails(temp)
                    console.log("Hello123", temp)

                    return temp
                } catch (error) {
                    console.log("ErrorAgilan", error)
                }
            }
            const temp = getDetails();
            // console.log("Hello Agilan", temp)
            // setDetails({ ...temp })
        }
    }, [])

    async function profileUpdateUser(request) {
        try {
            console.log("Agilan", request)
            const { data: { msg }, status } = await axios.post("http://localhost:8080/api/profileUpdate", request);

            if (status === 201) return Promise.resolve(msg)
        } catch (error) {
            return Promise.reject({ error })
        }
    }

    const uploadFile = async () => {

        try {
            const response = await uploadFileToIPFS(idProofBuffer, idProof);
            if (response.success === true) {

                const idProofData = {
                    name: idProof,
                    url: response.pinataURL
                }
                setDetails({ ...details, idProof: idProofData })
                return Promise.resolve("Uploaded successfully")

            }
            // if (status === 201) 
        } catch (error) {
            return Promise.reject({ error })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (idProof != "" && idProofBuffer != "") {
            try {
                let uploadFilePromise = uploadFile()
                await toast.promise(uploadFilePromise, {
                    loading: 'Uploading documents...',
                    success: <b>Documents uploaded Successfully...!</b>,
                    error: <b>Could not uplod.</b>
                });
            } catch (error) {

            }
        }


        try {
            const request = { ...details }
            toast.promise(profileUpdateUser(request), {
                loading: 'Updating...',
                success: <b>Profile update Successfully...!</b>,
                error: <b>Could not Update.</b>
            });
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
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">ISTSP.com/</span>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        id="username"

                                                        value={details.username}
                                                        onChange={(e) => {
                                                            setDetails({ ...details, username: e.target.value })
                                                        }}

                                                        disabled
                                                        autoComplete="username"
                                                        className="outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Your Username"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                About
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    rows={3}

                                                    value={details.about}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, about: e.target.value })
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
                                                    <span>Upload ID proof</span>
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
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"

                                                    value={details.firstName}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, firstName: e.target.value })
                                                    }}

                                                    autoComplete="given-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"

                                                    value={details.lastName}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, lastName: e.target.value })
                                                    }}

                                                    autoComplete="family-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    disabled
                                                    value={details.email}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, email: e.target.value })
                                                    }}

                                                    autoComplete="email"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Citizenship
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    name="country"

                                                    value={details.citizenship}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, citizenship: e.target.value })
                                                    }}

                                                    autoComplete="country-name"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option value="Indian" key="Indian">Indian</option>
                                                    <option value="NRI" key="NRI">NRI</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="street-address"
                                                    id="street-address"

                                                    value={details.address}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, address: e.target.value })
                                                    }}

                                                    autoComplete="street-address"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"

                                                    value={details.city}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, city: e.target.value })
                                                    }}

                                                    autoComplete="address-level2"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="region"
                                                    id="region"
                                                    value={details.state}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, state: e.target.value })
                                                    }}

                                                    autoComplete="address-level1"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="postal-code"
                                                    id="postal-code"

                                                    value={details.zipCode}
                                                    onChange={(e) => {
                                                        setDetails({ ...details, zipCode: e.target.value })
                                                    }}

                                                    autoComplete="postal-code"
                                                    className="outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        We'll always let you know about important changes, but you pick what else you want to hear about.
                                    </p>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                            <div className="mt-6 space-y-6">
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="comments"
                                                            name="comments"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                                            Comments
                                                        </label>
                                                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                    </div>
                                                </div>
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="candidates"
                                                            name="candidates"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                                            Candidates
                                                        </label>
                                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                    </div>
                                                </div>
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="offers"
                                                            name="offers"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                                            Offers
                                                        </label>
                                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-everything"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Everything
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-email"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Same as email
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                        No push notifications
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
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
