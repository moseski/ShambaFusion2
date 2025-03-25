// import React, { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2, BarChart2, Package, DollarSign, ShoppingCart } from 'lucide-react';
// import { API_BASE_URL } from '@/apiConfig';

// // Sample product data (you'd usually fetch this from an API)
// const initialProducts = [
//   { id: 1, name: 'Tomatoes', price: 2.5, quantity: 100, sold: 20, image: '' },
//   { id: 2, name: 'Potatoes', price: 1.5, quantity: 50, sold: 30, image: '' },
// ];

// const ProductManagement = () => {
//   const [products, setProducts] = useState(initialProducts);
//   const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', quantity: '', description: '', image: '' });
//   const [editProduct, setEditProduct] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     // Fetch products from an API or database in a real application
//     setProducts(initialProducts);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({ ...newProduct, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const { name, files } = e.target;
//     setNewProduct({ ...newProduct, [name]: files[0] });
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const product = { ...newProduct, id: products.length + 1, sold: 0 };
//       const data = { ...product, farmer: localStorage.getItem('userId') };

//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         formData.append(key, data[key]);
//       });

//       const response = await fetch(`${API_BASE_URL}api/farmproducts/post_product/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Added product successfully");
//         setNewProduct({ name: '', price: '', category: '', quantity: '', description: '', image: '' });
//         setIsFormVisible(false);
//         // Fetch updated product list from the API after adding
//         const addedProduct = await response.json(); // Assuming API returns the new product
//         setProducts([...products, addedProduct]);
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEditProduct = (product) => {
//     setEditProduct({ ...product });
//     setIsFormVisible(true);
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedProduct = { ...editProduct, farmer: localStorage.getItem('userId') };

//       const formData = new FormData();
//       Object.keys(updatedProduct).forEach((key) => {
//         formData.append(key, updatedProduct[key]);
//       });

//       const response = await fetch(`${API_BASE_URL}api/farmproducts/update_product/${editProduct.id}/`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("Updated product successfully");
//         setProducts(products.map(p => (p.id === editProduct.id ? editProduct : p)));
//         setEditProduct(null);
//         setIsFormVisible(false);
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(p => p.id !== id));
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h2>

//       <div className="mb-6">
//         <button
//           onClick={() => setIsFormVisible(!isFormVisible)}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
//         >
//           <Plus className="mr-2" size={20} />
//           {isFormVisible ? 'Cancel' : 'Add New Product'}
//         </button>
//       </div>

//       {isFormVisible && (
//         <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct} className="mb-8 bg-white p-6 rounded-lg shadow-md">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//           <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
//               <input
//                 id="user"
//                 type="text"
//                 name="user"
//                 value={editProduct ? editProduct.user : newProduct.user}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, name: e.target.value }) : handleInputChange}
//                 placeholder="user"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 value={editProduct ? editProduct.name : newProduct.name}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, name: e.target.value }) : handleInputChange}
//                 placeholder="Enter product name"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
//               <input
//                 id="category"
//                 type="text"
//                 name="category"
//                 value={editProduct ? editProduct.category : newProduct.category}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, category: e.target.value }) : handleInputChange}
//                 placeholder="Enter product category"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//               <input
//                 id="price"
//                 type="number"
//                 name="price"
//                 value={editProduct ? editProduct.price : newProduct.price}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, price: e.target.value }) : handleInputChange}
//                 placeholder="Enter price"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//               <input
//                 id="quantity"
//                 type="number"
//                 name="quantity"
//                 value={editProduct ? editProduct.quantity : newProduct.quantity}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, quantity: e.target.value }) : handleInputChange}
//                 placeholder="Enter quantity"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <input
//                 id="description"
//                 type="text"
//                 name="description"
//                 value={editProduct ? editProduct.description : newProduct.description}
//                 onChange={editProduct ? e => setEditProduct({ ...editProduct, description: e.target.value }) : handleInputChange}
//                 placeholder="Enter Description"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
//               <input
//                 id="image"
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={editProduct ? handleImageChange : handleImageChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
//             {editProduct ? 'Update Product' : 'Add Product'}
//           </button>
//         </form>
//       )}

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="text-left text-sm font-semibold text-gray-600">
//               <th className="p-2 border-b">Product</th>
//               <th className="p-2 border-b">Price</th>
//               <th className="p-2 border-b">Quantity</th>
//               <th className="p-2 border-b">Sold</th>
//               <th className="p-2 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <tr key={product.id} className="text-sm font-medium text-gray-700">
//                 <td className="p-2 border-b">{product.name}</td>
//                 <td className="p-2 border-b">{product.price}</td>
//                 <td className="p-2 border-b">{product.quantity}</td>
//                 <td className="p-2 border-b">{product.sold}</td>
//                 <td className="p-2 border-b">
//                   <button
//                     onClick={() => handleEditProduct(product)}
//                     className="text-yellow-500 hover:text-yellow-600 mr-2"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteProduct(product.id)}
//                     className="text-red-500 hover:text-red-600"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;


"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Loader } from "lucide-react"
import { API_BASE_URL } from "@/apiConfig"

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    image: null,
  })
  const [editProduct, setEditProduct] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState("")

  // Fetch products and user ID on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        // Get user ID from localStorage
        const currentUserId = localStorage.getItem("userId")
        setUserId(currentUserId)

        // Fetch products for this user
        const response = await fetch(`${API_BASE_URL}api/farmproducts/get_products/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditProduct({ ...editProduct, [name]: value })
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target
    if (editProduct) {
      setEditProduct({ ...editProduct, [name]: files[0] })
    } else {
      setNewProduct({ ...newProduct, [name]: files[0] })
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      // Add all product fields to formData
      Object.keys(newProduct).forEach((key) => {
        if (newProduct[key] !== null && newProduct[key] !== undefined) {
          formData.append(key, newProduct[key])
        }
      })

      // Add farmer ID
      formData.append("farmer", userId)

      const response = await fetch(`${API_BASE_URL}api/farmproducts/post_product/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      })

      if (response.ok) {
        const addedProduct = await response.json()
        setProducts([...products, addedProduct])
        setNewProduct({ name: "", price: "", category: "", quantity: "", description: "", image: null })
        setIsFormVisible(false)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to add product")
      }
    } catch (err) {
      console.error("Error adding product:", err)
      setError(err.message)
    }
  }

  const handleEditProduct = (product) => {
    // Create a copy of the product without modifying the image
    const productCopy = { ...product, image: null }
    setEditProduct(productCopy)
    setIsFormVisible(true)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      // Add all product fields to formData
      Object.keys(editProduct).forEach((key) => {
        if (key !== "image" || editProduct[key] !== null) {
          formData.append(key, editProduct[key])
        }
      })

      // Add farmer ID
      formData.append("farmer", userId)

      const response = await fetch(`${API_BASE_URL}api/farmproducts/update_product/${editProduct.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProducts(products.map((p) => (p.id === editProduct.id ? updatedProduct : p)))
        setEditProduct(null)
        setIsFormVisible(false)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to update product")
      }
    } catch (err) {
      console.error("Error updating product:", err)
      setError(err.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}api/farmproducts/delete_product/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to delete product")
      }
    } catch (err) {
      console.error("Error deleting product:", err)
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Product Management</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible)
            setEditProduct(null) // Clear edit product when toggling form
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
        >
          <Plus className="mr-2" size={20} />
          {isFormVisible ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {isFormVisible && (
        <form
          onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}
          className="mb-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="farmer" className="block text-sm font-medium text-gray-700 mb-1">
                Farmer ID
              </label>
              <input
                id="farmer"
                type="text"
                name="farmer"
                value={userId}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Automatically assigned based on your account</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={editProduct ? editProduct.name : newProduct.name}
                onChange={editProduct ? handleEditInputChange : handleInputChange}
                placeholder="Enter product name"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <input
                id="category"
                type="text"
                name="category"
                value={editProduct ? editProduct.category : newProduct.category}
                onChange={editProduct ? handleEditInputChange : handleInputChange}
                placeholder="Enter product category"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={editProduct ? editProduct.price : newProduct.price}
                onChange={editProduct ? handleEditInputChange : handleInputChange}
                placeholder="Enter price"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={editProduct ? editProduct.quantity : newProduct.quantity}
                onChange={editProduct ? handleEditInputChange : handleInputChange}
                placeholder="Enter quantity"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                value={editProduct ? editProduct.description : newProduct.description}
                onChange={editProduct ? handleEditInputChange : handleInputChange}
                placeholder="Enter Description"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                {editProduct ? "Update Image (optional)" : "Image"}
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!editProduct} // Only required for new products
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {editProduct && <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            {editProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      {products.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No products found. Add your first product using the button above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="p-2 border-b">Product</th>
                <th className="p-2 border-b">Category</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Quantity</th>
                <th className="p-2 border-b">Sold</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-sm font-medium text-gray-700">
                  <td className="p-2 border-b">{product.name}</td>
                  <td className="p-2 border-b">{product.category}</td>
                  <td className="p-2 border-b">{product.price}</td>
                  <td className="p-2 border-b">{product.quantity}</td>
                  <td className="p-2 border-b">{product.sold || 0}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-yellow-500 hover:text-yellow-600 mr-2"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-600"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductManagement

