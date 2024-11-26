import React from 'react'

const LabelandCount = ({ label, value, color }) => {
  return (
    <div className={`bg-${color}-200 text-${color}-500 rounded-md font-extrabold p-4 flex flex-col items-center`}>
      <div className={`border-b-2 border-${color}-500 pb-2 mb-2`}>{label}</div>
      <div className={`text-xl font-bold`}>{value}</div>
    </div>
  )
}

export default LabelandCount;
