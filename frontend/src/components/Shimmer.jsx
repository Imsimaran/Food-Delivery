const Shimmer = () => {
    return (
        <div className="w-full min-h-screen">
            {/* Navbar shimmer */}
            <div className="w-full h-16 bg-gray-200 animate-pulse mb-8"></div>

            {/* Logo and header shimmer */}
            <div className="flex flex-col justify-center items-center p-6 relative w-full">
                <div className="w-full md:h-[200px] h-[130px] bg-gray-200 animate-pulse rounded-xl mb-8"></div>
            </div>

            {/* Search bar shimmer */}
            <div className="md:w-1/2 w-full mx-auto flex justify-center items-center p-6 gap-2">
                <div className="w-full h-12 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-24 h-12 bg-gray-200 animate-pulse rounded-md"></div>
            </div>

            {/* Restaurant cards shimmer */}
            <div className="flex m-6 flex-col md:flex-wrap md:justify-center md:flex-row items-center justify-center gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="flex flex-col rounded-xl w-full md:w-1/2 lg:w-1/6 shadow-lg">
                        {/* Image shimmer */}
                        <div className="w-full h-40 bg-gray-200 animate-pulse rounded-t-xl"></div>
                        
                        {/* Content shimmer */}
                        <div className="px-4 py-2">
                            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                            <div className="flex flex-row justify-between mb-2">
                                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                            <div className="border-gray-200 border-2 my-2"></div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shimmer;