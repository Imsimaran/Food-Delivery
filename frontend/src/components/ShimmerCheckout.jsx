const ShimmerCheckout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar shimmer */}
            <div className="w-full h-16 bg-gray-200 animate-pulse mb-8"></div>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address Form Shimmer */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        {/* Title shimmer */}
                        <div className="h-8 w-48 bg-gray-200 animate-pulse mb-6 rounded"></div>

                        {/* Form fields shimmer */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="mb-4">
                                <div className="h-6 w-24 bg-gray-200 animate-pulse mb-2 rounded"></div>
                                <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        ))}

                        {/* Submit button shimmer */}
                        <div className="h-12 w-full bg-gray-200 animate-pulse rounded-md mt-4"></div>
                    </div>

                    {/* Order Summary Shimmer */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        {/* Summary title shimmer */}
                        <div className="h-8 w-48 bg-gray-200 animate-pulse mb-6 rounded"></div>

                        {/* Restaurant orders shimmer */}
                        {[1, 2].map((restaurant) => (
                            <div key={restaurant} className="mb-6 border-b pb-4">
                                {/* Restaurant name shimmer */}
                                <div className="h-6 w-64 bg-gray-200 animate-pulse mb-4 rounded"></div>

                                {/* Order items shimmer */}
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex justify-between py-2">
                                        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Total amount shimmer */}
                        <div className="h-8 w-32 bg-gray-200 animate-pulse mt-4 rounded"></div>

                        <hr className="my-4 border-gray-200 border-2" />

                        {/* Payment methods shimmer */}
                        <div className="h-8 w-48 bg-gray-200 animate-pulse mb-4 rounded"></div>
                        
                        {/* Payment options shimmer */}
                        {[1, 2, 3, 4].map((method) => (
                            <div key={method} className="flex items-center gap-2 mb-4">
                                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
                                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShimmerCheckout;
