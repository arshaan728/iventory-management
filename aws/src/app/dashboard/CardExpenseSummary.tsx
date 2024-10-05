import { expenseByCategorySummary, useGetDashboardMetricsQuery } from "@/state/api";
import { PieChart, TrendingUp } from "lucide-react";
import React from "react";
import { Cell, Pie, ResponsiveContainer } from "recharts";


type ExpenseSums ={
    [category : string]: number;
};
const colors = ["#00c49F","#0088FE","#FFBB2B"];


const CardExpenseSummary = () =>{

    const {data:dashboardMetrics , isLoading} = useGetDashboardMetricsQuery();
    
    const expenseSummary = dashboardMetrics?.expensesSummary[0];
    const expenseCategorySummary = dashboardMetrics?.expensesByCategorySummary || [];

    const expenseSums = expenseCategorySummary.reduce(
        (acc: ExpenseSums, item: expenseByCategorySummary) => {
          const category = item.category + " Expenses";
          const amount = parseInt(item.amount, 10);
          if (!acc[category]) acc[category] = 0;
          acc[category] += amount;
          return acc;
        },
        {}
      );

      console.log(expenseCategorySummary);
     
 
      const expenseCategories = Object.entries(expenseSums).map(
        ([name,value]) =>
        ({
            name,
            value,
        })
      );
      const totalExpenses = expenseCategories.reduce(
        (acc , category:{value:number}) => acc+ category.value,
        0
      );

      const formattedTotal = totalExpenses.toFixed(2);


    return (
        <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>
          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
            <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                    <Pie dataKey="value" data={expenseCategories} innerRadius={50} outerRadius={60} fill="#8884d8" nameKey="name" cx="50%" cy="50%">
                        {expenseCategories.map((entry,index)=>(
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))}
                    </Pie>
                </PieChart>
                
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform - translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                ${formattedTotal}
                </span>
                </div>
            </div>
          </div>
          <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3"> 
            {expenseCategories.map((entry , index)=>(
              <li key={`legend-${index}`} className="flex items-center text-xs">
                <span className="mr-2 w-3 h-3 rounded-full" style={{backgroundColor : colors[index % colors.length]}}></span>
                {entry.name}
              </li>
            ))}

          </ul>
         
        <div>
          <hr/>
          {expenseSummary && (
            <div className="mt-3 flex justify-between items-center px-7 mb-4">
              <div className="pt-2">
                <p className="text-sm">
                  Average: {}
                  <span className="font-semibold">
                    ${expenseSummary.totalExpenses.toFixed(2)}
                  </span>
                </p>
              </div>
              <span className="flex items-center mt-2">
                <TrendingUp className="mr-2 text-green-500"/>
              </span>
            </div>
          )}
        </div>
        </>
    )}
</div>

    );
};
export default CardExpenseSummary;