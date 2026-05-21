"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { fetchDonations } from "@/store/redux/slices/donationSlice";
import Image from "next/image";
import { LeafIcon, ShieldCheck, Landmark } from "lucide-react";

const DonationPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { donations, loading } = useSelector(
    (state: RootState) => state.donations
  );

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const SkeletonCard = () => (
    <div className="animate-pulse rounded-3xl border border-gray-200 bg-white shadow-md p-6 md:p-10">
      <div className="h-8 w-60 bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="h-72 w-full bg-gray-200 rounded-2xl"></div>
          <div className="h-5 w-32 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="space-y-5">
          <div className="h-16 bg-gray-200 rounded-xl"></div>
          <div className="h-16 bg-gray-200 rounded-xl"></div>
          <div className="h-16 bg-gray-200 rounded-xl"></div>
          <div className="h-16 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-gradient-to-br from-orange-50 via-white to-green-50"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {loading ? (
          Array(2)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        ) : donations.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-medium">
            No donations found
          </p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white/95 backdrop-blur-md rounded-[28px] border border-gray-200 shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 sm:px-8 md:px-10 pt-8 md:pt-10">
                <div className="flex items-center justify-center text-gray-400 mb-5">
                  <span className="tracking-[8px] opacity-60">:::::</span>
                  <LeafIcon
                    className="mx-3 w-6 h-6 text-green-600"
                    aria-hidden
                  />
                  <span className="tracking-[8px] opacity-60">:::::</span>
                </div>

                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D62828] tracking-wide leading-tight">
                    Bank Details for Donations
                  </h1>

                  <div
                    className="w-28 h-1 mt-3 mx-auto rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-5 sm:px-8 md:px-10 py-8 md:py-10">
                <div className="flex flex-col h-full">
                  <div className="relative flex-1 bg-gradient-to-br from-orange-50 to-green-50 rounded-3xl border border-gray-200 shadow-lg p-4 sm:p-6 flex flex-col justify-center">
                    <div className="absolute top-4 right-4 bg-white shadow-md rounded-full p-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="text-center mb-5">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                        Scan & Donate
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Secure payment using QR code
                      </p>
                    </div>

                    <div className="rounded-2xl overflow-hidden bg-white shadow-inner border border-gray-100 mx-auto w-full max-w-md">
                      <Image
                        src={`data:image/jpeg;base64,${donation.data}`}
                        alt={donation.file_name || "Donation QR"}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-5 sm:p-7 md:p-8 h-full">
                  <div className="flex items-center justify-center text-gray-400 mb-5">
                    <span className="tracking-[8px] opacity-60">:::::</span>

                    <Landmark
                      className="mx-3 w-6 h-6 text-orange-500"
                      aria-hidden
                    />

                    <span className="tracking-[8px] opacity-60">:::::</span>
                  </div>

                  <h3 className="text-2xl font-bold text-center text-orange-600 mb-8">
                    Account Information
                  </h3>

                  <div className="grid grid-cols-1 gap-5">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Account Holder
                      </p>

                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                        {donation.account_holder_name}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Account Number
                      </p>

                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-all">
                        {donation.account_number}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Bank Name
                      </p>

                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                        {donation.bank_name}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        IFSC Code
                      </p>

                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-all">
                        {donation.ifsc_code}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        UPI ID
                      </p>

                      <p className="text-base sm:text-lg font-semibold text-gray-900 break-all">
                        {donation.upi_id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-green-50 to-orange-50 border border-gray-100 rounded-2xl p-5 text-center">
                    <p className="text-sm sm:text-base font-semibold italic text-green-700 leading-relaxed">
                      "Your contribution today helps build a brighter tomorrow."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationPage;