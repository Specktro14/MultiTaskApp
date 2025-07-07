import React, { ReactNode } from "react";

export const MonthDays = ({date, isToday, children} : {date : number; isToday : boolean; children : ReactNode}) => {

  const childrenArray = React.Children.toArray(children) as ReactNode[];
  const displayedChildren = childrenArray.slice(0, 3);
  const hasMoreChildren = childrenArray.length > 3

  return (
    <div className={`h-[50px] sm:h-18 ${childrenArray.length > 0 ? 'border-2 border-chart-2/30 hover:border-chart-2/70' : 'border border-white/5 hover:border-white/10 '} rounded-sm w-auto flex flex-col items-center text-center p-1 text-[0.9rem] text-white font-semibold`}>
      <span className={`rounded-2xl w-[25px] lg:w-[35px] ${isToday ? 'bg-info/80' : 'bg-transparent'}`}>
        {Number(date)}
      </span>
      <div className="hidden p-1.5 sm:flex md:hidden lg:flex flex-row flex-nowrap mt-1 gap-1 items-start justify-start w-full h-full">
        {displayedChildren}
        {hasMoreChildren && <span className="text-white/50">...</span>}
      </div>
    </div>
  )
}

export const FillingDays = ({date} : {date : number}) => {

  return(
    <div className="md:h-18 border border-white/5 rounded-sm w-auto flex flex-col hover:border-white/10 text-center p-1 text-[0.9rem] text-white/50 font-semibold">
      <span>
        {Number(date)}
      </span>
    </div>
  )
}