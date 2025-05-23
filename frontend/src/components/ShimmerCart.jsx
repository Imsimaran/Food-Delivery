const ShimmerCart = () => {
    return (
        <div className="w-full min-h-screen">
            {/* Navbar shimmer */}
            <div className="w-full h-16 bg-gray-200 animate-pulse mb-8"></div>

            {/* Cart items and bill details container */}
            <div className="flex flex-col gap-4 lg:flex-row w-full justify-around items-center p-6">
                {/* Cart items section */}
                <div className="flex flex-col justify-center items-center gap-4 flex-wrap py-10">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white shadow-md rounded-lg w-full flex flex-col md:flex-row gap-4 items-center p-4">
                            {/* Food image shimmer */}
                            <div className="w-56 h-40 bg-gray-200 animate-pulse rounded-md"></div>
                            
                            {/* Food details shimmer */}
                            <div className="flex flex-col gap-3 w-full">
                                {/* Name and veg/non-veg icon */}
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                                </div>
                                
                                {/* Description */}
                                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                                
                                {/* Price */}
                                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                                
                                {/* Rating */}
                                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                                
                                {/* Quantity controls */}
                                <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bill details section */}
                <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg w-full lg:w-1/4 p-2">
                    {/* Header and clear cart button */}
                    <div className="flex justify-between items-center">
                        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                    </div>

                    {/* Bill items */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="px-4">
                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                                </div>
                                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        </div>
                    ))}

                    <hr className="w-full border-gray-300"/>
                    
                    {/* Total amount */}
                    <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
                    
                    {/* Checkout button */}
                    <div className="h-12 w-full bg-gray-200 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default ShimmerCart;