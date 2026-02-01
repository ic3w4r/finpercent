import React, { useState } from 'react';
import { Search, Filter, Star, ShoppingCart, ArrowRight } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    manufacturer: string;
}

const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Industrial Generator 5000',
        category: 'Machinery',
        price: 4200,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'Apex Machinery'
    },
    {
        id: '2',
        name: 'Eco-Friendly Concrete',
        category: 'Construction',
        price: 45,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'EcoBuild Materials'
    },
    {
        id: '3',
        name: 'Smart Safety Vest',
        category: 'Safety Gear',
        price: 120,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1617415392070-556cddc868f7?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'Textile Futures'
    },
    {
        id: '4',
        name: 'Precision Laser Cutter',
        category: 'Tools',
        price: 2850,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581093458791-9f302e6831ca?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'TechTools Inc'
    },
    {
        id: '5',
        name: 'Heavy Duty Conveyor Belt',
        category: 'Logistics',
        price: 1500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'Logistics Pro'
    },
    {
        id: '6',
        name: 'Solar Panel Array X1',
        category: 'Energy',
        price: 5600,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
        manufacturer: 'SolarTech'
    }
];

export default function ProductCatalogue() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

    const filteredProducts = PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products or manufacturers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${selectedCategory === null
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                                <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                                {product.rating}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.manufacturer}</p>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                                    {product.category}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xl font-bold text-green-600">${product.price.toLocaleString()}</span>
                                <button className="flex items-center space-x-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>View</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No products found matching your search.</p>
                </div>
            )}
        </div>
    );
}
