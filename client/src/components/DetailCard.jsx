import "../assets/css/detailcard.css"
import CardImage from "../assets/card-img.jpg"
import Scholarship from "./Scholarship"
import { Link } from "react-router-dom"
export default function DetailCard(props) {

    return (

        // <div className="card">
        //     <div className="card-header">
        //         <h3>Nike</h3>
        //         <p>Running sneakers</p>
        //         <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        //             Badge
        //         </span>
        //     </div>
        //     <div className="card-img">
        //         <img src={CardImage} alt="..." />
        //         <i className="bx bx-heart" />
        //     </div>
        //     <div className="card-details">
        //         <div className="price">
        //             <p>Price</p>
        //             <strong>$169.00</strong>
        //         </div>
        //         <div className="colors">
        //             <div className="selected">
        //                 <i className="bx bx-check" />
        //             </div>
        //             <div>
        //                 <i className="bx bx-check" />
        //             </div>
        //             <div>
        //                 <i className="bx bx-check" />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="card-sizes">
        //         <span className="selected">38</span>
        //         <span>39</span>
        //         <span>40</span>
        //         <span>41</span>
        //         <span>42</span>
        //         <span>43</span>
        //     </div>
        //     <div className="card-footer">
        //         <button>Buy now</button>
        //     </div>
        // </div>

        <div className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src={CardImage} alt="" />

            <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Engineering
                    </span>
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        MCA
                    </span>
                </div>

                {/* product title */}

                <h2 className="mt-2 font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {props.scholarship.name}
                </h2>

                {/* scholarship amount */}

                <div>
                    <span className="text-lg font-bold">
                        Rs {props.scholarship.price}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm opacity-70">
                            Deadline:
                        </span>
                        <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white
                        ">
                            {props.scholarship.deadline}
                        </span>
                    </div>
                </div>

                <div className="mt-3 flex gap-2">
                    <Link to="/scholarship-detail" className="text-white font-semibold bg-yellow-500/80 hover:bg-yellow-500/90 px-6 py-2 rounded-md tracking-wider transition">
                        Apply
                    </Link>
                </div>


            </div>
        </div>
    )
}