import React from 'react';

const OrderHistorySkeleton = () => {
    return (
        <div className="mb-5 border rounded-custom-10px p-4 md:p-[30px] animate-pulse">
            <div className="flex items-center justify-between gap-2.5">
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-200 h-4 skeleton w-40 rounded-full"></div>
                    <div className="bg-gray-200 h-3 skeleton w-32 rounded-full"></div>
                </div>

                <div className="bg-gray-200 px-3.5 py-1.5 skeleton rounded-full h-[30px] w-[120px]"></div>
            </div>
            <div className="border-b md:mt-5 mt-3.5"></div>

            {
                [...Array(2)].map((_: any, index: any) => {
                    return (
                        <div key={index} className="flex items-center justify-between border-b border-dashed py-5 gap-3.5">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[60px] h-[60px] bg-gray-200 rounded-custom-10px"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-gray-200 h-2 skeleton md:w-52 w-32 rounded-full"></div>
                                    <div className="bg-gray-200 h-2 skeleton md:w-52 w-32 rounded-full"></div>
                                    <div className="bg-gray-200 h-2 skeleton md:w-32 w-20 rounded-full"></div>
                                </div>
                            </div>

                            <div className="md:flex hidden flex-col gap-2 ">
                                <div className="bg-gray-200 h-2 skeleton w-28 rounded-full"></div>
                                <div className="bg-gray-200 h-2 skeleton w-24 rounded-full"></div>
                            </div>

                            <div className="md:flex hidden flex-col gap-2">
                                <div className="bg-gray-200 h-2 skeleton w-28 rounded-full"></div>
                                <div className="bg-gray-200 h-2 skeleton w-24 rounded-full"></div>
                            </div>
                            <div className="bg-gray-200 h-9 w-[80px] skeleton rounded-md"></div>
                        </div>
                    )
                })
            }
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-200 h-2 skeleton w-28 rounded-full"></div>
                    <div className="bg-gray-200 h-2 skeleton w-24 rounded-full"></div>
                </div>
                <div className="bg-gray-200 rounded-md w-[100px] h-[36px] skeleton md:mt-7 mt-3.5"></div>
            </div>
        </div>
    );
};

export default OrderHistorySkeleton;