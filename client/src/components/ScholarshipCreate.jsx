import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProfileUpdateChild from './ProfileUpdateChild'
import Navbar from './Navbar'
import Collapsible from './Collapsible'
import ScholarshipInput from './ScholarshipInput'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
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
        id: 'profile',
        name: 'Profile',

    },
    {
        id: 'documents',
        name: 'Documents',

    },
    {
        id: 'scholarships',
        name: 'Scholarships',

    },
]



export default function ScholarshipCreate() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const [tab, setTab] = useState("profile")


    return (
        <div className="bg-white">
            <Navbar />
            <div>
                {/* Mobile filter dialog */}
                

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className=" max-w-3xl mx-auto">
                            

                            {/* Product grid */}
                            <div className="lg:col-span-3">

                                {
                                    tab === "profile" ? <ScholarshipInput /> : null
                                }

                                {
                                    tab === "documents" ? <Collapsible />: null
                                }

                                {
                                    tab === "scholarships" ? <>Scholarships</> : null
                                }
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}