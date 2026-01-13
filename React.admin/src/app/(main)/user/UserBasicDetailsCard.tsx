"use client";

export default function BasicDetailsCard({ details }: { details: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Basic Details - 8fr */}
            <fieldset className="border border-gray-300 rounded-xl p-4 md:col-span-8">
                <legend className="px-2 text-sm font-medium text-gray-600">Basic Details</legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Address</p>
                        <p className="text-gray-800">{details.address}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Country</p>
                        <p className="text-gray-800">{details.country}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">State/Province</p>
                        <p className="text-gray-800">{details.state}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">City</p>
                        <p className="text-gray-800">{details.city}</p>
                    </div>
                </div>
            </fieldset>

            {/* Login Credentials - 4fr */}
            <fieldset className="border border-gray-300 rounded-xl p-4 md:col-span-4">
                <legend className="px-2 text-sm font-medium text-gray-600">Login Credentials</legend>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">User Name</p>
                        <p className="text-gray-800">{details.username}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Password</p>
                        <p className="text-gray-800">{details.password}</p>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}
