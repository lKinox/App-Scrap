import React, { useState, useEffect } from 'react';
import { Text, Input, Loading, Badge } from '@geist-ui/core';
import ProductMenu from '../components/products_menu';
import '../routes/api.css';

function ProductList() {
  const [gamaProducts, setGamaProducts] = useState([]);
  const [plazaProducts, setPlazaProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [gamaResponse, plazaResponse] = await Promise.all([
          fetch('http://localhost:5000/api/products/gama'),
          fetch('http://localhost:5000/api/products/plazas')
        ]);

        const gamaData = await gamaResponse.json();
        const plazaData = await plazaResponse.json();

        setGamaProducts(gamaData);
        setPlazaProducts(plazaData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    
  }, []);

  const handleCategorySelect = (category) => {
    setIsEmpty(false);
    setActiveCategory(category);
  };

  const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  };

  const filteredProducts = gamaProducts.concat(plazaProducts).map(data => ({
    ...data,
    data: data.data.map(product => ({
      ...product,
      products: product.products.filter(singleProduct => {
        const normalizedTitle = normalizeText(singleProduct.title);
        const normalizedSearchTerm = normalizeText(searchTerm);
        const searchTerms = normalizedSearchTerm.split(' ');
  
        // Verifica que todas las palabras del término de búsqueda estén en el título, permitiendo coincidencias parciales
        return searchTerms.every(term => {
          const searchRegex = new RegExp(term, 'i'); // Coincidencia exacta, insensible a mayúsculas
          return searchRegex.test(normalizedTitle);
        });
      })
    }))
  }));

  return (
      <div class="main-prod">
        {isLoading ? (
          <div>
            <Loading>Cargando productos...</Loading>
          </div>
        ) : (
          <div>
            <Text h3>Lista de Productos</Text>
            <ProductMenu onCategorySelect={handleCategorySelect} />

            {isEmpty ? (
              <p>Seleccione un producto del menú...</p>
            ) : (
              <div>
                <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
                <div className='products-menu'>
                  <ul className='products-row'>
                    {filteredProducts.map((data, index) => (
                      <li key={index} className={`${data.data[0].sub_category} ${activeCategory === data.data[0].sub_category ? 'active' : ''} products`}>
                        <ul className='product-list'>
                          {data.data.map((product, index) => (
                            <li key={index}>
                              <h4>{product.sub_category} - {product.supermarket}</h4>
                              <ul className='single-product'>
                                {product.products.filter(singleProduct =>
                                singleProduct.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                .sort((a, b) => (a.price === null ? 1 : b.price === null ? -1 : a.price.localeCompare(b.price)))
                                .map((singleProduct, index) => (
                                  <li key={index}>
                                    <Text small>{singleProduct.title}</Text>
                                    <Text span style={{ color: '#16a34a' }}>${singleProduct.price}</Text>
                                    <Badge>{product.supermarket}</Badge>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
  );
}

export default ProductList;