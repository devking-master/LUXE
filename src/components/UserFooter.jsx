import React from 'react'

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-bold mb-2">About Us</h2>
          <ul className="space-y-1">
            <li>Company Info</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-2">Customer Service</h2>
          <ul className="space-y-1">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-2">Contact</h2>
          <ul className="space-y-1">
            <li>Email: support@myshop.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-2">Follow Us</h2>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-400 mt-6">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </p>
    </footer>
  );
}

export default UserFooter
