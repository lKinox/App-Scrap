import React, { createContext,useState, useEffect } from 'react';
import './products_menu.css';
import { Button } from '@geist-ui/core';
import { ChevronDown } from '@geist-ui/icons'
export const CategoryContext = createContext('Cervezas');

function ProductMenu({ onCategorySelect }) {
  const [combinedData, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Category, setCategory] = useState('Cervezas');


  useEffect(() => {
    setIsLoading(true);
  
    Promise.all([
      fetch('https://app-scrap.onrender.com/api/products/plazas'),
      fetch('https://app-scrap.onrender.com/api/products/plazas')
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      // Combinar los resultados de ambos endpoints
      const combinedData = [...data[0], ...data[1]];
      setProducts(combinedData);
      setIsLoading(false);
    })
    .catch(error => console.error(error));
  }, []);


  const groupedProducts = combinedData.reduce((acc, product) => {
    product.data.forEach(item => {
      const category = item.category;
      acc[category] = acc[category] || [];
      acc[category].push(product);
    });
    return acc;
  }, {});

  const seenSubcategories = new Set()

  return (
    <CategoryContext.Provider value={Category}>
      <div className="product-menu-row">
        {isLoading ? (
          <p></p>
        ) : (
          Object.entries(groupedProducts).map(([category, products]) => (
            <div className="product-menu" key={category}>
              <Button iconRight={<ChevronDown />}>{category}</Button>
              <ul>
                {/* Filter products based on unique subcategories */}
                {products.flatMap(product =>
                  product.data.filter(data => !seenSubcategories.has(data.sub_category))
                  .sort((a, b) => a.sub_category.localeCompare(b.sub_category))
                  .map((data, index) => {
                    seenSubcategories.add(data.sub_category); // Add subcategory to seen set
                    return (
                      <li key={index}>
                        <Button ghost auto scale={0.7} id={data.sub_category} onClick={() => {
                          setCategory(data.sub_category);
                          onCategorySelect(data.sub_category);
                        }}>
                          {data.sub_category}
                        </Button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ))
        )}
      </div>
    </CategoryContext.Provider>
  );
}

export default ProductMenu;