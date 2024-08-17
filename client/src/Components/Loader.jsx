import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="relative w-[100px] h-[100px] animate-spin">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#fff] rounded-full opacity-50 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#fff] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#fff] rounded-full animate-spin-reverse" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000] to-[#fff] rounded-full animate-spin-slow" />
      </div>
    </div>
  )
}

export default Loader