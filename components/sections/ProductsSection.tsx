"use client";

import React from "react";
import { useFarm } from "@/lib/contexts/FarmContext";

export default function ProductsSection() {
  const { config } = useFarm();
  const products = config.products || [];

  if (products.length === 0) {
    return (
      <section
        id="products"
        className="scroll-mt-16 md:scroll-mt-20 py-16 px-4 md:px-12 max-w-7xl mx-auto"
      >
        <p className="text-center text-gray-500">No products available</p>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="scroll-mt-16 md:scroll-mt-20 py-16 px-4 md:px-12 max-w-7xl mx-auto"
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">
        Farmer Joe's Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center max-w-[250px]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-center mb-2">
              {product.name}
            </h3>
            {product.sizes && product.sizes.length > 0 && (
              <div className="text-sm text-gray-600 text-center mb-2">
                {product.sizes.map((size, sizeIdx) => (
                  <p key={sizeIdx}>{size}</p>
                ))}
              </div>
            )}
            {product.price && (
              <p className="text-base font-semibold text-center mt-2">
                {product.price}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
