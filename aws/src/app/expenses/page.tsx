"use client";

import { expenseByCategorySummary, useGetExpnsesByCategoryQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import Header from "../Header";
import { Cell, Pie, PieChart, ResponsiveContainer , Tooltip , Legend} from "recharts";




type AggredateDataItem = {
    name:string;
    color ? : string;
    amount : number;
};

type AggregatedData = {
    [category : string] : AggredateDataItem;
}
const Expenses = () =>{
    const [ activeIndex , setActiveIndex] = useState(0);
    const [ selectedCategory , setSelectedCategory] = useState("All");
    const [ startDate , setStartDate] = useState("");
    const [ endDate , setEndDate] = useState("");

    const { data : expenseData , isLoading , isError,} = useGetExpnsesByCategoryQuery();
   

    const expenses  = useMemo(()=> expenseData ?? [], [expenseData]);

    const parseDate = (dateString:string)=>{
        const date = new Date(dateString);
        return date.toDateString().split("T")[0];
    }

    const aggregatedData: AggredateDataItem[] = useMemo(() => {
        const filtered: AggregatedData = expenses
          .filter((data: expenseByCategorySummary) => {
            const matchesCategory =
              selectedCategory === "All" || data.category === selectedCategory;
            const dataDate = parseDate(data.date);
            const matchesDate =
              !startDate ||
              !endDate ||
              (dataDate >= startDate && dataDate <= endDate);
            return matchesCategory && matchesDate;
          })
          .reduce((acc: AggregatedData, data: expenseByCategorySummary) => {
             console.log(data.category);
            const amount = parseInt(data.amount);
          
            if (!acc[data.category]) {
              acc[data.category] = { name: data.category, amount: 0 };
              acc[data.category].color = `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`;
              acc[data.category].amount += amount;
            }
            return acc;
          }, {});
         console.log(filtered);
        return Object.values(filtered);
      }, [expenses, selectedCategory, startDate, endDate]);
   


    const classNames = {
        label : "block text-sm font-medium text-gray-700",
        selectInput:
        "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
    }
    

    if (isLoading) {
        return <div className="py-4">Loading..</div>
    }

    if(isError || !expenseData) {
    
    return (
        <div className="text-center text-red-500 py-4">
            failed to fetch expenses
        </div>
    )

}

return (
    <div>
        <div className="mb-5">
            <Header name="Expenses"/>
            <p className="text-sm text-gray-500">
                a visual representation of expenses over time
            </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold md-4">
                FIlter By Categoryu and Date 
            </h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="category" className={classNames.label}>  Catogory </label>
                        <select id="category" name="category" className={classNames.selectInput} defaultValue="All" onChange={(e)=> setSelectedCategory(e.target.value)}>
                            <option>All</option>
                            <option>Office</option>
                            <option>Professionals</option>
                            <option>Salaries</option>
                        </select>
                </div>
                <div>
                    <label htmlFor="start-date" className={classNames.label}>
                        start date
                    </label>
                    <input type="date" id="start-date" name="start-date" className={classNames.selectInput} onChange={(e)=>setStartDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="end-date" className={classNames.label}>
                        End Date
                    </label>
                    <input type="date" id="end-date" name="end-date" className={classNames.selectInput} onChange={(e)=> setEndDate(e.target.value)}/>
                </div>
            </div>
            </div>
            <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie data={aggregatedData} cx="50%" cy="50%" label outerRadius={150} fill="#8884d8" dataKey="amount" onMouseEnter={(_ , index)=> setActiveIndex(index)}>
                        {aggregatedData.map((entry: AggredateDataItem, index: number) => (
    <Cell key={`cell=${index}`} fill={index === activeIndex ? "rgb(29,78,216)" : entry.color} />
))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

            </div>

        </div>
    </div>
)
}

export default Expenses;