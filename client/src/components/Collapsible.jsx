

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { uploadFileToIPFS } from '../context/pinata'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#id', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: '10MarkSheet',
        name: '10th Marksheet',
    },
    {
        id: '12MarkSheet',
        name: '12th Marksheet',
    },
    {
        id: 'income',
        name: 'Income Certificate',
    },
    {
        id: 'community',
        name: "Community Certificate"
    },
    {
        id: 'aadhar',
        name: 'Aadhar Card'
    },
]





function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// const handleFileChange = async (e) => {
//     setdocument(e.target.files[0].name)
//     const file = await e.target.files[0]
//     setdocumentBuffer(file)
//     // setDetails({
//     //     ...details, idProof: {
//     //         name: e.target.files[0].name
//     //     }
//     // })
//     console.log("Agilan", e.target.files[0].name, e.target.files[0])
// }


export default function Collapsible() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [document, setdocument] = useState("")
    const [documentBuffer, setdocumentBuffer] = useState("")
    const [documentIndex, setdocumentIndex] = useState("")

    const [docs, setDocs] = useState({
        "10MarkSheet": {
            id: "10MarkSheet",
            name: "10th Marksheet",
            file: "",
            fileBuffer: ""
        },
        "12MarkSheet": {
            id: "12MarkSheet",
            name: "12th Marksheet",
            file: "",
            fileBuffer: ""
        }
    })


    let uploadedDoc = null
    const handleFileChange = async (e, fileIndex) => {
        console.log("Agilan", e.target.files[0])
        setdocument(e.target.files[0].name)
        setdocumentIndex(fileIndex)
        const file = await e.target.files[0]
        setdocumentBuffer(file)
        // setDetails({
        //     ...details, idProof: {
        //         name: e.target.files[0].name
        //     }
        // })
        console.log("Agilan", e.target.files[0].name, e.target.files[0])
    }

    async function profileUpdateUser(request) {
        try {
            console.log("Agilan", request)
            const { data: { msg }, status } = await axios.post("http://localhost:8080/api/profileUpdate/document", request);

            if (status === 201) return Promise.resolve(msg)
        } catch (error) {
            return Promise.reject({ error })
        }
    }
    const uploadFile = async (file, fileBuffer) => {

        try {
            const response = await uploadFileToIPFS(fileBuffer, file);
            if (response.success === true) {

                const documentData = {
                    name: document,
                    url: response.pinataURL
                }
                console.log(documentData)
                uploadedDoc = documentData
                // setDetails({ ...details, idProof: idProofData })
                if (uploadedDoc != null) return Promise.resolve("Uploaded successfully")

            }
            // if (status === 201) 
        } catch (error) {
            return Promise.reject({ error })
        }
    }
    const handleSubmit = async (e, id) => {
        e.preventDefault();

        const documentFile = docs[id]
        if (documentFile.file != "" && documentFile.fileBuffer != "") {
            try {
                let uploadFilePromise = uploadFile(documentFile.file, documentFile.fileBuffer)
                await toast.promise(uploadFilePromise, {
                    loading: 'Uploading documents...',
                    success: <b>Documents uploaded Successfully...!</b>,
                    error: <b>Could not upload.</b>
                });
            } catch (error) {

            }
        }

        if (uploadedDoc == null) {
            console.log("Agilan123")
        }
        else{
            console.log(uploadedDoc)
        }

        try {
            console.log(uploadedDoc)
            let temp = {}
            temp[id] = uploadedDoc
            const request = { documents: temp, username: "Agilan20" }
            toast.promise(profileUpdateUser(request), {
                loading: 'Updating...',
                success: <b>Profile update Successfully...!</b>,
                error: <b>Could not Update.</b>
            });
        } catch (error) {

        }


    }
    return (
        <div className="bg-white">
            <Toaster position='top-center' reverseOrder={false}></Toaster>


            <section aria-labelledby="products-heading" className="">
                <h3 className='p-3 text-xl'>
                    Documents Section
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block p-3 w-[850px]">
                        {Object.keys(docs).map((section) => (
                            <Disclosure as="div" key={docs[section].id} className=" border-b border-gray-200 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-my-3 flow-root">
                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{docs[section].name}</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </h3>
                                        <Disclosure.Panel className="pt-6">
                                            <div className="mt-2 flex items-center gap-x-3">

                                                <label
                                                    htmlFor={docs[section].id}
                                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    <span>Upload {docs[section].name}</span>
                                                    <input id={docs[section].id} name={docs[section].id} type="file" className="sr-only"
                                                        onChange={

                                                            (e) => {
                                                                let temp = docs[section]
                                                                let id = docs[section].id
                                                                temp.file = e.target.files[0].name
                                                                temp.fileBuffer = e.target.files[0]
                                                                let temp2 = docs;
                                                                temp2[id] = temp
                                                                setDocs(temp2)
                                                            }

                                                        }
                                                    />
                                                </label>
                                                <span>{document}</span>
                                                {/* idProof!=="" ? idProof :  */}
                                            </div>
                                            <button
                                                type="submit"
                                                onClick={
                                                    (e) => {
                                                        let id = docs[section].id
                                                        handleSubmit(e, id)
                                                    }
                                                }
                                                // onClick={handleSubmit}
                                                className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </Disclosure.Panel>


                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </form>

                    {/* Product grid */}
                    <div className="lg:col-span-3">{/* Your content */}</div>
                </div>
            </section>
        </div >
    )
}
