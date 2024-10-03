"use client";
import React from "react";
import CardPopularProducts from "./CardPopularProducts";
import CardSalesSummary from "./CardSalesSummary";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StaffCard from "./StaffCard";
import { Package, TrendingDown, TrendingUp } from "lucide-react";



const  Dashboard = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts/>
            <CardSalesSummary/>
            <CardPurchaseSummary/>
            <CardExpenseSummary/>
            <StaffCard
            title="Customer and Expenses"
            primaryIcon={<Package className="text-blue-600 w-6 h-6"/>}
            dateRange="22 - 29 October 2023"
            details={[
                {
                    title:"Customer Growth",
                    amount:"175.00",
                    changePerdentage:131,
                    IconComponent: TrendingUp,
                },
                {
                  title:"Expenses",
                  amount: "10.00",
                  changePerdentage: -56,
                  IconComponent: TrendingDown, 
                }
            ]}
            />
               <StaffCard
            title="Dues & Pending Orders"
            primaryIcon={<Package className="text-blue-600 w-6 h-6"/>}
            dateRange="22 - 29 October 2023"
            details={[
                {
                    title:"Dues",
                    amount:"250.00",
                    changePerdentage:131,
                    IconComponent: TrendingUp,
                },
                {
                  title:"Pending Orders",
                  amount: "147",
                  changePerdentage: -56,
                  IconComponent: TrendingDown, 
                }
            ]}
            />
               <StaffCard
            title="Sales & Discount"
            primaryIcon={<Package className="text-blue-600 w-6 h-6"/>}
            dateRange="22 - 29 October 2023"
            details={[
                {
                    title:"Sales",
                    amount:"1000.00",
                    changePerdentage:20,
                    IconComponent: TrendingUp,
                },
                {
                  title:"Pending Orders",
                  amount: "250",
                  changePerdentage: -10,
                  IconComponent: TrendingDown, 
                }
            ]}
            />
            <div className="row-span-3 xl:row-span-6 bg-gray-500"/>

            <div className="row-span-3 xl:row-span-6 bg-gray-500"/>
            <div className="row-span-2 xl:row-span-3 md:col-span-2 xl:col-span-1 bg-gray-500"/>
            <div className="row-span-2 xl:row-span-3 md:col-span-2 xl:col-span-1 bg-gray-500"/>
            <div className="row-span-3"/>
            <div className="md:row-span-1 xl:row-span-2"/>
            <div className="md:row-span-1 xl:row-span-2"/>
            <div className="md:row-span-1 xl:row-span-2"/>
            <div/>
        </div>
    )
}
export default Dashboard;
