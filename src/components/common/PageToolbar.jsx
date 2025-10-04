function PageToolbar({ children }) {
  return (
    <div className="flex justify-between items-center">
      {children}

      {/* <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
      <FiPlus className="mr-2 h-4 w-4" />
      {buttonText || 'Add'}
    </button> */}
    </div >
  )
}

//  <div>
//         <h1 className="text-2xl font-bold text-gray-900">{operationTitle || 'Management'}</h1>
//         <p className="text-gray-600">{operationDesc || 'Manage your work here.'}</p>
//       </div>
//       <button
//         onClick={onClick}
//         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         <FiPlus className="mr-2 h-4 w-4" />
//         {buttonText || 'Add'}
//       </button>

export default PageToolbar