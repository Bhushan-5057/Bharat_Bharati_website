"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { fetchDonations } from "@/store/redux/slices/donationSlice";
import Image from "next/image";
import { LeafIcon } from "lucide-react";

const DonationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { donations, loading, error } = useSelector(
    (state: RootState) => state.donations
  );

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const SkeletonCard = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-1/2 bg-gray-300 rounded mx-auto"></div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="h-64 w-full md:w-1/2 bg-gray-200 rounded"></div>
        <div className="space-y-4 md:w-1/2">
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
      <div className="h-5 w-1/4 bg-gray-300 rounded mx-auto mt-4"></div>
      <div className="h-32 w-full bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="relative  flex justify-center " style={{ fontFamily: "var(--font-jost)" }}>
      <div className="max-w-6xl w-full bg-white/90 backdrop-blur-md rounded-2xl p-10 relative z-10 space-y-20">
        {loading
          ? Array(2).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : donations.length === 0
            ? <p className="text-center text-gray-600 text-lg font-medium">No donations found</p>
            : donations.map(donation => (
              <div key={donation.id} className="space-y-8">
                <div className="flex items-center justify-center text-gray-400 mb-4">
                  <span className="tracking-widest opacity-60">:::::</span>
                  <LeafIcon className="mx-3 w-6 h-6 text-green-600" aria-hidden />
                  <span className="tracking-widest opacity-60">:::::</span>
                </div>

                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#D62828] tracking-wide">
                    {donation.title}
                  </h1>
                  <div
                    className="w-24 h-1 mt-2 mx-auto rounded-full"
                    style={{
                      background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                    }}
                  ></div>
                </div>



                <p className="text-gray-700 text-base md:text-lg text-justify w-full">
                  {donation.description}
                </p>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex flex-col md:flex-row items-stretch gap-8">
                    <div className="md:w-1/2 flex">
                      <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full">
                        <Image
                          src={`data:image/jpeg;base64,${donation.data}`}
                          alt={donation.file_name || "Donation Image"}
                          width={500}
                          height={300}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-start space-y-4">
                      <div className="flex items-center justify-center text-gray-400">
                        <span className="tracking-widest opacity-60">:::::</span>
                        <LeafIcon className="mx-3 w-6 h-6 text-green-600" aria-hidden />
                        <span className="tracking-widest opacity-60">:::::</span>
                      </div>

                      <h3 className="font-bold text-xl text-orange-600 text-center mt-1">
                        {donation.sub_title}
                      </h3>

                      <ul className="space-y-2 text-gray-800 text-sm md:text-base">
                        <li><strong>Account Holder:</strong> {donation.account_holder_name}</li>
                        <li><strong>Account Number:</strong> {donation.account_number}</li>
                        <li><strong>Bank:</strong> {donation.bank_name}</li>
                        <li><strong>IFSC:</strong> {donation.ifsc_code}</li>
                      </ul>
                      <p className="text-center text-sm md:text-base font-medium text-gray-600 italic mt-3">
                        "Your contribution today helps build a brighter tomorrow."
                      </p>
                    </div>


                  </div>

                </div>
              </div>

            ))
        }
      </div>
    </div>
  );
};

export default DonationPage;
