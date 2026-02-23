import React from 'react'

const UserNavbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">MyShop</h1>

        {/* Search bar */}
        <div className="flex items-center w-1/2 bg-gray-100 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 outline-none bg-transparent"
          />
          <button className="bg-orange-500 p-2 text-white">
            <Search />
          </button>
        </div>

        {/* Icons */}
        <div className="flex gap-5">
          <button className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <button>
            <User />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar
