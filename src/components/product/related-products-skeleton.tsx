interface RelatedProductsSkeletonProps {
    count?: number;
}

export const RelatedProductsSkeleton = ({ count = 4 }: RelatedProductsSkeletonProps) => {
    return (
        <div className="mt-10" aria-busy="true" aria-label="Loading products">
            <div className="bg-gray-200 dark:bg-gray-700 rounded w-32 h-8 mb-4 mx-auto md:mx-0 animate-pulse"></div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-4 gap-8">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="rounded overflow-hidden">
                        <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full animate-pulse"></div>
                        <div className="pt-4 space-y-3">
                            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded animate-pulse"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 h-3 w-1/2 rounded animate-pulse"></div>
                            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-1/3 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}